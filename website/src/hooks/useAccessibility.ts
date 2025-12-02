/**
 * Accessibility Hooks
 * ==================
 *
 * React hooks for accessibility features, ARIA attributes,
 * and keyboard navigation.
 */

'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import {
  focusManager,
  announceToScreenReader,
  prefersReducedMotion,
  prefersHighContrast,
  handleKeyboardNavigation,
  KEYBOARD_KEYS,
  type AccessibleFormField,
  generateFormAttributes
} from '@/lib/accessibility';

// Focus trap hook
export function useFocusTrap(isActive: boolean) {
  const ref = useRef<HTMLElement>(null);
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (isActive && ref.current) {
      cleanupRef.current = focusManager.trapFocus(ref.current);
    } else if (cleanupRef.current) {
      cleanupRef.current();
      cleanupRef.current = null;
    }

    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
      }
    };
  }, [isActive]);

  return ref;
}

// Announcement hook for screen readers
export function useAnnouncement() {
  const announce = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    announceToScreenReader(message, priority);
  }, []);

  return announce;
}

// Keyboard navigation hook
export function useKeyboardNavigation(
  handlers: Partial<Record<keyof typeof KEYBOARD_KEYS, () => void>>
) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      handleKeyboardNavigation(e, handlers);
    },
    [handlers]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);
}

// Form accessibility hook
export function useAccessibleForm(field: AccessibleFormField) {
  const attributes = generateFormAttributes(field);

  const [announceError, setAnnounceError] = useState(false);
  const announce = useAnnouncement();

  useEffect(() => {
    if (field.error && !announceError) {
      announce(`Error: ${field.error}`, 'assertive');
      setAnnounceError(true);
    } else if (!field.error) {
      setAnnounceError(false);
    }
  }, [field.error, announceError, announce]);

  return {
    fieldAttributes: attributes,
    errorId: field.error ? `${field.id}-error` : undefined,
    descriptionId: field.description ? `${field.id}-description` : undefined,
  };
}

// Motion preferences hook
export function useMotionPreferences() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return {
    reducedMotion,
    shouldAnimate: !reducedMotion,
  };
}

// High contrast preferences hook
export function useContrastPreferences() {
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-contrast: high)');
    setHighContrast(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setHighContrast(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return highContrast;
}

// Skip link hook
export function useSkipLinks() {
  useEffect(() => {
    const skipLinks = [
      { target: 'main-navigation', label: 'Skip to navigation' },
      { target: 'main-content', label: 'Skip to main content' },
      { target: 'footer', label: 'Skip to footer' },
    ];

    const container = document.createElement('div');
    container.className = 'skip-links';
    container.setAttribute('aria-label', 'Skip links');

    skipLinks.forEach(({ target, label }) => {
      const link = document.createElement('a');
      link.href = `#${target}`;
      link.textContent = label;
      link.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded z-50 focus:z-[9999]';

      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetElement = document.getElementById(target);
        if (targetElement) {
          targetElement.focus();
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      });

      container.appendChild(link);
    });

    document.body.insertBefore(container, document.body.firstChild);

    return () => {
      container.remove();
    };
  }, []);
}

// ARIA live region hook
export function useAriaLiveRegion(initialMessage = '', priority: 'polite' | 'assertive' = 'polite') {
  const [message, setMessage] = useState(initialMessage);
  const regionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (regionRef.current && message) {
      regionRef.current.textContent = message;
    }
  }, [message]);

  const updateMessage = useCallback((newMessage: string) => {
    setMessage(newMessage);
  }, []);

  const clearMessage = useCallback(() => {
    setMessage('');
  }, []);

  const regionProps = {
    ref: regionRef,
    'aria-live': priority,
    'aria-atomic': true,
    className: 'sr-only',
  };

  return {
    regionProps,
    updateMessage,
    clearMessage,
    message,
  };
}

