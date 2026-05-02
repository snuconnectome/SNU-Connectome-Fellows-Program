/**
 * Accessibility Utilities
 * =====================
 *
 * Comprehensive utilities for WCAG 2.1 AA compliance,
 * screen reader support, and keyboard navigation.
 */

// Focus management utilities
export class FocusManager {
  private focusStack: HTMLElement[] = [];

  trapFocus(element: HTMLElement) {
    const focusableElements = this.getFocusableElements(element);
    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }

      if (e.key === 'Escape') {
        this.releaseFocus();
      }
    };

    element.addEventListener('keydown', handleKeydown);
    firstElement.focus();

    return () => {
      element.removeEventListener('keydown', handleKeydown);
    };
  }

  pushFocus(element: HTMLElement) {
    if (document.activeElement instanceof HTMLElement) {
      this.focusStack.push(document.activeElement);
    }
    element.focus();
  }

  releaseFocus() {
    const previousElement = this.focusStack.pop();
    if (previousElement) {
      previousElement.focus();
    }
  }

  getFocusableElements(container: HTMLElement): HTMLElement[] {
    const selector = [
      'button',
      '[href]',
      'input',
      'select',
      'textarea',
      '[tabindex]:not([tabindex="-1"])',
    ].join(', ');

    return Array.from(container.querySelectorAll(selector)).filter(
      (element) => {
        const el = element as HTMLElement;
        return !el.disabled && !el.hidden && el.offsetParent !== null;
      }
    ) as HTMLElement[];
  }
}

export const focusManager = new FocusManager();

// Keyboard navigation utilities
export const KEYBOARD_KEYS = {
  ENTER: 'Enter',
  SPACE: ' ',
  TAB: 'Tab',
  ESCAPE: 'Escape',
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
  HOME: 'Home',
  END: 'End',
} as const;

export function handleKeyboardNavigation(
  e: KeyboardEvent,
  handlers: Partial<Record<keyof typeof KEYBOARD_KEYS, () => void>>
) {
  const handler = handlers[e.key as keyof typeof KEYBOARD_KEYS];
  if (handler) {
    e.preventDefault();
    handler();
  }
}

// Screen reader utilities
export function announceToScreenReader(
  message: string,
  priority: 'polite' | 'assertive' = 'polite'
) {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;

  document.body.appendChild(announcement);

  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}

export function setAriaLabel(element: HTMLElement, label: string, labelledBy?: string) {
  if (labelledBy) {
    element.setAttribute('aria-labelledby', labelledBy);
  } else {
    element.setAttribute('aria-label', label);
  }
}

// Color contrast utilities
export function calculateContrast(color1: string, color2: string): number {
  const getLuminance = (color: string): number => {
    const rgb = hexToRgb(color);
    if (!rgb) return 0;

    const { r, g, b } = rgb;
    const [rs, gs, bs] = [r, g, b].map((c) => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });

    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };

  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  return (lighter + 0.05) / (darker + 0.05);
}

function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

export function checkColorContrast(
  foreground: string,
  background: string,
  level: 'AA' | 'AAA' = 'AA'
): { ratio: number; passes: boolean; recommendation?: string } {
  const ratio = calculateContrast(foreground, background);
  const threshold = level === 'AA' ? 4.5 : 7;
  const passes = ratio >= threshold;

  return {
    ratio,
    passes,
    recommendation: passes
      ? undefined
      : `Color contrast ratio ${ratio.toFixed(2)} is below ${level} standard (${threshold}). Consider using darker text or lighter background.`,
  };
}

// Form validation accessibility
export interface AccessibleFormField {
  id: string;
  label: string;
  description?: string;
  error?: string;
  required?: boolean;
}

export function generateFormAttributes(field: AccessibleFormField) {
  const attributes: Record<string, string> = {
    id: field.id,
    'aria-label': field.label,
  };

  if (field.required) {
    attributes['aria-required'] = 'true';
  }

  if (field.description) {
    const descId = `${field.id}-description`;
    attributes['aria-describedby'] = descId;
  }

  if (field.error) {
    const errorId = `${field.id}-error`;
    attributes['aria-describedby'] = field.description
      ? `${field.id}-description ${errorId}`
      : errorId;
    attributes['aria-invalid'] = 'true';
  }

  return attributes;
}

// Skip links utility
export function createSkipLink(targetId: string, label: string): HTMLElement {
  const skipLink = document.createElement('a');
  skipLink.href = `#${targetId}`;
  skipLink.textContent = label;
  skipLink.className = 'skip-link sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded z-50';

  skipLink.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      target.focus();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });

  return skipLink;
}

// Motion preferences
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function respectMotionPreferences() {
  if (prefersReducedMotion()) {
    document.documentElement.style.setProperty('--animation-duration', '0.01ms');
    document.documentElement.style.setProperty('--transition-duration', '0.01ms');
  }
}

// High contrast mode detection
export function prefersHighContrast(): boolean {
  return window.matchMedia('(prefers-contrast: high)').matches;
}

export function applyHighContrastStyles() {
  if (prefersHighContrast()) {
    document.documentElement.classList.add('high-contrast');
  }
}

// Text sizing utilities
export function getFontScalePreference(): number {
  const rootFontSize = parseFloat(
    getComputedStyle(document.documentElement).fontSize
  );
  return rootFontSize / 16; // 16px is the default browser font size
}

export function supportsFontScaling() {
  const scale = getFontScalePreference();
  if (scale > 1.2) {
    document.documentElement.classList.add('large-text');
  }
}

