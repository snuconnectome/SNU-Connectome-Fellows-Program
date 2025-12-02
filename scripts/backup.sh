#!/bin/bash

# SNU Connectome Fellows Program - Backup Script
# ==============================================
#
# Comprehensive backup script for database, files, and configurations
# Supports local and cloud storage with retention policies

set -euo pipefail

# Configuration
BACKUP_DIR="/opt/connectome-fellows/backup"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
RETENTION_DAYS=${BACKUP_RETENTION_DAYS:-30}
LOG_FILE="/var/log/connectome-backup.log"

# Database configuration
DB_CONTAINER="snu-connectome-db"
DB_NAME="${DATABASE_NAME:-connectome_fellows}"
DB_USER="${DATABASE_USER:-postgres}"

# S3 configuration for cloud backup
S3_BUCKET="${BACKUP_S3_BUCKET:-connectome-fellows-backup}"
AWS_REGION="${AWS_REGION:-ap-northeast-2}"

# Logging function
log() {
    echo "[$(date +'%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

# Error handling
error_exit() {
    log "ERROR: $1"
    exit 1
}

# Check if running as root or with sudo
check_permissions() {
    if [[ $EUID -ne 0 ]]; then
        error_exit "This script must be run as root or with sudo"
    fi
}

# Create backup directory
setup_backup_dir() {
    log "Setting up backup directory: $BACKUP_DIR"
    mkdir -p "$BACKUP_DIR"
    chmod 750 "$BACKUP_DIR"
}

# Backup database
backup_database() {
    log "Starting database backup..."

    local backup_file="$BACKUP_DIR/database_${TIMESTAMP}.sql.gz"

    # Create database dump
    docker exec "$DB_CONTAINER" pg_dump \
        -U "$DB_USER" \
        -d "$DB_NAME" \
        --verbose \
        --clean \
        --if-exists \
        --no-owner \
        --no-privileges \
        | gzip > "$backup_file"

    if [[ -f "$backup_file" ]] && [[ -s "$backup_file" ]]; then
        log "Database backup completed: $backup_file"
        echo "$backup_file"
    else
        error_exit "Database backup failed"
    fi
}

# Backup uploaded files and storage
backup_files() {
    log "Starting file backup..."

    local backup_file="$BACKUP_DIR/files_${TIMESTAMP}.tar.gz"
    local upload_dir="/opt/connectome-fellows/uploads"
    local storage_dir="/opt/connectome-fellows/storage"

    # Create tar archive of files
    tar -czf "$backup_file" \
        -C "/opt/connectome-fellows" \
        --exclude='*.tmp' \
        --exclude='*.log' \
        uploads/ storage/ 2>/dev/null || true

    if [[ -f "$backup_file" ]]; then
        log "File backup completed: $backup_file"
        echo "$backup_file"
    else
        log "WARNING: File backup failed or no files to backup"
    fi
}

# Backup configuration files
backup_config() {
    log "Starting configuration backup..."

    local backup_file="$BACKUP_DIR/config_${TIMESTAMP}.tar.gz"

    # Backup configuration files (excluding sensitive data)
    tar -czf "$backup_file" \
        -C "/opt/connectome-fellows" \
        docker-compose.yml \
        nginx.conf \
        monitoring/ \
        scripts/ \
        --exclude='*.env*' \
        --exclude='*secret*' \
        --exclude='*key*' 2>/dev/null || true

    if [[ -f "$backup_file" ]]; then
        log "Configuration backup completed: $backup_file"
        echo "$backup_file"
    else
        log "WARNING: Configuration backup failed"
    fi
}

# Upload to cloud storage
upload_to_cloud() {
    local backup_files=("$@")

    if [[ -z "${AWS_ACCESS_KEY_ID:-}" ]] || [[ -z "${S3_BUCKET:-}" ]]; then
        log "Cloud backup skipped: AWS credentials or S3 bucket not configured"
        return
    fi

    log "Starting cloud backup upload..."

    for file in "${backup_files[@]}"; do
        if [[ -f "$file" ]]; then
            local filename=$(basename "$file")
            local s3_path="s3://${S3_BUCKET}/$(date +%Y/%m)/${filename}"

            if aws s3 cp "$file" "$s3_path" --region "$AWS_REGION"; then
                log "Uploaded to cloud: $s3_path"
            else
                log "WARNING: Failed to upload $file to cloud"
            fi
        fi
    done
}

# Clean old backups
cleanup_old_backups() {
    log "Cleaning up backups older than $RETENTION_DAYS days..."

    # Local cleanup
    find "$BACKUP_DIR" -name "*.sql.gz" -mtime +$RETENTION_DAYS -delete
    find "$BACKUP_DIR" -name "*.tar.gz" -mtime +$RETENTION_DAYS -delete

    # Cloud cleanup
    if command -v aws >/dev/null 2>&1 && [[ -n "${S3_BUCKET:-}" ]]; then
        aws s3 ls "s3://${S3_BUCKET}/" --recursive | \
        awk '$1 <= "'$(date -d "$RETENTION_DAYS days ago" +%Y-%m-%d)'" {print $4}' | \
        xargs -I {} aws s3 rm "s3://${S3_BUCKET}/{}" 2>/dev/null || true
    fi

    log "Cleanup completed"
}

# Verify backup integrity
verify_backup() {
    local db_backup="$1"
    local file_backup="$2"

    log "Verifying backup integrity..."

    # Verify database backup
    if [[ -f "$db_backup" ]]; then
        if gunzip -t "$db_backup" 2>/dev/null; then
            log "Database backup integrity verified"
        else
            error_exit "Database backup is corrupted"
        fi
    fi

    # Verify file backup
    if [[ -f "$file_backup" ]]; then
        if tar -tzf "$file_backup" >/dev/null 2>&1; then
            log "File backup integrity verified"
        else
            log "WARNING: File backup may be corrupted"
        fi
    fi
}

# Send backup notification
send_notification() {
    local status="$1"
    local message="$2"

    # Slack notification
    if [[ -n "${SLACK_WEBHOOK_URL:-}" ]]; then
        curl -X POST -H 'Content-type: application/json' \
            --data "{\"text\":\"🗄️ Backup ${status}: ${message}\"}" \
            "$SLACK_WEBHOOK_URL" 2>/dev/null || true
    fi

    # Email notification
    if command -v mail >/dev/null 2>&1; then
        echo "$message" | mail -s "Backup ${status}" admin@connectome.snu.ac.kr 2>/dev/null || true
    fi
}

# Main backup function
main() {
    local start_time=$(date +%s)

    log "Starting backup process..."

    # Setup
    check_permissions
    setup_backup_dir

    # Perform backups
    local db_backup
    local file_backup
    local config_backup
    local backup_files=()

    # Database backup
    if db_backup=$(backup_database); then
        backup_files+=("$db_backup")
    fi

    # File backup
    if file_backup=$(backup_files); then
        backup_files+=("$file_backup")
    fi

    # Configuration backup
    if config_backup=$(backup_config); then
        backup_files+=("$config_backup")
    fi

    # Verify backups
    if [[ -n "${db_backup:-}" ]] && [[ -n "${file_backup:-}" ]]; then
        verify_backup "$db_backup" "$file_backup"
    fi

    # Upload to cloud
    if [[ ${#backup_files[@]} -gt 0 ]]; then
        upload_to_cloud "${backup_files[@]}"
    fi

    # Cleanup old backups
    cleanup_old_backups

    # Calculate duration
    local end_time=$(date +%s)
    local duration=$((end_time - start_time))

    # Calculate total size
    local total_size=0
    for file in "${backup_files[@]}"; do
        if [[ -f "$file" ]]; then
            size=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null || echo 0)
            total_size=$((total_size + size))
        fi
    done

    local size_mb=$((total_size / 1024 / 1024))

    log "Backup completed successfully"
    log "Duration: ${duration}s, Size: ${size_mb}MB, Files: ${#backup_files[@]}"

    send_notification "Success" "Backup completed in ${duration}s, ${size_mb}MB, ${#backup_files[@]} files"
}

# Trap errors
trap 'send_notification "Failed" "Backup failed with error on line $LINENO"' ERR

# Run main function if script is executed directly
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main "$@"
fi