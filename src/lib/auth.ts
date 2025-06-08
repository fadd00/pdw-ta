import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword)
}

export function generateToken(userId: string): string {
  console.log('🔐 Generating token for user:', userId)
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' })
}

export function verifyToken(token: string): { userId: string } | null {
  try {
    console.log('🔍 Verifying token...')
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string }
    console.log('✅ Token verified for user:', decoded.userId)
    return decoded
  } catch (error) {
    console.error('❌ Token verification failed:', error.message)
    return null
  }
}