/**
 * Performance Optimization Utilities
 * ==================================
 *
 * Utilities for Core Web Vitals optimization, lazy loading,
 * and performance monitoring.
 */

// Core Web Vitals tracking
export function trackWebVitals(metric: any) {
  const { id, name, value, rating } = metric;

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Performance] ${name}: ${value} (${rating})`);
  }

  // Send to analytics in production
  if (process.env.NODE_ENV === 'production') {
    // Google Analytics 4 event
    if (typeof gtag !== 'undefined') {
      gtag('event', name, {
        event_category: 'Web Vitals',
        value: Math.round(name === 'CLS' ? value * 1000 : value),
        event_label: id,
        non_interaction: true,
      });
    }

    // Custom analytics endpoint
    fetch('/api/analytics/web-vitals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        name,
        value,
        rating,
        url: window.location.href,
        timestamp: Date.now(),
      }),
    }).catch(console.error);
  }
}

// Intersection Observer for lazy loading
export function createIntersectionObserver(
  callback: IntersectionObserverCallback,
  options: IntersectionObserverInit = {}
): IntersectionObserver | null {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return null;
  }

  const defaultOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1,
    ...options,
  };

  return new IntersectionObserver(callback, defaultOptions);
}

// Preload critical resources
export function preloadResource(href: string, as: string, crossorigin?: string) {
  if (typeof window === 'undefined') return;

  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  link.as = as;
  if (crossorigin) {
    link.crossOrigin = crossorigin;
  }
  document.head.appendChild(link);
}

// Prefetch next pages
export function prefetchPage(href: string) {
  if (typeof window === 'undefined') return;

  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = href;
  document.head.appendChild(link);
}

// Critical CSS extraction helper
export function extractCriticalCSS(): string {
  if (typeof window === 'undefined') return '';

  const criticalCSS: string[] = [];
  const sheets = document.styleSheets;

  for (let i = 0; i < sheets.length; i++) {
    try {
      const rules = sheets[i].cssRules || sheets[i].rules;
      if (rules) {
        for (let j = 0; j < rules.length; j++) {
          const rule = rules[j];
          // Add logic to identify critical CSS rules
          if (rule.cssText && rule.cssText.includes('font-display')) {
            criticalCSS.push(rule.cssText);
          }
        }
      }
    } catch (e) {
      // Cross-origin stylesheet, skip
      continue;
    }
  }

  return criticalCSS.join('\n');
}

// Image optimization utilities
export interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  quality?: number;
  sizes?: string;
  loading?: 'eager' | 'lazy';
}

export function generateImageSizes(breakpoints: Record<string, number>) {
  const sizes = Object.entries(breakpoints)
    .sort(([, a], [, b]) => a - b)
    .map(([name, width]) => `(max-width: ${width}px) ${Math.floor(width * 0.9)}px`)
    .join(', ');

  return `${sizes}, 1200px`;
}

// Performance budget checking
export interface PerformanceBudget {
  maxBundleSize: number; // KB
  maxImageSize: number; // KB
  maxTTFB: number; // ms
  maxFCP: number; // ms
  maxLCP: number; // ms
  maxCLS: number; // score
}

export const PERFORMANCE_BUDGET: PerformanceBudget = {
  maxBundleSize: 300, // 300KB total JS bundle
  maxImageSize: 200, // 200KB per image
  maxTTFB: 600, // 600ms Time to First Byte
  maxFCP: 1800, // 1.8s First Contentful Paint
  maxLCP: 2500, // 2.5s Largest Contentful Paint
  maxCLS: 0.1, // 0.1 Cumulative Layout Shift
};

export function checkPerformanceBudget(metrics: Partial<PerformanceBudget>): boolean {
  const violations: string[] = [];

  Object.entries(metrics).forEach(([key, value]) => {
    const budgetKey = key as keyof PerformanceBudget;
    if (value > PERFORMANCE_BUDGET[budgetKey]) {
      violations.push(`${key}: ${value} exceeds budget of ${PERFORMANCE_BUDGET[budgetKey]}`);
    }
  });

  if (violations.length > 0) {
    console.warn('Performance budget violations:', violations);
    return false;
  }

  return true;
}

// Service Worker utilities
export function registerServiceWorker() {
  if (
    typeof window !== 'undefined' &&
    'serviceWorker' in navigator &&
    process.env.NODE_ENV === 'production'
  ) {
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  }
}

// Memory usage monitoring
export function monitorMemoryUsage() {
  if (typeof window === 'undefined' || !('memory' in performance)) {
    return null;
  }

  const memory = (performance as any).memory;

  return {
    usedJSHeapSize: Math.round(memory.usedJSHeapSize / 1048576), // MB
    totalJSHeapSize: Math.round(memory.totalJSHeapSize / 1048576), // MB
    jsHeapSizeLimit: Math.round(memory.jsHeapSizeLimit / 1048576), // MB
    usagePercentage: Math.round((memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100),
  };
}

// Bundle analyzer utility
export function analyzeBundleSize() {
  if (typeof window === 'undefined') return;

  // Log loaded modules for analysis
  const scripts = Array.from(document.scripts);
  const totalSize = scripts.reduce((size, script) => {
    if (script.src && script.src.includes('/_next/static/')) {
      // Estimate size from network panel or use performance API
      return size + (script.innerHTML.length || 0);
    }
    return size;
  }, 0);

  console.log(`Total estimated JS bundle size: ${Math.round(totalSize / 1024)}KB`);

  const memoryInfo = monitorMemoryUsage();
  if (memoryInfo) {
    console.log('Memory usage:', memoryInfo);
  }
}