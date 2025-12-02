/**
 * Accessible Button Component
 * ==========================
 *
 * Fully accessible button component with proper ARIA attributes,
 * keyboard navigation, focus management, and loading states.
 */

'use client';

import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { cn } from '@/lib/utils';
import { useAnnouncement, useLoadingState } from '@/hooks/useAccessibility';

export interface AccessibleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  loadingText?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  children: React.ReactNode;
}

const AccessibleButton = forwardRef<HTMLButtonElement, AccessibleButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      loadingText,
      icon,
      iconPosition = 'left',
      children,
      className,
      disabled,
      onClick,
      ...props
    },
    ref
  ) => {
    const internalRef = useRef<HTMLButtonElement>(null);
    const announce = useAnnouncement();
    const { loadingProps } = useLoadingState(isLoading, loadingText);

    useImperativeHandle(ref, () => internalRef.current!, []);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (isLoading || disabled) {
        e.preventDefault();
        return;
      }

      // Announce button action to screen readers
      const buttonText = typeof children === 'string' ? children : 'Button activated';
      announce(buttonText, 'polite');

      onClick?.(e);
    };

    const baseStyles = cn(
      // Base styles
      'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200',
      'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background',
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',

      // High contrast mode support
      'border border-transparent',
      '[&.high-contrast]:border-current [&.high-contrast]:bg-transparent [&.high-contrast]:text-current',

      // Size variants
      {
        'px-3 py-1.5 text-sm min-h-[2rem]': size === 'sm',
        'px-4 py-2 text-base min-h-[2.5rem]': size === 'md',
        'px-6 py-3 text-lg min-h-[3rem]': size === 'lg',
      },

      // Variant styles
      {
        // Primary
        'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 active:bg-blue-800':
          variant === 'primary',

        // Secondary
        'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500 active:bg-gray-400 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600':
          variant === 'secondary',

        // Outline
        'border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50 focus:ring-gray-500 active:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800':
          variant === 'outline',

        // Ghost
        'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500 active:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-800':
          variant === 'ghost',

        // Destructive
        'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 active:bg-red-800':
          variant === 'destructive',
      },

      className
    );

    const renderIcon = (position: 'left' | 'right') => {
      if (!icon || iconPosition !== position) return null;

      return (
        <span
          className={cn(
            'flex-shrink-0',
            isLoading && 'opacity-50'
          )}
          aria-hidden="true"
        >
          {icon}
        </span>
      );
    };

    const renderLoadingSpinner = () => (
      <svg
        className={cn(
          'animate-spin flex-shrink-0',
          {
            'h-3 w-3': size === 'sm',
            'h-4 w-4': size === 'md',
            'h-5 w-5': size === 'lg',
          }
        )}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    );

    const buttonContent = (
      <>
        {isLoading && renderLoadingSpinner()}
        {!isLoading && renderIcon('left')}
        <span className={cn(isLoading && 'opacity-70')}>
          {isLoading && loadingText ? loadingText : children}
        </span>
        {!isLoading && renderIcon('right')}
      </>
    );

    return (
      <button
        ref={internalRef}
        type="button"
        className={baseStyles}
        disabled={disabled || isLoading}
        onClick={handleClick}
        {...loadingProps}
        aria-describedby={isLoading ? `${props.id}-loading` : undefined}
        {...props}
      >
        {buttonContent}

        {/* Screen reader loading announcement */}
        {isLoading && (
          <span
            id={`${props.id}-loading`}
            className="sr-only"
            aria-live="polite"
            aria-atomic="true"
          >
            {loadingText || 'Loading...'}
          </span>
        )}
      </button>
    );
  }
);

AccessibleButton.displayName = 'AccessibleButton';

export { AccessibleButton };

// Specialized button variants for common use cases

export const PrimaryButton = forwardRef<HTMLButtonElement, Omit<AccessibleButtonProps, 'variant'>>(
  (props, ref) => <AccessibleButton ref={ref} variant="primary" {...props} />
);
PrimaryButton.displayName = 'PrimaryButton';

export const SecondaryButton = forwardRef<HTMLButtonElement, Omit<AccessibleButtonProps, 'variant'>>(
  (props, ref) => <AccessibleButton ref={ref} variant="secondary" {...props} />
);
SecondaryButton.displayName = 'SecondaryButton';

export const OutlineButton = forwardRef<HTMLButtonElement, Omit<AccessibleButtonProps, 'variant'>>(
  (props, ref) => <AccessibleButton ref={ref} variant="outline" {...props} />
);
OutlineButton.displayName = 'OutlineButton';

export const DestructiveButton = forwardRef<HTMLButtonElement, Omit<AccessibleButtonProps, 'variant'>>(
  (props, ref) => <AccessibleButton ref={ref} variant="destructive" {...props} />
);
DestructiveButton.displayName = 'DestructiveButton';