// Roving tabindex hook for complex widgets
export function useRovingTabindex(items: HTMLElement[], activeIndex: number) {
  useEffect(() => {
    items.forEach((item, index) => {
      if (index === activeIndex) {
        item.setAttribute('tabindex', '0');
        item.focus();
      } else {
        item.setAttribute('tabindex', '-1');
      }
    });
  }, [items, activeIndex]);

  const handleKeyNavigation = useCallback(
    (e: KeyboardEvent, currentIndex: number) => {
      let newIndex = currentIndex;

      switch (e.key) {
        case KEYBOARD_KEYS.ARROW_DOWN:
        case KEYBOARD_KEYS.ARROW_RIGHT:
          e.preventDefault();
          newIndex = (currentIndex + 1) % items.length;
          break;
        case KEYBOARD_KEYS.ARROW_UP:
        case KEYBOARD_KEYS.ARROW_LEFT:
          e.preventDefault();
          newIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
          break;
        case KEYBOARD_KEYS.HOME:
          e.preventDefault();
          newIndex = 0;
          break;
        case KEYBOARD_KEYS.END:
          e.preventDefault();
          newIndex = items.length - 1;
          break;
      }

      if (newIndex !== currentIndex && items[newIndex]) {
        items.forEach((item, index) => {
          item.setAttribute('tabindex', index === newIndex ? '0' : '-1');
        });
        items[newIndex].focus();
      }

      return newIndex;
    },
    [items]
  );

  return handleKeyNavigation;
}

// Disclosure (collapsible content) hook
export function useDisclosure(initialOpen = false) {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLElement>(null);

  const toggle = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const buttonProps = {
    ref: buttonRef,
    'aria-expanded': isOpen,
    'aria-controls': contentRef.current?.id,
    onClick: toggle,
  };

  const contentProps = {
    ref: contentRef,
    'aria-hidden': !isOpen,
    hidden: !isOpen,
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === KEYBOARD_KEYS.ESCAPE && isOpen) {
        close();
        buttonRef.current?.focus();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, close]);

  return {
    isOpen,
    toggle,
    open,
    close,
    buttonProps,
    contentProps,
  };
}

// Modal accessibility hook
export function useModal(isOpen: boolean, onClose: () => void) {
  const modalRef = useRef<HTMLElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Focus management
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;

      // Focus first focusable element in modal
      setTimeout(() => {
        const firstFocusable = modalRef.current?.querySelector(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        ) as HTMLElement;
        firstFocusable?.focus();
      }, 0);
    } else {
      // Restore previous focus
      previousFocusRef.current?.focus();
    }
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === KEYBOARD_KEYS.ESCAPE) {
        onClose();
      }

      if (e.key === KEYBOARD_KEYS.TAB && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        ) as NodeListOf<HTMLElement>;

        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  // Prevent body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [isOpen]);

  const modalProps = {
    ref: modalRef,
    role: 'dialog',
    'aria-modal': true,
    'aria-hidden': !isOpen,
  };

  return { modalProps };
}

// Table accessibility hook
export function useAccessibleTable(
  headers: string[],
  caption?: string,
  summary?: string
) {
  const tableRef = useRef<HTMLTableElement>(null);

  const tableProps = {
    ref: tableRef,
    role: 'table',
    'aria-label': caption,
    'aria-describedby': summary ? `${tableRef.current?.id}-summary` : undefined,
  };

  const captionProps = caption ? {
    children: caption,
  } : undefined;

  const summaryProps = summary ? {
    id: `${tableRef.current?.id}-summary`,
    children: summary,
    className: 'sr-only',
  } : undefined;

  const getHeaderProps = (index: number) => ({
    scope: 'col' as const,
    id: `header-${index}`,
    children: headers[index],
  });

  const getCellProps = (headerIndex: number) => ({
    'aria-describedby': `header-${headerIndex}`,
  });

  return {
    tableProps,
    captionProps,
    summaryProps,
    getHeaderProps,
    getCellProps,
  };
}

// Loading state accessibility hook
export function useLoadingState(isLoading: boolean, loadingMessage = 'Loading...') {
  const announce = useAnnouncement();

  useEffect(() => {
    if (isLoading) {
      announce(loadingMessage, 'polite');
    }
  }, [isLoading, loadingMessage, announce]);

  const loadingProps = {
    'aria-live': 'polite' as const,
    'aria-busy': isLoading,
    'aria-label': isLoading ? loadingMessage : undefined,
  };

  return { loadingProps };
}

// Error boundary accessibility hook
export function useErrorAnnouncement(error: Error | null) {
  const announce = useAnnouncement();

  useEffect(() => {
    if (error) {
      announce(`Error: ${error.message}`, 'assertive');
    }
  }, [error, announce]);
}