// Landmark navigation
export function createLandmarkNavigation(): HTMLElement {
  const nav = document.createElement('nav');
  nav.setAttribute('aria-label', 'Page landmarks');
  nav.className = 'landmark-nav sr-only focus-within:not-sr-only fixed top-0 left-0 w-full bg-white border-b-2 border-blue-600 z-50 p-4';

  const landmarks = [
    { id: 'main-navigation', label: 'Main Navigation' },
    { id: 'main-content', label: 'Main Content' },
    { id: 'sidebar', label: 'Sidebar' },
    { id: 'footer', label: 'Footer' },
  ];

  const list = document.createElement('ul');
  list.className = 'flex gap-4';

  landmarks.forEach(({ id, label }) => {
    const listItem = document.createElement('li');
    const link = document.createElement('a');
    link.href = `#${id}`;
    link.textContent = `Skip to ${label}`;
    link.className = 'text-blue-600 underline hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500';

    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById(id);
      if (target) {
        target.focus();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });

    listItem.appendChild(link);
    list.appendChild(listItem);
  });

  nav.appendChild(list);
  return nav;
}

// Accessibility testing utilities
export interface AccessibilityCheck {
  rule: string;
  element: HTMLElement;
  severity: 'error' | 'warning' | 'info';
  message: string;
  suggestion: string;
}

export class AccessibilityAuditor {
  private issues: AccessibilityCheck[] = [];

  audit(container: HTMLElement = document.body): AccessibilityCheck[] {
    this.issues = [];

    this.checkImages(container);
    this.checkButtons(container);
    this.checkLinks(container);
    this.checkForms(container);
    this.checkHeadings(container);
    this.checkLandmarks(container);

    return this.issues;
  }

  private addIssue(issue: AccessibilityCheck) {
    this.issues.push(issue);
  }

  private checkImages(container: HTMLElement) {
    const images = container.querySelectorAll('img');
    images.forEach((img) => {
      if (!img.alt && !img.getAttribute('aria-hidden')) {
        this.addIssue({
          rule: 'img-alt',
          element: img,
          severity: 'error',
          message: 'Image missing alt text',
          suggestion: 'Add descriptive alt text or aria-hidden="true" for decorative images',
        });
      }
    });
  }

  private checkButtons(container: HTMLElement) {
    const buttons = container.querySelectorAll('button');
    buttons.forEach((button) => {
      if (!button.textContent?.trim() && !button.getAttribute('aria-label')) {
        this.addIssue({
          rule: 'button-name',
          element: button,
          severity: 'error',
          message: 'Button missing accessible name',
          suggestion: 'Add text content or aria-label attribute',
        });
      }
    });
  }

  private checkLinks(container: HTMLElement) {
    const links = container.querySelectorAll('a[href]');
    links.forEach((link) => {
      if (!link.textContent?.trim() && !link.getAttribute('aria-label')) {
        this.addIssue({
          rule: 'link-name',
          element: link,
          severity: 'error',
          message: 'Link missing accessible name',
          suggestion: 'Add descriptive link text or aria-label',
        });
      }
    });
  }

  private checkForms(container: HTMLElement) {
    const inputs = container.querySelectorAll('input, textarea, select');
    inputs.forEach((input) => {
      const hasLabel = input.id && container.querySelector(`label[for="${input.id}"]`);
      const hasAriaLabel = input.getAttribute('aria-label');
      const hasAriaLabelledby = input.getAttribute('aria-labelledby');

      if (!hasLabel && !hasAriaLabel && !hasAriaLabelledby) {
        this.addIssue({
          rule: 'form-label',
          element: input,
          severity: 'error',
          message: 'Form control missing label',
          suggestion: 'Associate with label element or add aria-label',
        });
      }
    });
  }

  private checkHeadings(container: HTMLElement) {
    const headings = Array.from(container.querySelectorAll('h1, h2, h3, h4, h5, h6'));
    let previousLevel = 0;

    headings.forEach((heading) => {
      const level = parseInt(heading.tagName.charAt(1));

      if (level - previousLevel > 1) {
        this.addIssue({
          rule: 'heading-order',
          element: heading,
          severity: 'warning',
          message: 'Heading levels should not skip',
          suggestion: `Consider using h${previousLevel + 1} instead of h${level}`,
        });
      }

      previousLevel = level;
    });
  }

  private checkLandmarks(container: HTMLElement) {
    const main = container.querySelector('main');
    if (!main) {
      this.addIssue({
        rule: 'main-landmark',
        element: container,
        severity: 'warning',
        message: 'Page missing main landmark',
        suggestion: 'Add <main> element to identify primary content',
      });
    }
  }

  getReport(): string {
    const errorCount = this.issues.filter(i => i.severity === 'error').length;
    const warningCount = this.issues.filter(i => i.severity === 'warning').length;

    let report = `Accessibility Audit Report\n`;
    report += `==========================\n\n`;
    report += `Issues found: ${this.issues.length}\n`;
    report += `Errors: ${errorCount}\n`;
    report += `Warnings: ${warningCount}\n\n`;

    this.issues.forEach((issue, index) => {
      report += `${index + 1}. ${issue.rule} (${issue.severity})\n`;
      report += `   ${issue.message}\n`;
      report += `   Suggestion: ${issue.suggestion}\n\n`;
    });

    return report;
  }
}

export const accessibilityAuditor = new AccessibilityAuditor();