/**
 * Offline Page
 * ============
 *
 * Displayed when the user is offline and the service worker
 * cannot fulfill their request from the cache.
 */

'use client';

import { useEffect, useState } from 'react';
import { WifiIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

export default function OfflinePage() {
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    setIsOnline(navigator.onLine);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleRetry = () => {
    if (isOnline) {
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
        {/* Icon */}
        <div className="mb-6">
          <div className="w-20 h-20 mx-auto bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
            <WifiIcon className="w-10 h-10 text-gray-400" />
          </div>
        </div>

        {/* Status indicator */}
        <div className="mb-4">
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
            isOnline
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
          }`}>
            <div className={`w-2 h-2 rounded-full mr-2 ${
              isOnline ? 'bg-green-500' : 'bg-red-500'
            }`} />
            {isOnline ? 'Connected' : 'Offline'}
          </div>
        </div>

        {/* Korean heading */}
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          오프라인 상태
        </h1>

        {/* English heading */}
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
          You're Currently Offline
        </h2>

        {/* Description */}
        <div className="text-gray-600 dark:text-gray-400 mb-6 space-y-2">
          <p>
            인터넷 연결을 확인해 주세요.
          </p>
          <p>
            Please check your internet connection and try again.
          </p>
        </div>

        {/* Retry button */}
        <button
          onClick={handleRetry}
          disabled={!isOnline}
          className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
            isOnline
              ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg'
              : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
          }`}
          aria-label={isOnline ? 'Retry connection' : 'Waiting for connection'}
        >
          <ArrowPathIcon className={`w-5 h-5 ${!isOnline ? 'animate-spin' : ''}`} />
          {isOnline ? '다시 시도 / Retry' : '연결 대기 중 / Waiting...'}
        </button>

        {/* Tips */}
        <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
            💡 오프라인 팁 / Offline Tips
          </h3>
          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <li>• Wi-Fi 연결 상태 확인 / Check Wi-Fi connection</li>
            <li>• 모바일 데이터 사용 / Try mobile data</li>
            <li>• 잠시 후 다시 시도 / Try again later</li>
          </ul>
        </div>

        {/* Back to home */}
        <div className="mt-6">
          <a
            href="/"
            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium underline"
          >
            홈으로 돌아가기 / Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}

// Note: Metadata is handled in layout.tsx for client components