'use client';

import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { SessionProvider } from 'next-auth/react';
import { useState, ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';
import { AccessibilityProvider } from './providers/AccessibilityProvider';
import { PerformanceProvider } from './providers/PerformanceProvider';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  // Create a stable QueryClient instance
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            cacheTime: 5 * 60 * 1000, // 5 minutes
            retry: (failureCount, error: any) => {
              // Don't retry for 4xx errors
              if (error?.status >= 400 && error?.status < 500) {
                return false;
              }
              return failureCount < 3;
            },
          },
          mutations: {
            retry: false,
          },
        },
      })
  );

  return (
    <PerformanceProvider>
      <AccessibilityProvider>
        <SessionProvider>
          <QueryClientProvider client={queryClient}>
            {children}

          {/* Toast notifications with accessibility features */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#333',
                color: '#fff',
                fontSize: '14px',
              },
              success: {
                style: {
                  background: '#10B981',
                },
                ariaProps: {
                  role: 'status',
                  'aria-live': 'polite',
                },
              },
              error: {
                style: {
                  background: '#EF4444',
                },
                ariaProps: {
                  role: 'alert',
                  'aria-live': 'assertive',
                },
              },
            }}
          />

          {/* React Query Devtools (only in development) */}
          {process.env.NODE_ENV === 'development' && (
            <ReactQueryDevtools initialIsOpen={false} />
          )}
          </QueryClientProvider>
        </SessionProvider>
      </AccessibilityProvider>
    </PerformanceProvider>
  );
}