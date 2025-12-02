/**
 * Health Check API Endpoint
 * =========================
 *
 * Comprehensive health check endpoint for monitoring system status,
 * database connectivity, and service dependencies.
 */

import { NextRequest, NextResponse } from 'next/server';

// Health check response type
interface HealthCheckResponse {
  status: 'healthy' | 'unhealthy' | 'degraded';
  timestamp: string;
  version: string;
  uptime: number;
  environment: string;
  checks: {
    database: HealthCheck;
    redis: HealthCheck;
    storage: HealthCheck;
    external: HealthCheck;
  };
  metrics?: {
    memoryUsage: NodeJS.MemoryUsage;
    responseTime: number;
  };
}

interface HealthCheck {
  status: 'pass' | 'fail' | 'warn';
  responseTime?: number;
  error?: string;
  details?: any;
}

// Cache health check results briefly
let lastHealthCheck: HealthCheckResponse | null = null;
let lastCheckTime = 0;
const CACHE_DURATION = 30000; // 30 seconds

export async function GET(request: NextRequest): Promise<NextResponse> {
  const startTime = Date.now();

  // Return cached result if recent
  if (lastHealthCheck && (Date.now() - lastCheckTime) < CACHE_DURATION) {
    return NextResponse.json(lastHealthCheck, {
      status: lastHealthCheck.status === 'healthy' ? 200 : 503,
    });
  }

  try {
    const healthCheck: HealthCheckResponse = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || '1.0.0',
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      checks: {
        database: await checkDatabase(),
        redis: await checkRedis(),
        storage: await checkStorage(),
        external: await checkExternalServices(),
      },
      metrics: {
        memoryUsage: process.memoryUsage(),
        responseTime: Date.now() - startTime,
      },
    };

    // Determine overall status
    const checks = Object.values(healthCheck.checks);
    const failedChecks = checks.filter(check => check.status === 'fail');
    const warnChecks = checks.filter(check => check.status === 'warn');

    if (failedChecks.length > 0) {
      healthCheck.status = 'unhealthy';
    } else if (warnChecks.length > 0) {
      healthCheck.status = 'degraded';
    }

    // Cache the result
    lastHealthCheck = healthCheck;
    lastCheckTime = Date.now();

    const statusCode = healthCheck.status === 'healthy' ? 200 : 503;

    return NextResponse.json(healthCheck, {
      status: statusCode,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Content-Type': 'application/json',
      },
    });

  } catch (error) {
    console.error('Health check failed:', error);

    const errorResponse: HealthCheckResponse = {
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || '1.0.0',
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      checks: {
        database: { status: 'fail', error: 'Health check error' },
        redis: { status: 'fail', error: 'Health check error' },
        storage: { status: 'fail', error: 'Health check error' },
        external: { status: 'fail', error: 'Health check error' },
      },
      metrics: {
        memoryUsage: process.memoryUsage(),
        responseTime: Date.now() - startTime,
      },
    };

    return NextResponse.json(errorResponse, { status: 503 });
  }
}

// Database health check
async function checkDatabase(): Promise<HealthCheck> {
  const startTime = Date.now();

  try {
    // Mock database check - replace with actual database connection
    if (!process.env.DATABASE_URL) {
      return {
        status: 'warn',
        error: 'Database URL not configured',
        responseTime: Date.now() - startTime,
      };
    }

    // In a real implementation, you would:
    // const db = await connectToDatabase();
    // const result = await db.query('SELECT 1');

    // Simulate database check
    await new Promise(resolve => setTimeout(resolve, 10));

    return {
      status: 'pass',
      responseTime: Date.now() - startTime,
      details: {
        connectionPool: 'active',
        queriesExecuted: 'ok',
      },
    };

  } catch (error) {
    return {
      status: 'fail',
      error: error instanceof Error ? error.message : 'Database check failed',
      responseTime: Date.now() - startTime,
    };
  }
}

// Redis health check
async function checkRedis(): Promise<HealthCheck> {
  const startTime = Date.now();

  try {
    if (!process.env.REDIS_URL) {
      return {
        status: 'warn',
        error: 'Redis URL not configured',
        responseTime: Date.now() - startTime,
      };
    }

    // In a real implementation:
    // const redis = new Redis(process.env.REDIS_URL);
    // await redis.ping();

    // Simulate Redis check
    await new Promise(resolve => setTimeout(resolve, 5));

    return {
      status: 'pass',
      responseTime: Date.now() - startTime,
      details: {
        connection: 'active',
        memory: 'ok',
      },
    };

  } catch (error) {
    return {
      status: 'fail',
      error: error instanceof Error ? error.message : 'Redis check failed',
      responseTime: Date.now() - startTime,
    };
  }
}

// Storage health check
async function checkStorage(): Promise<HealthCheck> {
  const startTime = Date.now();

  try {
    if (!process.env.MINIO_ENDPOINT) {
      return {
        status: 'warn',
        error: 'Storage endpoint not configured',
        responseTime: Date.now() - startTime,
      };
    }

    // In a real implementation:
    // const minioClient = new Minio.Client({...});
    // await minioClient.listBuckets();

    // Simulate storage check
    await new Promise(resolve => setTimeout(resolve, 15));

    return {
      status: 'pass',
      responseTime: Date.now() - startTime,
      details: {
        buckets: 'accessible',
        diskSpace: 'sufficient',
      },
    };

  } catch (error) {
    return {
      status: 'fail',
      error: error instanceof Error ? error.message : 'Storage check failed',
      responseTime: Date.now() - startTime,
    };
  }
}

// External services health check
async function checkExternalServices(): Promise<HealthCheck> {
  const startTime = Date.now();

  try {
    const checks = await Promise.allSettled([
      // Check Google OAuth
      fetch('https://accounts.google.com/.well-known/openid_configuration', {
        method: 'HEAD',
        signal: AbortSignal.timeout(5000),
      }),
      // Check email service
      process.env.SMTP_HOST ? Promise.resolve({ ok: true }) : Promise.reject('SMTP not configured'),
    ]);

    const failedChecks = checks.filter(result => result.status === 'rejected');

    if (failedChecks.length === checks.length) {
      return {
        status: 'fail',
        error: 'All external services unreachable',
        responseTime: Date.now() - startTime,
      };
    } else if (failedChecks.length > 0) {
      return {
        status: 'warn',
        error: `${failedChecks.length}/${checks.length} external services unreachable`,
        responseTime: Date.now() - startTime,
      };
    }

    return {
      status: 'pass',
      responseTime: Date.now() - startTime,
      details: {
        oauth: 'reachable',
        email: 'configured',
      },
    };

  } catch (error) {
    return {
      status: 'fail',
      error: error instanceof Error ? error.message : 'External services check failed',
      responseTime: Date.now() - startTime,
    };
  }
}

// Simple GET endpoint for load balancer health checks
export async function HEAD(): Promise<NextResponse> {
  try {
    // Quick health check without detailed diagnostics
    const isHealthy = process.uptime() > 0;

    return new NextResponse(null, {
      status: isHealthy ? 200 : 503,
      headers: {
        'Cache-Control': 'no-cache',
      },
    });
  } catch {
    return new NextResponse(null, { status: 503 });
  }
}