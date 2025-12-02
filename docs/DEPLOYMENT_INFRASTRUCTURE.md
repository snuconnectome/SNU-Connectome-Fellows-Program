# Deployment and Infrastructure Plan
## SNU Connectome Fellows Program Website

### Overview
This document outlines the complete deployment strategy and infrastructure configuration for the SNU Connectome Fellows Program website, leveraging AWS OCRE 2024 framework for educational institutions.

## Infrastructure Architecture

### Cloud Provider: Amazon Web Services (AWS)
- **Reason**: AWS OCRE 2024 framework provides educational pricing
- **Region**: Asia Pacific (Seoul) - ap-northeast-2
- **Availability**: Multi-AZ deployment for high availability

### Core Infrastructure Components

#### 1. Compute Services
```yaml
EC2 Instances:
  Production:
    - Type: t3.medium (2 vCPU, 4 GB RAM)
    - Count: 2 (Auto Scaling Group)
    - OS: Amazon Linux 2
    - Purpose: Next.js application servers

  Database:
    - Type: t3.small (2 vCPU, 2 GB RAM)
    - Count: 1 (with standby)
    - Purpose: PostgreSQL database

  Cache:
    - Type: t3.micro (1 vCPU, 1 GB RAM)
    - Count: 1
    - Purpose: Redis cache
```

#### 2. Database Services
```yaml
RDS PostgreSQL:
  Instance: db.t3.micro
  Engine: PostgreSQL 15.4
  Storage: 20 GB SSD (gp2)
  Backup: 7 days retention
  Multi-AZ: Yes (for production)
  Encryption: Yes

ElastiCache Redis:
  Node: cache.t3.micro
  Engine: Redis 7.0
  Purpose: Session storage, API caching
```

#### 3. Storage Services
```yaml
S3 Buckets:
  - snu-connectome-assets (Static files, images)
  - snu-connectome-backups (Database backups)
  - snu-connectome-logs (Application logs)

CloudFront CDN:
  - Global content delivery
  - SSL/TLS termination
  - Static asset caching
```

#### 4. Networking
```yaml
VPC Configuration:
  CIDR: 10.0.0.0/16

Subnets:
  Public:
    - 10.0.1.0/24 (AZ-a)
    - 10.0.2.0/24 (AZ-c)
  Private:
    - 10.0.3.0/24 (AZ-a)
    - 10.0.4.0/24 (AZ-c)

Security Groups:
  ALB-SG: Ports 80, 443 (0.0.0.0/0)
  App-SG: Port 3000 (from ALB-SG)
  DB-SG: Port 5432 (from App-SG)
  Cache-SG: Port 6379 (from App-SG)
```

#### 5. Load Balancing
```yaml
Application Load Balancer:
  Type: Application Load Balancer
  Scheme: Internet-facing
  Listeners:
    - HTTP (80) → HTTPS redirect
    - HTTPS (443) → Target Group

Target Group:
  Protocol: HTTP
  Port: 3000
  Health Check: /api/health
```

## Deployment Environments

### 1. Development Environment
```yaml
Infrastructure:
  - Single t3.micro EC2 instance
  - Development RDS instance
  - S3 bucket for dev assets

Domain: dev.connectome-fellows.snu.ac.kr
Purpose: Feature development and testing
```

### 2. Staging Environment
```yaml
Infrastructure:
  - Single t3.small EC2 instance
  - Staging RDS instance
  - S3 bucket for staging assets

Domain: staging.connectome-fellows.snu.ac.kr
Purpose: Pre-production testing
```

### 3. Production Environment
```yaml
Infrastructure:
  - Auto Scaling Group (2-4 instances)
  - Multi-AZ RDS with standby
  - CloudFront CDN
  - Multiple S3 buckets

Domain: connectome-fellows.snu.ac.kr
Purpose: Live application
```

## Container Orchestration

### Docker Configuration
```dockerfile
# Frontend Dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
RUN npm ci --only=production
EXPOSE 3000
CMD ["npm", "start"]
```

```dockerfile
# Backend Dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Docker Compose (Development)
```yaml
version: '3.8'
services:
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
      - NEXT_PUBLIC_API_URL=http://backend:8000
    depends_on:
      - backend

  backend:
    build: ./backend
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/connectome
      - REDIS_URL=redis://redis:6379
    depends_on:
      - db
      - redis

  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=connectome
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:
```

## CI/CD Pipeline

### GitHub Actions Workflow
```yaml
name: Deploy to AWS
on:
  push:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
      - run: npm ci
      - run: npm test
      - run: npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      - name: Deploy to AWS
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        run: |
          aws deploy create-deployment \
            --application-name snu-connectome \
            --deployment-group-name production \
            --s3-location bucket=snu-connectome-deploy,key=latest.zip
