/**
 * Accessible Modal Component
 * =========================
 *
 * Fully accessible modal with focus trapping, keyboard navigation,
 * and screen reader support following ARIA best practices.
 */

'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';
import { useModal, useAnnouncement } from '@/hooks/useAccessibility';
import { AccessibleButton } from './AccessibleButton';

export interface AccessibleModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
  className?: string;
  overlayClassName?: string;
  contentClassName?: string;
}

export function AccessibleModal({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = 'md',
  closeOnOverlayClick = true,
  closeOnEscape = true,
  showCloseButton = true,
  className,
  overlayClassName,
  contentClassName,
}: AccessibleModalProps) {
  const [mounted, setMounted] = useState(false);
  const announce = useAnnouncement();
  const { modalProps } = useModal(isOpen, onClose);

  // Ensure client-side rendering for portal
  useEffect(() => {
    setMounted(true);
  }, []);

  // Announce modal state changes
  useEffect(() => {
    if (isOpen) {
      announce(`${title} dialog opened`, 'polite');
    }
  }, [isOpen, title, announce]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleClose = () => {
    announce(`${title} dialog closed`, 'polite');
    onClose();
  };

  if (!mounted || !isOpen) {
    return null;
  }

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-[90vw] max-h-[90vh]',
  };

  const modalContent = (
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center',
        'bg-black/50 backdrop-blur-sm',
        'transition-opacity duration-300',
        overlayClassName
      )}
      onClick={handleOverlayClick}
      role="presentation"
    >
      <div
        {...modalProps}
        className={cn(
          'relative w-full mx-4 my-8',
          sizeClasses[size],
          'bg-white dark:bg-gray-900 rounded-lg shadow-2xl',
          'border border-gray-200 dark:border-gray-800',
          'transform transition-all duration-300',
          'max-h-[calc(100vh-4rem)] overflow-hidden',
          className
        )}
        aria-labelledby="modal-title"
        aria-describedby={description ? 'modal-description' : undefined}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex-1 min-w-0">
            <h2
              id="modal-title"
              className="text-xl font-semibold text-gray-900 dark:text-gray-100 truncate"
            >
              {title}
            </h2>
            {description && (
              <p
                id="modal-description"
                className="mt-1 text-sm text-gray-500 dark:text-gray-400"
              >
                {description}
              </p>
            )}
          </div>

          {showCloseButton && (
            <AccessibleButton
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="ml-4 p-2"
              aria-label="Close dialog"
            >
              <XMarkIcon className="h-5 w-5" aria-hidden="true" />
            </AccessibleButton>
          )}
        </div>

        {/* Modal Content */}
        <div
          className={cn(
            'p-6 overflow-y-auto',
            'max-h-[calc(100vh-12rem)]',
            contentClassName
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}

// Modal variants for common use cases

export interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  confirmVariant?: 'primary' | 'destructive';
  isLoading?: boolean;
}

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmVariant = 'primary',
  isLoading = false,
}: ConfirmationModalProps) {
  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <AccessibleModal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      description={description}
      size="sm"
      closeOnOverlayClick={!isLoading}
      closeOnEscape={!isLoading}
      showCloseButton={!isLoading}
    >
      <div className="flex flex-col gap-4">
        <p className="text-gray-700 dark:text-gray-300">
          {description}
        </p>

        <div className="flex justify-end gap-3">
          <AccessibleButton
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
          >
            {cancelText}
          </AccessibleButton>
          <AccessibleButton
            variant={confirmVariant}
            onClick={handleConfirm}
            isLoading={isLoading}
            loadingText="Processing..."
          >
            {confirmText}
          </AccessibleButton>
        </div>
      </div>
    </AccessibleModal>
  );
}

export interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type?: 'info' | 'success' | 'warning' | 'error';
  actionText?: string;
}

export function AlertModal({
  isOpen,
  onClose,
  title,
  message,
  type = 'info',
  actionText = 'OK',
}: AlertModalProps) {
  const typeStyles = {
    info: 'border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-800 dark:bg-blue-900/20 dark:text-blue-200',
    success: 'border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-900/20 dark:text-green-200',
    warning: 'border-yellow-200 bg-yellow-50 text-yellow-800 dark:border-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200',
    error: 'border-red-200 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-900/20 dark:text-red-200',
  };

  return (
    <AccessibleModal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="sm"
    >
      <div className="flex flex-col gap-4">
        <div
          className={cn(
            'p-4 rounded-lg border-2',
            typeStyles[type]
          )}
          role="alert"
          aria-live="assertive"
        >
          <p>{message}</p>
        </div>

        <div className="flex justify-end">
          <AccessibleButton
            variant="primary"
            onClick={onClose}
          >
            {actionText}
          </AccessibleButton>
        </div>
      </div>
    </AccessibleModal>
  );
}