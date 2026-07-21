import { NextRequest, NextResponse } from 'next/server';
import { createAdminSession, createSession } from '@/lib/auth/session';
import { signToken } from '@/lib/auth/jwt';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, isAdmin } = body || {};

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 },
      );
    }

    // Role simulation
    const role = isAdmin ? 'admin' : 'user';
    const name = email.split('@')[0].toUpperCase();
    const userId = isAdmin ? 'admin_123' : 'user_456';

    const token = signToken({
      sub: userId,
      email,
      name,
      role,
    });

    // Set secure HTTP-Only session cookie on server
    if (isAdmin) {
      await createAdminSession(token);
    } else {
      await createSession(token);
    }

    return NextResponse.json(
      {
        message: 'Login successful',
        token,
        user: {
          id: userId,
          email,
          name,
          role,
        },
      },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      { message: 'An error occurred during authentication' },
      { status: 500 },
    );
  }
}
