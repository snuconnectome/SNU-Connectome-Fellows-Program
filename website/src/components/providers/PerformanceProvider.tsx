/**
 * Performance Provider
 * ===================
 *
 * Client-side performance provider that monitors Core Web Vitals,
 * enforces performance budgets, and provides optimization utilities.
 */

'use client';

import React, { useEffect, createContext, useContext, useState } from 'react';
import { onCLS, onFCP, onINP, onLCP, onTTFB, Metric } from 'web-vitals';
import {
  trackWebVitals,
  PERFORMANCE_BUDGET,
  checkPerformanceBudget,
  monitorMemoryUsage,
  analyzeBundleSize,
  registerServiceWorker,
  type PerformanceBudget,
} from '@/lib/performance';

interface PerformanceMetrics {
  CLS?: number;
  FCP?: number;
  FID?: number;
  LCP?: number;
  TTFB?: number;
}

interface PerformanceContextType {
  metrics: PerformanceMetrics;
  budgetViolations: string[];
  memoryUsage: {
    usedJSHeapSize: number;
    totalJSHeapSize: number;
    jsHeapSizeLimit: number;
    usagePercentage: number;
  } | null;
  isLoading: boolean;
  performanceScore: number;
}

const PerformanceContext = createContext<PerformanceContextType | undefined>(undefined);

export function usePerformance() {
  const context = useContext(PerformanceContext);
  if (context === undefined) {
    throw new Error('usePerformance must be used within a PerformanceProvider');
  }
  return context;
}

interface PerformanceProviderProps {
  children: React.ReactNode;
}

export function PerformanceProvider({ children }: PerformanceProviderProps) {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({});
  const [budgetViolations, setBudgetViolations] = useState<string[]>([]);
  const [memoryUsage, setMemoryUsage] = useState<{
    usedJSHeapSize: number;
    totalJSHeapSize: number;
    jsHeapSizeLimit: number;
    usagePercentage: number;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [performanceScore, setPerformanceScore] = useState(0);

  useEffect(() => {
    // Register service worker for caching
    registerServiceWorker();

    // Set up Web Vitals collection
    const handleMetric = (metric: Metric) => {
      trackWebVitals(metric);

      setMetrics(prev => ({
        ...prev,
        [metric.name]: metric.value,
      }));

      // Check performance budget
      const budgetCheck = checkPerformanceBudget({
        [metric.name.toLowerCase() as keyof PerformanceBudget]: metric.value,
      });

      if (!budgetCheck) {
        setBudgetViolations(prev => [
          ...prev.filter(v => !v.includes(metric.name)),
          `${metric.name}: ${metric.value} exceeds budget`,
        ]);
      }
    };

    // Collect all Web Vitals
    onCLS(handleMetric);
    onFCP(handleMetric);
    onINP(handleMetric);
    onLCP(handleMetric);
    onTTFB(handleMetric);

    // Monitor memory usage
    const updateMemoryUsage = () => {
      const usage = monitorMemoryUsage();
      if (usage) {
        setMemoryUsage(usage);
      }
    };

    // Initial memory check
    updateMemoryUsage();

    // Set up periodic monitoring
    const memoryInterval = setInterval(updateMemoryUsage, 30000); // Every 30 seconds
    const bundleAnalysisTimeout = setTimeout(analyzeBundleSize, 5000); // After 5 seconds

    // Performance monitoring setup complete
    const setupTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    // Calculate performance score periodically
    const scoreInterval = setInterval(() => {
      const score = calculatePerformanceScore(metrics);
      setPerformanceScore(score);
    }, 10000);

    // Resource hint optimization
    optimizeResourceLoading();

    // Cleanup
    return () => {
      clearInterval(memoryInterval);
      clearInterval(scoreInterval);
      clearTimeout(bundleAnalysisTimeout);
      clearTimeout(setupTimeout);
    };
  }, []);

  // Calculate performance score based on Core Web Vitals
  const calculatePerformanceScore = (currentMetrics: PerformanceMetrics): number => {
    let score = 100;

    // LCP scoring (Largest Contentful Paint)
    if (currentMetrics.LCP) {
      if (currentMetrics.LCP > 4000) score -= 40;
      else if (currentMetrics.LCP > 2500) score -= 20;
    }

    // FCP scoring (First Contentful Paint)
    if (currentMetrics.FCP) {
      if (currentMetrics.FCP > 3000) score -= 25;
      else if (currentMetrics.FCP > 1800) score -= 10;
    }

    // CLS scoring (Cumulative Layout Shift)
    if (currentMetrics.CLS) {
      if (currentMetrics.CLS > 0.25) score -= 25;
      else if (currentMetrics.CLS > 0.1) score -= 10;
    }

    // FID scoring (First Input Delay)
    if (currentMetrics.FID) {
      if (currentMetrics.FID > 300) score -= 25;
      else if (currentMetrics.FID > 100) score -= 10;
    }

    // TTFB scoring (Time to First Byte)
    if (currentMetrics.TTFB) {
      if (currentMetrics.TTFB > 800) score -= 15;
      else if (currentMetrics.TTFB > 600) score -= 5;
    }

    return Math.max(0, Math.round(score));
  };

  // Optimize resource loading with preload hints
  const optimizeResourceLoading = () => {
    // Preload critical fonts
    const criticalFonts = [
      '/fonts/Inter-Regular.woff2',
      '/fonts/Inter-Medium.woff2',
      '/fonts/Inter-SemiBold.woff2',
    ];

    criticalFonts.forEach(fontUrl => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = fontUrl;
      link.as = 'font';
      link.type = 'font/woff2';
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });

    // Prefetch likely next pages
    const likelyNextPages = [
      '/apply',
      '/program',
      '/research',
      '/people',
    ];

    likelyNextPages.forEach(pageUrl => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = pageUrl;
      document.head.appendChild(link);
    });

    // DNS prefetch for external domains
    const externalDomains = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
      'https://www.google-analytics.com',
    ];

    externalDomains.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'dns-prefetch';
      link.href = domain;
      document.head.appendChild(link);
    });
  };

  const contextValue: PerformanceContextType = {
    metrics,
    budgetViolations,
    memoryUsage,
    isLoading,
    performanceScore,
  };

  return (
    <PerformanceContext.Provider value={contextValue}>
      {children}

      {/* Development performance panel */}
      {process.env.NODE_ENV === 'development' && (
        <PerformanceDevPanel
          metrics={metrics}
          budgetViolations={budgetViolations}
          memoryUsage={memoryUsage}
          performanceScore={performanceScore}
        />
      )}
    </PerformanceContext.Provider>
  );
}

