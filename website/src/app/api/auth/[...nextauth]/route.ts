import NextAuth from 'next-auth';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

const authOptions: NextAuthOptions = {
  providers: [
    // Credentials Provider for admin login
    CredentialsProvider({
      id: 'credentials',
      name: 'Admin Login',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'admin@snu.ac.kr' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // In production, this would check against a database
        // For demo purposes, using hardcoded admin credentials
        if (credentials?.email === 'admin@snu.ac.kr' && credentials?.password === 'admin123') {
          return {
            id: '1',
            email: 'admin@snu.ac.kr',
            name: 'Admin User',
            role: 'admin',
          };
        }

        // Check for mentor credentials
        if (credentials?.email === 'mentor@snu.ac.kr' && credentials?.password === 'mentor123') {
          return {
            id: '2',
            email: 'mentor@snu.ac.kr',
            name: 'Mentor User',
            role: 'mentor',
          };
        }

        // Check for fellow credentials
        if (credentials?.email === 'fellow@snu.ac.kr' && credentials?.password === 'fellow123') {
          return {
            id: '3',
            email: 'fellow@snu.ac.kr',
            name: 'Fellow User',
            role: 'fellow',
          };
        }

        return null;
      },
    }),

    // Google OAuth for SNU email authentication
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
          hd: 'snu.ac.kr', // Restrict to SNU domain
        },
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile }) {
      // For Google OAuth, check if email is from SNU domain
      if (account?.provider === 'google') {
        if (user.email?.endsWith('@snu.ac.kr')) {
          // Determine role based on email or database lookup
          // For demo, assigning default role
          user.role = 'applicant';
          return true;
        }
        return false; // Reject non-SNU emails
      }
      return true;
    },

    async jwt({ token, user, account }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
        session.user.id = token.sub as string;
      }
      return session;
    },

    async redirect({ url, baseUrl }) {
      // Redirect to admin dashboard after login for admin users
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },

  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },

  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours
  },

  cookies: {
    sessionToken: {
      name: 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },

  secret: process.env.NEXTAUTH_SECRET,

  debug: process.env.NODE_ENV === 'development',
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };