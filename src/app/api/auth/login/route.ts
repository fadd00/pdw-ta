import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { verifyPassword, generateToken } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Cari user berdasarkan email
    const user = await prisma.user.findUnique({
      where: { email }
    })

    // Verifikasi user dan password
    if (!user || !(await verifyPassword(password, user.password))) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    // Generate JWT token
    const token = generateToken(user.id)

    // Buat response dengan user data
    const response = NextResponse.json({ 
      success: true, 
      user: { 
        id: user.id, 
        email: user.email, 
        isAdmin: user.isAdmin 
      }
    })
    
    // Set cookie untuk token
    response.cookies.set('token', token, { 
      httpOnly: true, 
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 hari
      path: '/',
      secure: process.env.NODE_ENV === 'production'
    })

    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Login endpoint' })
}