// Development performance monitoring panel
interface PerformanceDevPanelProps {
  metrics: PerformanceMetrics;
  budgetViolations: string[];
  memoryUsage: {
    usedJSHeapSize: number;
    totalJSHeapSize: number;
    jsHeapSizeLimit: number;
    usagePercentage: number;
  } | null;
  performanceScore: number;
}

function PerformanceDevPanel({
  metrics,
  budgetViolations,
  memoryUsage,
  performanceScore,
}: PerformanceDevPanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return 'Good';
    if (score >= 75) return 'Needs Improvement';
    return 'Poor';
  };

  const formatMetric = (value: number | undefined, unit: string) => {
    if (value === undefined) return 'N/A';
    return `${Math.round(value)}${unit}`;
  };

  return (
    <div className="fixed bottom-16 right-4 z-[9998]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          px-4 py-2 rounded-lg text-white font-medium shadow-lg
          ${performanceScore >= 90 ? 'bg-green-600 hover:bg-green-700' :
            performanceScore >= 75 ? 'bg-yellow-600 hover:bg-yellow-700' :
            'bg-red-600 hover:bg-red-700'
          }
        `}
        aria-label={`Performance panel. Score: ${performanceScore}/100`}
      >
        ⚡ {performanceScore}/100
      </button>

      {isOpen && (
        <div className="absolute bottom-12 right-0 w-96 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl p-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
              Performance Monitor
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              aria-label="Close performance panel"
            >
              ✕
            </button>
          </div>

          <div className="space-y-4">
            {/* Performance Score */}
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Overall Score:</span>
              <span className={`text-lg font-bold ${getScoreColor(performanceScore)}`}>
                {performanceScore}/100
              </span>
            </div>
            <div className="text-xs text-gray-500">
              Status: {getScoreLabel(performanceScore)}
            </div>

            {/* Core Web Vitals */}
            <div>
              <h4 className="text-sm font-medium mb-2 text-gray-900 dark:text-gray-100">
                Core Web Vitals:
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex justify-between">
                  <span>LCP:</span>
                  <span className={metrics.LCP && metrics.LCP > 2500 ? 'text-red-600' : 'text-green-600'}>
                    {formatMetric(metrics.LCP, 'ms')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>FCP:</span>
                  <span className={metrics.FCP && metrics.FCP > 1800 ? 'text-red-600' : 'text-green-600'}>
                    {formatMetric(metrics.FCP, 'ms')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>CLS:</span>
                  <span className={metrics.CLS && metrics.CLS > 0.1 ? 'text-red-600' : 'text-green-600'}>
                    {metrics.CLS ? metrics.CLS.toFixed(3) : 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>FID:</span>
                  <span className={metrics.FID && metrics.FID > 100 ? 'text-red-600' : 'text-green-600'}>
                    {formatMetric(metrics.FID, 'ms')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>TTFB:</span>
                  <span className={metrics.TTFB && metrics.TTFB > 600 ? 'text-red-600' : 'text-green-600'}>
                    {formatMetric(metrics.TTFB, 'ms')}
                  </span>
                </div>
              </div>
            </div>

            {/* Memory Usage */}
            {memoryUsage && (
              <div>
                <h4 className="text-sm font-medium mb-2 text-gray-900 dark:text-gray-100">
                  Memory Usage:
                </h4>
                <div className="text-xs space-y-1">
                  <div className="flex justify-between">
                    <span>Used:</span>
                    <span>{memoryUsage.usedJSHeapSize}MB</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total:</span>
                    <span>{memoryUsage.totalJSHeapSize}MB</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Usage:</span>
                    <span className={memoryUsage.usagePercentage > 80 ? 'text-red-600' : 'text-green-600'}>
                      {memoryUsage.usagePercentage}%
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Budget Violations */}
            {budgetViolations.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-2 text-red-600">
                  Budget Violations:
                </h4>
                <div className="space-y-1">
                  {budgetViolations.slice(0, 3).map((violation, index) => (
                    <div key={index} className="text-xs text-red-600 bg-red-50 dark:bg-red-900/20 p-2 rounded">
                      {violation}
                    </div>
                  ))}
                  {budgetViolations.length > 3 && (
                    <div className="text-xs text-gray-500">
                      ... and {budgetViolations.length - 3} more violations
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Performance Thresholds */}
            <div className="text-xs text-gray-500 border-t pt-2">
              <div className="font-medium mb-1">Target Thresholds:</div>
              <div>LCP &lt; 2.5s, FCP &lt; 1.8s, CLS &lt; 0.1</div>
              <div>FID &lt; 100ms, TTFB &lt; 600ms</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}