```

### Deployment Scripts
```bash
#!/bin/bash
# deploy.sh

set -e

echo "Starting deployment..."

# Build Docker images
docker build -t snu-connectome-frontend:latest ./frontend
docker build -t snu-connectome-backend:latest ./backend

# Push to ECR
aws ecr get-login-password --region ap-northeast-2 | \
  docker login --username AWS --password-stdin 123456789.dkr.ecr.ap-northeast-2.amazonaws.com

docker tag snu-connectome-frontend:latest 123456789.dkr.ecr.ap-northeast-2.amazonaws.com/snu-connectome-frontend:latest
docker tag snu-connectome-backend:latest 123456789.dkr.ecr.ap-northeast-2.amazonaws.com/snu-connectome-backend:latest

docker push 123456789.dkr.ecr.ap-northeast-2.amazonaws.com/snu-connectome-frontend:latest
docker push 123456789.dkr.ecr.ap-northeast-2.amazonaws.com/snu-connectome-backend:latest

# Deploy to ECS
aws ecs update-service \
  --cluster snu-connectome-cluster \
  --service snu-connectome-service \
  --force-new-deployment

echo "Deployment completed!"
```

## Infrastructure as Code (Terraform)

### Main Configuration
```hcl
# main.tf
provider "aws" {
  region = "ap-northeast-2"
}

# VPC
resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name = "snu-connectome-vpc"
  }
}

# Subnets
resource "aws_subnet" "public" {
  count             = 2
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.${count.index + 1}.0/24"
  availability_zone = data.aws_availability_zones.available.names[count.index]

  map_public_ip_on_launch = true

  tags = {
    Name = "public-subnet-${count.index + 1}"
  }
}

resource "aws_subnet" "private" {
  count             = 2
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.${count.index + 3}.0/24"
  availability_zone = data.aws_availability_zones.available.names[count.index]

  tags = {
    Name = "private-subnet-${count.index + 1}"
  }
}

# RDS
resource "aws_db_instance" "postgres" {
  identifier             = "snu-connectome-db"
  engine                 = "postgres"
  engine_version         = "15.4"
  instance_class         = "db.t3.micro"
  allocated_storage      = 20
  storage_type           = "gp2"
  storage_encrypted      = true

  db_name  = "connectome"
  username = var.db_username
  password = var.db_password

  vpc_security_group_ids = [aws_security_group.rds.id]
  db_subnet_group_name   = aws_db_subnet_group.main.name

  backup_retention_period = 7
  multi_az               = true

  skip_final_snapshot = false
  final_snapshot_identifier = "snu-connectome-final-snapshot"

  tags = {
    Name = "snu-connectome-database"
  }
}
```

## Monitoring and Logging

### CloudWatch Configuration
```yaml
Metrics:
  - Application Performance:
    - Response Time
    - Error Rate
    - Throughput

  - Infrastructure:
    - CPU Utilization
    - Memory Usage
    - Disk I/O
    - Network Traffic

  - Database:
    - Connection Count
    - Query Performance
    - Storage Usage

Alarms:
  - High Error Rate (>5%)
  - High Response Time (>2s)
  - High CPU Usage (>80%)
  - Low Disk Space (<10%)
```

### Log Management
```yaml
Log Groups:
  - /aws/ec2/snu-connectome/application
  - /aws/ec2/snu-connectome/access
  - /aws/rds/snu-connectome/postgresql

Log Retention: 30 days
Log Aggregation: CloudWatch Insights
```

## Security Configuration

### SSL/TLS
```yaml
Certificate:
  Provider: AWS Certificate Manager
  Domain: *.connectome-fellows.snu.ac.kr
  Validation: DNS

HTTPS:
  Minimum TLS Version: 1.2
  Cipher Suites: Modern configuration
  HSTS: Enabled (max-age=31536000)
```

### Security Groups
```yaml
ALB Security Group:
  Inbound:
    - Port 80 (HTTP) from 0.0.0.0/0
    - Port 443 (HTTPS) from 0.0.0.0/0
  Outbound:
    - All traffic to App Security Group

App Security Group:
  Inbound:
    - Port 3000 from ALB Security Group
    - Port 22 (SSH) from Admin IPs
  Outbound:
    - Port 5432 to DB Security Group
    - Port 6379 to Cache Security Group
    - HTTPS to 0.0.0.0/0 (API calls)

