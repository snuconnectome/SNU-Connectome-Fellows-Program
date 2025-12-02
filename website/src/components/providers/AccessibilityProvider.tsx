/**
 * Accessibility Provider
 * =====================
 *
 * Client-side accessibility provider that initializes global
 * accessibility features and monitors user preferences.
 */

'use client';

import React, { useEffect, createContext, useContext, useState } from 'react';
import {
  respectMotionPreferences,
  applyHighContrastStyles,
  supportsFontScaling,
  accessibilityAuditor,
  type AccessibilityCheck,
} from '@/lib/accessibility';

interface AccessibilityContextType {
  reducedMotion: boolean;
  highContrast: boolean;
  largeText: boolean;
  auditResults: AccessibilityCheck[];
  runAccessibilityAudit: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export function useAccessibilityContext() {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibilityContext must be used within an AccessibilityProvider');
  }
  return context;
}

interface AccessibilityProviderProps {
  children: React.ReactNode;
}

export function AccessibilityProvider({ children }: AccessibilityProviderProps) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [auditResults, setAuditResults] = useState<AccessibilityCheck[]>([]);

  // Initialize accessibility features on mount
  useEffect(() => {
    // Apply motion preferences
    respectMotionPreferences();

    // Apply high contrast styles
    applyHighContrastStyles();

    // Support font scaling
    supportsFontScaling();

    // Set up media query listeners for preferences
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const contrastQuery = window.matchMedia('(prefers-contrast: high)');

    // Initialize state
    setReducedMotion(motionQuery.matches);
    setHighContrast(contrastQuery.matches);

    // Check font scale
    const rootFontSize = parseFloat(
      getComputedStyle(document.documentElement).fontSize
    );
    setLargeText(rootFontSize > 16 * 1.2);

    // Media query change handlers
    const handleMotionChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
      if (e.matches) {
        respectMotionPreferences();
      }
    };

    const handleContrastChange = (e: MediaQueryListEvent) => {
      setHighContrast(e.matches);
      if (e.matches) {
        applyHighContrastStyles();
      }
    };

    // Add listeners
    motionQuery.addEventListener('change', handleMotionChange);
    contrastQuery.addEventListener('change', handleContrastChange);

    // Add global accessibility event listeners
    document.addEventListener('keydown', handleGlobalKeyDown);
    window.addEventListener('resize', handleResize);

    // Run initial accessibility audit in development
    if (process.env.NODE_ENV === 'development') {
      setTimeout(() => {
        runAccessibilityAudit();
      }, 2000); // Delay to allow page to fully load
    }

    // Cleanup
    return () => {
      motionQuery.removeEventListener('change', handleMotionChange);
      contrastQuery.removeEventListener('change', handleContrastChange);
      document.removeEventListener('keydown', handleGlobalKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Global keyboard handler for accessibility shortcuts
  const handleGlobalKeyDown = (e: KeyboardEvent) => {
    // Alt + Shift + A: Run accessibility audit (development only)
    if (e.altKey && e.shiftKey && e.key === 'A' && process.env.NODE_ENV === 'development') {
      e.preventDefault();
      runAccessibilityAudit();
    }

    // Alt + Shift + S: Skip to main content
    if (e.altKey && e.shiftKey && e.key === 'S') {
      e.preventDefault();
      const mainContent = document.getElementById('main-content');
      if (mainContent) {
        mainContent.focus();
        mainContent.scrollIntoView({ behavior: 'smooth' });
      }
    }

    // Alt + Shift + N: Skip to navigation
    if (e.altKey && e.shiftKey && e.key === 'N') {
      e.preventDefault();
      const navigation = document.getElementById('main-navigation');
      if (navigation) {
        navigation.focus();
        navigation.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Handle window resize for font scaling detection
  const handleResize = () => {
    const rootFontSize = parseFloat(
      getComputedStyle(document.documentElement).fontSize
    );
    setLargeText(rootFontSize > 16 * 1.2);

    // Reapply font scaling support
    supportsFontScaling();
  };

  // Run accessibility audit
  const runAccessibilityAudit = () => {
    const results = accessibilityAuditor.audit();
    setAuditResults(results);

    if (process.env.NODE_ENV === 'development') {
      console.group('🔍 Accessibility Audit Results');
      console.log(accessibilityAuditor.getReport());
      console.groupEnd();

      // Highlight issues in the DOM (development only)
      results.forEach((issue, index) => {
        if (issue.element) {
          issue.element.style.outline = issue.severity === 'error' ? '2px solid red' : '2px solid orange';
          issue.element.setAttribute('data-a11y-issue', `${index + 1}: ${issue.message}`);

          // Add tooltip on hover
          const tooltip = document.createElement('div');
          tooltip.textContent = `A11Y: ${issue.message}`;
          tooltip.style.cssText = `
            position: absolute;
            background: #000;
            color: #fff;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            pointer-events: none;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.2s;
          `;

          issue.element.addEventListener('mouseenter', () => {
            document.body.appendChild(tooltip);
            tooltip.style.opacity = '1';
          });

          issue.element.addEventListener('mouseleave', () => {
            if (tooltip.parentNode) {
              document.body.removeChild(tooltip);
            }
          });

          issue.element.addEventListener('mousemove', (e: MouseEvent) => {
            tooltip.style.left = `${e.clientX + 10}px`;
            tooltip.style.top = `${e.clientY - 30}px`;
          });
        }
      });
    }
  };

  const contextValue: AccessibilityContextType = {
    reducedMotion,
    highContrast,
    largeText,
    auditResults,
    runAccessibilityAudit,
  };

  return (
    <AccessibilityContext.Provider value={contextValue}>
      {children}

      {/* Development accessibility panel */}
      {process.env.NODE_ENV === 'development' && (
        <AccessibilityDevPanel
          auditResults={auditResults}
          onRunAudit={runAccessibilityAudit}
        />
      )}
    </AccessibilityContext.Provider>
  );
}

// Development accessibility panel
interface AccessibilityDevPanelProps {
  auditResults: AccessibilityCheck[];
  onRunAudit: () => void;
}

function AccessibilityDevPanel({ auditResults, onRunAudit }: AccessibilityDevPanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  const errorCount = auditResults.filter(r => r.severity === 'error').length;
  const warningCount = auditResults.filter(r => r.severity === 'warning').length;

  return (
    <div className="fixed bottom-4 right-4 z-[9999]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          px-4 py-2 rounded-lg text-white font-medium shadow-lg
          ${errorCount > 0 ? 'bg-red-600 hover:bg-red-700' :
            warningCount > 0 ? 'bg-yellow-600 hover:bg-yellow-700' :
            'bg-green-600 hover:bg-green-700'
          }
        `}
        aria-label={`Accessibility panel. ${errorCount} errors, ${warningCount} warnings`}
      >
        A11Y ({errorCount + warningCount})
      </button>

      {isOpen && (
        <div className="absolute bottom-12 right-0 w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl p-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
              Accessibility Audit
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              aria-label="Close accessibility panel"
            >
              ✕
            </button>
          </div>

          <div className="space-y-2 mb-3">
            <div className="flex justify-between text-sm">
              <span>Errors:</span>
              <span className={errorCount > 0 ? 'text-red-600' : 'text-green-600'}>
                {errorCount}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Warnings:</span>
              <span className={warningCount > 0 ? 'text-yellow-600' : 'text-green-600'}>
                {warningCount}
              </span>
            </div>
          </div>

          <button
            onClick={onRunAudit}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm"
          >
            Run Audit
          </button>

          {auditResults.length > 0 && (
            <div className="mt-3 max-h-40 overflow-y-auto">
              <h4 className="text-sm font-medium mb-2 text-gray-900 dark:text-gray-100">
                Issues Found:
              </h4>
              {auditResults.slice(0, 5).map((issue, index) => (
                <div
                  key={index}
                  className={`text-xs p-2 mb-1 rounded ${
                    issue.severity === 'error'
                      ? 'bg-red-50 text-red-800 border border-red-200'
                      : 'bg-yellow-50 text-yellow-800 border border-yellow-200'
                  }`}
                >
                  <div className="font-medium">{issue.rule}</div>
                  <div className="opacity-75">{issue.message}</div>
                </div>
              ))}
              {auditResults.length > 5 && (
                <div className="text-xs text-gray-500 mt-2">
                  ... and {auditResults.length - 5} more issues
                </div>
              )}
            </div>
          )}

          <div className="mt-3 text-xs text-gray-500">
            <div>Keyboard shortcuts:</div>
            <div>• Alt+Shift+A: Run audit</div>
            <div>• Alt+Shift+S: Skip to main</div>
            <div>• Alt+Shift+N: Skip to nav</div>
          </div>
        </div>
      )}
    </div>
  );
}