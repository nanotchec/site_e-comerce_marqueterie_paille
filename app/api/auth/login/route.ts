import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';
import { nanoid } from 'nanoid';

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();
        console.log(`[Login API] Attempting login for email: ${email}`);

        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            console.log(`[Login API] Login failed: User not found for email: ${email}`);
            return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
        }
        console.log(`[Login API] User found: ${user.id}`);

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            console.log(`[Login API] Login failed: Invalid password for user: ${user.id}`);
            return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
        }
        console.log(`[Login API] Password is valid for user: ${user.id}`);

        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret || jwtSecret === 'your-super-secret-jwt-secret') {
            console.error('[Login API] CRITICAL: JWT_SECRET is not defined or is not safe in .env file.');
            throw new Error('JWT_SECRET is not configured properly.');
        }
        console.log('[Login API] JWT Secret is loaded successfully.');
        
        const secret = new TextEncoder().encode(jwtSecret);
        const token = await new SignJWT({ id: user.id, role: user.role })
            .setProtectedHeader({ alg: 'HS256' })
            .setJti(nanoid())
            .setIssuedAt()
            .setExpirationTime('1h')
            .sign(secret);

        const response = NextResponse.json({ message: 'Login successful', role: user.role });
        response.cookies.set('auth-token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            path: '/',
            maxAge: 3600,
        });

        return response;

    } catch (error) {
        console.error('[Login API] Error during login process:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
} 