# SNU Connectome Fellows Program - Production Deployment Guide
# ===========================================================

This guide provides comprehensive instructions for deploying the SNU Connectome Fellows Program website to production infrastructure, specifically optimized for Korean cloud providers and university environments.

## 🏗️ Infrastructure Overview

### Architecture Components
- **Web Application**: Next.js 14 application with SSR/SSG
- **Database**: PostgreSQL 15 with automated backups
- **Cache Layer**: Redis for sessions and application cache
- **File Storage**: MinIO (S3-compatible) for uploads and assets
- **Reverse Proxy**: Traefik with automatic SSL/TLS
- **Monitoring**: Prometheus + Grafana + Loki stack
- **Container Platform**: Docker Compose for orchestration

### Recommended Infrastructure
- **CPU**: 4+ cores (8+ recommended for production)
- **Memory**: 16GB+ RAM (32GB recommended)
- **Storage**: 500GB+ SSD storage
- **Network**: 1Gbps+ bandwidth
- **Korean Cloud Providers**: KT Cloud, Naver Cloud Platform, or NHN Toast Cloud

## 🚀 Quick Start Deployment

### 1. Server Setup (Ubuntu 22.04 LTS)

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install required packages
sudo apt install -y docker.io docker-compose-v2 nginx certbot python3-certbot-nginx git curl

# Enable Docker service
sudo systemctl enable docker
sudo systemctl start docker

# Add user to docker group
sudo usermod -aG docker $USER
newgrp docker
```

### 2. Clone Repository

```bash
# Clone the repository
git clone https://github.com/snu/connectome-fellows.git /opt/connectome-fellows
cd /opt/connectome-fellows