Database Security Group:
  Inbound:
    - Port 5432 from App Security Group
  Outbound:
    - None
```

### IAM Roles
```yaml
EC2 Instance Role:
  Policies:
    - CloudWatchAgentServerPolicy
    - AmazonS3ReadOnlyAccess (for assets)
    - Custom policy for application needs

ECS Task Role:
  Policies:
    - CloudWatchLogsFullAccess
    - AmazonS3ReadOnlyAccess
    - Custom application policies
```

## Backup and Disaster Recovery

### Database Backups
```yaml
Automated Backups:
  - RDS automated backups (7 days)
  - Daily snapshots at 03:00 UTC
  - Cross-region backup replication

Manual Backups:
  - Weekly full database dump
  - Stored in S3 with lifecycle policy
  - Encrypted at rest
```

### Application Backups
```yaml
File Backups:
  - Daily backup of uploaded files
  - S3 cross-region replication
  - Versioning enabled

Configuration Backups:
  - Infrastructure as Code in Git
  - Environment variables in AWS Secrets Manager
  - Application config in S3
```

### Disaster Recovery Plan
```yaml
Recovery Time Objective (RTO): 4 hours
Recovery Point Objective (RPO): 1 hour

Steps:
  1. Assess damage and communicate incident
  2. Launch backup infrastructure in alternate region
  3. Restore database from latest backup
  4. Update DNS to point to backup environment
  5. Verify application functionality
  6. Monitor and optimize performance
```

## Performance Optimization

### Caching Strategy
```yaml
Application Cache:
  - Redis for session storage
  - API response caching (5 minutes)
  - Database query caching

CDN Cache:
  - Static assets (1 year TTL)
  - Images (1 month TTL)
  - API responses (1 hour TTL)
```

### Database Optimization
```yaml
Indexing:
  - Primary keys (UUID)
  - Foreign keys
  - Search columns (name, email)
  - Composite indexes for common queries

Connection Pooling:
  - pgBouncer configuration
  - Max connections: 100
  - Pool size: 20
```

## Cost Optimization

### AWS OCRE 2024 Benefits
```yaml
Educational Pricing:
  - 40% discount on compute
  - 50% discount on storage
  - 30% discount on data transfer

Reserved Instances:
  - 1-year term for production
  - 50% cost reduction
  - Flexible instance types
```

### Cost Monitoring
```yaml
Budget Alerts:
  - Monthly budget: 500,000 KRW
  - Alert at 80% usage
  - Alert at 100% usage

Cost Optimization:
  - Auto-scaling based on demand
  - Spot instances for development
  - S3 lifecycle policies
  - CloudWatch log retention policies
```

## Maintenance Procedures

### Regular Maintenance
```yaml
Weekly:
  - Security updates
  - Performance monitoring review
  - Backup verification

Monthly:
  - Cost analysis
  - Capacity planning
  - Security audit

Quarterly:
  - Disaster recovery testing
  - Performance optimization review
  - Infrastructure updates
```

### Emergency Procedures
```yaml
High Availability:
  - Auto-scaling triggers
  - Load balancer health checks
  - Database failover procedures

Incident Response:
  - 24/7 monitoring alerts
  - Escalation procedures
  - Communication protocols
```

## Deployment Checklist

### Pre-deployment
- [ ] Code review and approval
- [ ] All tests passing
- [ ] Security scan completed
- [ ] Performance testing completed
- [ ] Database migrations tested
- [ ] Backup verification

### Deployment
- [ ] Maintenance window notification
- [ ] Database backup
- [ ] Deploy to staging environment
- [ ] Staging environment testing
- [ ] Deploy to production
- [ ] Post-deployment verification

### Post-deployment
- [ ] Monitor application metrics
- [ ] Verify all features working
- [ ] Check error rates and logs
- [ ] Update documentation
- [ ] Stakeholder notification

## Documentation and Runbooks

### Operational Runbooks
- [ ] Application startup/shutdown procedures
- [ ] Database maintenance procedures
- [ ] Backup and restore procedures
- [ ] Troubleshooting guides
- [ ] Incident response procedures

### Technical Documentation
- [ ] Infrastructure architecture diagrams
- [ ] Network topology documentation
- [ ] Security configuration guides
- [ ] API documentation
- [ ] Database schema documentation

---

**Last Updated**: December 2024
**Version**: 1.0
**Owner**: SNU Connectome Fellows Program Development Team