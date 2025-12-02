'use client';

import { useState } from 'react';
import { signIn, getSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import {
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
  UserIcon,
} from '@heroicons/react/24/outline';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const handleCredentialsSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        toast.error('Invalid credentials. Please try again.');
        toast.error('자격 증명이 잘못되었습니다. 다시 시도해주세요.');
      } else {
        toast.success('Successfully signed in!');
        toast.success('성공적으로 로그인되었습니다!');

        // Get the session to determine redirect URL
        const session = await getSession();
        if (session?.user?.role === 'admin') {
          router.push('/admin');
        } else if (session?.user?.role === 'mentor') {
          router.push('/mentors');
        } else if (session?.user?.role === 'fellow') {
          router.push('/research');
        } else {
          router.push('/');
        }
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
      console.error('Sign in error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await signIn('google', {
        callbackUrl: callbackUrl,
      });
    } catch (error) {
      toast.error('Google sign in failed. Please try again.');
      console.error('Google sign in error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-gradient-brand rounded-xl flex items-center justify-center">
            <span className="text-white text-xl font-bold">🧠</span>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-lg korean text-gray-600">
            계정에 로그인하세요
          </p>
          <p className="mt-2 text-sm text-gray-600">
            SNU Connectome Fellows Program
          </p>
        </div>

        {/* Demo Credentials */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-blue-800 mb-2">
            Demo Credentials <span className="korean">데모 계정</span>
          </h3>
          <div className="space-y-1 text-xs text-blue-700">
            <p><strong>Admin:</strong> admin@snu.ac.kr / admin123</p>
            <p><strong>Mentor:</strong> mentor@snu.ac.kr / mentor123</p>
            <p><strong>Fellow:</strong> fellow@snu.ac.kr / fellow123</p>
          </div>
        </div>

        {/* Sign In Form */}
        <form className="mt-8 space-y-6" onSubmit={handleCredentialsSignIn}>
          <div className="space-y-4">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="form-label">
                Email Address <span className="korean">이메일 주소</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="form-input pl-10"
                  placeholder="your.email@snu.ac.kr"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="form-label">
                Password <span className="korean">비밀번호</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockClosedIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  className="form-input pl-10 pr-10"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Sign In Button */}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <span>Signing in...</span>
                  <span className="korean ml-2">로그인 중...</span>
                </>
              ) : (
                <>
                  <span>Sign in</span>
                  <span className="korean ml-2">로그인</span>
                </>
              )}
            </button>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 text-gray-500">Or continue with</span>
            </div>
          </div>

          {/* Google Sign In */}
          <div>
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brain-primary rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span>Sign in with Google SNU Account</span>
            </button>
          </div>
        </form>

        {/* Footer Links */}
        <div className="text-center">
          <Link
            href="/"
            className="text-sm text-brain-primary hover:text-brain-secondary transition-colors duration-200"
          >
            Back to Website
            <span className="korean ml-1">웹사이트로 돌아가기</span>
          </Link>
        </div>
      </div>
    </div>
  );
}