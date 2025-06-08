import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { verifyToken } from '@/lib/auth'

// GET - Ambil semua produk (public)
export async function GET() {
  try {
    console.log('🔍 Fetching products...')
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' }
    })
    console.log('✅ Products fetched:', products.length)
    return NextResponse.json(products)
  } catch (error) {
    console.error('❌ Get products error:', error)
    return NextResponse.json({ error: 'Server error: ' + error.message }, { status: 500 })
  }
}

// POST - Tambah produk baru (admin only)
export async function POST(request: NextRequest) {
  try {
    console.log('🔍 Creating new product...')
    
    // Cek authentication
    const token = request.cookies.get('token')?.value
    console.log('🔑 Token found:', !!token)
    
    if (!token) {
      console.log('❌ No token provided')
      return NextResponse.json({ error: 'Unauthorized - No token' }, { status: 401 })
    }

    const decoded = verifyToken(token)
    console.log('🔓 Token decoded:', !!decoded)
    
    if (!decoded) {
      console.log('❌ Invalid token')
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    // Cek apakah user adalah admin
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId }
    })
    console.log('👤 User found:', !!user, 'Is admin:', user?.isAdmin)

    if (!user?.isAdmin) {
      console.log('❌ User is not admin')
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 })
    }

    // Ambil data dari request body
    const body = await request.json()
    console.log('📝 Request body:', body)
    
    const { name, description, price, color, image } = body
    
    // Validasi input
    if (!name || !description || !price || !color) {
      console.log('❌ Missing required fields')
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    // Buat produk baru
    const productData = { 
      name, 
      description, 
      price: parseFloat(price), 
      color,
      image: image || null
    }
    console.log('🛍️ Creating product with data:', productData)
    
    const product = await prisma.product.create({
      data: productData
    })

    console.log('✅ Product created:', product.id)
    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error('❌ Create product error:', error)
    return NextResponse.json({ 
      error: 'Server error: ' + error.message,
      details: error.stack 
    }, { status: 500 })
  }
}