# Set proper permissions
sudo chown -R $USER:docker /opt/connectome-fellows
chmod +x scripts/*.sh
```

### 3. Environment Configuration

```bash
# Copy and configure environment file
cp website/.env.production website/.env.local

# Edit environment variables (IMPORTANT: Replace all placeholder values)
nano website/.env.local
```

### 4. Deploy with Docker Compose

```bash
# Start all services
docker-compose up -d

# Verify deployment
docker-compose ps
docker-compose logs -f web
```

### 5. Initial Setup

```bash
# Run database migrations
docker-compose exec web npm run db:migrate

# Create initial admin user
docker-compose exec web npm run admin:create

# Setup monitoring dashboards
docker-compose exec grafana grafana-cli admin reset-admin-password admin123
```

## 🔧 Detailed Configuration

### Database Configuration

#### PostgreSQL Optimization for Korean Workloads
```sql
-- /opt/connectome-fellows/database/init/01_korean_config.sql
ALTER SYSTEM SET timezone = 'Asia/Seoul';
ALTER SYSTEM SET lc_collate = 'ko_KR.UTF-8';
ALTER SYSTEM SET lc_ctype = 'ko_KR.UTF-8';
ALTER SYSTEM SET shared_preload_libraries = 'pg_stat_statements';
SELECT pg_reload_conf();
```

#### Backup Configuration
```bash
# Setup automated daily backups
sudo crontab -e

# Add backup cron job
0 2 * * * /opt/connectome-fellows/scripts/backup.sh >> /var/log/connectome-backup.log 2>&1
```

### SSL/TLS Certificate Setup

#### Using Let's Encrypt (Recommended)
```bash
# Traefik will automatically handle SSL certificates
# Ensure your domain points to the server IP

# Verify SSL setup
curl -I https://connectome.snu.ac.kr/api/health
```

#### Using Custom SSL Certificates
```bash
# Place certificates in the correct location
sudo mkdir -p /etc/ssl/connectome
sudo cp your-cert.crt /etc/ssl/connectome/
sudo cp your-private.key /etc/ssl/connectome/
sudo chmod 600 /etc/ssl/connectome/*
```

### Monitoring Setup

#### Grafana Dashboard Import
```bash
# Access Grafana at https://monitoring.connectome.snu.ac.kr
# Default credentials: admin/admin123 (change immediately)

# Import pre-configured dashboards
docker-compose exec grafana grafana-cli plugins install grafana-piechart-panel
docker-compose restart grafana
```

#### Alert Configuration
```yaml
# monitoring/grafana/provisioning/alerting/rules.yml
groups:
  - name: connectome-alerts
    rules:
      - alert: HighMemoryUsage
        expr: (node_memory_MemTotal_bytes - node_memory_MemAvailable_bytes) / node_memory_MemTotal_bytes > 0.9
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High memory usage detected"

      - alert: DatabaseConnectionFailure
        expr: up{job="database"} == 0
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: "Database is down"
```

## 🔐 Security Configuration

### Firewall Setup (UFW)
```bash
# Configure firewall
sudo ufw enable
sudo ufw allow ssh
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow from 10.0.0.0/8 to any port 5432  # Database access from private network only
```

### Security Headers
```nginx
# /etc/nginx/sites-available/connectome.snu.ac.kr
server {
    listen 443 ssl http2;
    server_name connectome.snu.ac.kr;

    # Security headers
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' *.google-analytics.com; style-src 'self' 'unsafe-inline' fonts.googleapis.com; font-src 'self' fonts.gstatic.com; img-src 'self' data: *.google-analytics.com; connect-src 'self' *.snu.ac.kr" always;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### Rate Limiting
```bash
# Configure fail2ban for additional protection
sudo apt install fail2ban

# Create custom jail for the application
sudo tee /etc/fail2ban/jail.local << EOF
[connectome-app]
enabled = true
port = 80,443
filter = connectome-app
logpath = /opt/connectome-fellows/logs/access.log
maxretry = 5
bantime = 3600
EOF
```

## 🇰🇷 Korean Infrastructure Integration

### SNU Network Integration
```bash
# Configure for SNU network access
# Add to /etc/hosts for internal resolution
echo "10.0.1.100 ldap.snu.ac.kr" >> /etc/hosts
echo "10.0.1.101 auth.snu.ac.kr" >> /etc/hosts

# Configure LDAP integration
sudo apt install libpam-ldap libnss-ldap ldap-utils
```

### Korean Cloud Provider Setup

#### KT Cloud (uCloud)
```bash
# Install KT Cloud CLI
wget https://ucloudbiz.olleh.com/static/cli/ucloud-cli-linux.tar.gz
tar -xzf ucloud-cli-linux.tar.gz
sudo mv ucloud /usr/local/bin/

# Configure backup to KT Cloud storage
ucloud configure
ucloud storage create-bucket connectome-fellows-backup
```

#### Naver Cloud Platform
```bash
# Install NCP CLI
pip3 install ncloud-sdk

# Configure object storage for backups
ncloud configure
```

### Korean Compliance (PIPA/ISMS-P)
```bash
# Enable audit logging
mkdir -p /var/log/connectome-audit
chown syslog:syslog /var/log/connectome-audit

# Configure log retention (7 years for PIPA compliance)
echo "*.info /var/log/connectome-audit/app.log" >> /etc/rsyslog.conf
echo "/var/log/connectome-audit/*.log {
    monthly
    rotate 84
    compress
    delaycompress
    missingok
    notifempty
}" > /etc/logrotate.d/connectome-fellows
```

## 📊 Performance Optimization

### Database Performance Tuning
```postgresql
-- Performance optimization for Korean character sets
ALTER SYSTEM SET shared_buffers = '1GB';
ALTER SYSTEM SET effective_cache_size = '3GB';
ALTER SYSTEM SET maintenance_work_mem = '256MB';
ALTER SYSTEM SET checkpoint_completion_target = 0.9;
ALTER SYSTEM SET wal_buffers = '16MB';
ALTER SYSTEM SET default_statistics_target = 100;
ALTER SYSTEM SET random_page_cost = 1.1;
ALTER SYSTEM SET work_mem = '64MB';

-- Korean text search configuration
CREATE TEXT SEARCH CONFIGURATION korean ( COPY = simple );
ALTER TEXT SEARCH CONFIGURATION korean ALTER MAPPING FOR word, asciiword WITH korean_stem;
```

### CDN Configuration (for Korean Users)
```javascript
// next.config.js - CDN optimization for Korea
module.exports = {
  images: {
    domains: ['cdn.naver.com', 'cdn.kakao.com'],
    loader: 'custom',
    loaderFile: './lib/korean-cdn-loader.js'
  },

  // Edge runtime for better performance in Asia
  experimental: {
    runtime: 'edge'
  }
}
```

### Caching Strategy
```nginx
# Nginx caching for static assets
location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

location ~* \.(woff|woff2|ttf|eot)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
    add_header Access-Control-Allow-Origin "*";
}
```

## 🚨 Monitoring and Alerting

### Health Check Monitoring
```bash
# Setup external monitoring
curl -X POST "https://api.uptimerobot.com/v2/newMonitor" \
  -d "api_key=YOUR_API_KEY" \
  -d "format=json" \
  -d "type=1" \
  -d "url=https://connectome.snu.ac.kr/api/health" \
  -d "friendly_name=SNU Connectome Fellows"
```

### Log Aggregation
```yaml
# monitoring/loki-config.yml
auth_enabled: false

server:
  http_listen_port: 3100

ingester:
  lifecycler:
    address: 0.0.0.0
    ring:
      kvstore:
        store: inmemory
      replication_factor: 1
    final_sleep: 0s

schema_config:
  configs:
    - from: 2020-10-24
      store: boltdb
      object_store: filesystem
      schema: v11
      index:
        prefix: index_
        period: 24h

storage_config:
  boltdb:
    directory: /loki/index

  filesystem:
    directory: /loki/chunks

limits_config:
  enforce_metric_name: false
  reject_old_samples: true
  reject_old_samples_max_age: 168h
```

### Korean Time Zone Configuration
```bash
# Set system timezone to Seoul
sudo timedatectl set-timezone Asia/Seoul

# Configure NTP for Korean time servers
echo "server 0.kr.pool.ntp.org iburst" >> /etc/ntp.conf
echo "server 1.kr.pool.ntp.org iburst" >> /etc/ntp.conf
sudo systemctl restart ntp
```

## 🔄 Backup and Disaster Recovery

### Automated Backup Strategy
```bash
# Full backup script execution
./scripts/backup.sh

# Backup verification
./scripts/verify-backup.sh

# Disaster recovery test
./scripts/disaster-recovery-test.sh
```

### Database Replication Setup
```postgresql
-- Setup streaming replication for high availability
-- On primary server
ALTER SYSTEM SET wal_level = 'replica';
ALTER SYSTEM SET max_wal_senders = 3;
ALTER SYSTEM SET archive_mode = on;
ALTER SYSTEM SET archive_command = 'test ! -f /var/lib/postgresql/archive/%f && cp %p /var/lib/postgresql/archive/%f';

-- Create replication user
CREATE USER replicator REPLICATION LOGIN CONNECTION LIMIT 1 ENCRYPTED PASSWORD 'secure_password';
```

## 🔍 Troubleshooting

### Common Issues

#### 1. Korean Character Display Issues
```bash
# Install Korean fonts
sudo apt install fonts-noto-cjk fonts-nanum*

# Configure locale
sudo locale-gen ko_KR.UTF-8
export LANG=ko_KR.UTF-8
```

#### 2. SSL Certificate Problems
```bash
# Check certificate status
openssl x509 -in /etc/ssl/certs/connectome.snu.ac.kr.pem -text -noout

# Renew certificates
docker-compose exec traefik traefik version
```

#### 3. Database Connection Issues
```bash
# Check database connectivity
docker-compose exec database pg_isready

# View database logs
docker-compose logs database
```

### Performance Debugging
```bash
# Check system resources
htop
iotop
nethogs

# Monitor Docker containers
docker stats
docker-compose top
```

## 📋 Deployment Checklist

### Pre-Deployment
- [ ] Server provisioned with adequate resources
- [ ] Domain DNS configured and propagated
- [ ] SSL certificates obtained/configured
- [ ] Environment variables properly set
- [ ] Database backup strategy verified
- [ ] Monitoring system operational

### Deployment
- [ ] Repository cloned and configured
- [ ] Docker containers deployed successfully
- [ ] Database migrations completed
- [ ] Health checks passing
- [ ] SSL/TLS working correctly
- [ ] Monitoring dashboards accessible

### Post-Deployment
- [ ] Admin user created and tested
- [ ] Application functionality verified
- [ ] Performance metrics baseline established
- [ ] Backup system tested
- [ ] Alert channels configured and tested
- [ ] Documentation updated

## 🎯 Production Maintenance

### Daily Tasks
- Check application health via monitoring dashboard
- Review error logs for any issues
- Verify backup completion

### Weekly Tasks
- Review performance metrics
- Update security patches
- Test backup restore procedure

### Monthly Tasks
- Security audit and updates
- Performance optimization review
- Disaster recovery testing
- Certificate renewal check

---

## 📞 Support and Contacts

- **Technical Support**: tech@connectome.snu.ac.kr
- **Security Issues**: security@connectome.snu.ac.kr
- **Emergency Contact**: +82-2-880-1234

For additional support, please refer to the [troubleshooting guide](./TROUBLESHOOTING.md) or open an issue in the repository.

---

**Production Environment**: https://connectome.snu.ac.kr
**Monitoring Dashboard**: https://monitoring.connectome.snu.ac.kr
**Documentation**: https://docs.connectome.snu.ac.kr