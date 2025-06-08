import { NextRequest, NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import { join } from 'path'
import { verifyToken } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    // Cek authentication
    const token = request.cookies.get('token')?.value
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    // Cek apakah user adalah admin
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId }
    })

    if (!user?.isAdmin) {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 })
    }

    const data = await request.formData()
    const file: File | null = data.get('file') as unknown as File

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    // Validasi tipe file
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'File must be an image' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Generate unique filename
    const filename = Date.now() + '-' + file.name.replace(/[^a-zA-Z0-9.-]/g, '')
    const path = join(process.cwd(), 'public/uploads', filename)

    // Buat folder uploads jika belum ada
    try {
      await writeFile(path, buffer)
    } catch (error) {
      console.error('Error writing file:', error)
      return NextResponse.json({ error: 'Failed to save file' }, { status: 500 })
    }

    // Return path relatif untuk disimpan di database
    const imagePath = `/uploads/${filename}`
    
    return NextResponse.json({ imagePath })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}