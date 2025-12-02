import { GET, POST } from '../[...nextauth]/route';
import { NextRequest } from 'next/server';

// Mock NextAuth
jest.mock('next-auth', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    GET: jest.fn(),
    POST: jest.fn(),
  })),
}));

describe('Authentication API Routes', () => {
  let mockRequest: NextRequest;

  beforeEach(() => {
    mockRequest = {
      url: 'http://localhost:3000/api/auth/signin',
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      json: jest.fn().mockResolvedValue({
        email: 'admin@snu.ac.kr',
        password: 'admin123',
      }),
    } as unknown as NextRequest;
  });

  it('handles GET requests to auth endpoints', async () => {
    const response = await GET(mockRequest);
    expect(response).toBeDefined();
  });

  it('handles POST requests to auth endpoints', async () => {
    const response = await POST(mockRequest);
    expect(response).toBeDefined();
  });

  it('should export auth handlers', () => {
    expect(GET).toBeDefined();
    expect(POST).toBeDefined();
  });
});

// Test auth configuration
describe('Auth Configuration', () => {
  it('should have proper provider configuration', () => {
    const { authOptions } = require('../[...nextauth]/route');

    expect(authOptions).toBeDefined();
    expect(authOptions.providers).toBeDefined();
    expect(authOptions.providers.length).toBeGreaterThan(0);
  });

  it('should have proper callback configuration', () => {
    const { authOptions } = require('../[...nextauth]/route');

    expect(authOptions.callbacks).toBeDefined();
    expect(authOptions.callbacks.signIn).toBeDefined();
    expect(authOptions.callbacks.jwt).toBeDefined();
    expect(authOptions.callbacks.session).toBeDefined();
  });

  it('should have proper page configuration', () => {
    const { authOptions } = require('../[...nextauth]/route');

    expect(authOptions.pages).toBeDefined();
    expect(authOptions.pages.signIn).toBe('/auth/signin');
    expect(authOptions.pages.error).toBe('/auth/error');
  });

  it('should have JWT session strategy', () => {
    const { authOptions } = require('../[...nextauth]/route');

    expect(authOptions.session).toBeDefined();
    expect(authOptions.session.strategy).toBe('jwt');
  });
});