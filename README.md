# Essence - Perfume E-commerce Platform

Sebuah platform e-commerce untuk parfum yang dibangun dengan Next.js 15, TypeScript, Prisma, dan Tailwind CSS. Platform ini memiliki fitur landing page yang elegan, sistem autentikasi, dan panel admin untuk manajemen produk.

## 🌟 Fitur

- **Landing Page Responsif** dengan dark/light mode toggle
- **Sistem Autentikasi** dengan JWT tokens
- **Panel Admin** untuk manajemen produk
- **Upload Gambar** untuk produk
- **Database Management** dengan Prisma ORM
- **Modern UI** dengan Tailwind CSS
- **TypeScript** untuk type safety

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Database**: SQLite dengan Prisma ORM
- **Authentication**: JWT dengan bcrypt
- **File Upload**: Next.js API Routes
- **Deployment**: Vercel (recommended)

## 📋 Prerequisites

Pastikan Anda memiliki:
- Node.js 18+ terinstall
- npm, yarn, pnpm, atau bun

## 🚀 Installation & Setup

### 1. Clone Repository

```bash
git clone <your-repository-url>
cd pdw-ta
```

### 2. Install Dependencies

```bash
npm install
# atau
yarn install
# atau
pnpm install
```

### 3. Environment Variables

Buat file `.env` di root directory dan tambahkan:

```env
# Database
DATABASE_URL="file:./dev.db"

# JWT Secret (ganti dengan secret key yang kuat)
JWT_SECRET="your-super-secret-jwt-key-here"

# NextAuth Secret (optional, untuk future features)
NEXTAUTH_SECRET="your-nextauth-secret"

# Environment
NODE_ENV="development"
```

### 4. Database Setup

```bash
# Generate Prisma Client
npx prisma generate

# Create and migrate database
npx prisma db push

# (Optional) Open Prisma Studio untuk melihat database
npx prisma studio
```

### 5. Create Admin User

Buat file `scripts/create-admin.js`:

```javascript
const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  try {
    const hashedPassword = await bcrypt.hash('admin123', 12)
    
    const admin = await prisma.user.upsert({
      where: { email: 'admin@essence.com' },
      update: {},
      create: {
        email: 'admin@essence.com',
        password: hashedPassword,
        isAdmin: true,
      },
    })
    
    console.log('✅ Admin user created/updated:', admin.email)
    console.log('📧 Email: admin@essence.com')
    console.log('🔑 Password: admin123')
  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
```

Jalankan script:

```bash
node scripts/create-admin.js
```

### 6. Create Upload Directory

```bash
mkdir -p public/uploads
```

### 7. Run Development Server

```bash
npm run dev
# atau
yarn dev
# atau
pnpm dev
```

Buka [http://localhost:3000](http://localhost:3000) untuk melihat aplikasi.

## 📁 Project Structure

```
src/
├── app/
│   ├── admin/              # Admin panel pages
│   │   └── page.tsx
│   ├── api/                # API routes
│   │   ├── auth/
│   │   │   └── login/
│   │   │       └── route.ts
│   │   ├── products/
│   │   │   └── route.ts
│   │   └── upload/
│   │       └── route.ts
│   ├── login/              # Login page
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx            # Landing page
├── lib/
│   ├── auth.ts             # Authentication utilities
│   └── db.ts               # Database connection
prisma/
├── schema.prisma           # Database schema
└── dev.db                  # SQLite database (generated)
public/
└── uploads/                # Uploaded images
```

## 🔧 How It Works

### Database Schema

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String
  isAdmin   Boolean  @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Product {
  id          String   @id @default(cuid())
  name        String
  description String
  price       Float
  color       String
  image       String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

### Authentication Flow

1. **Login**: User memasukkan email & password
2. **Verification**: Server memverifikasi dengan bcrypt
3. **JWT Token**: Server generate JWT token jika valid
4. **Cookie Storage**: Token disimpan sebagai httpOnly cookie
5. **Route Protection**: API routes memverifikasi token untuk akses admin

### API Routes

- `GET /api/products` - Mengambil semua produk (public)
- `POST /api/products` - Menambah produk baru (admin only)
- `POST /api/auth/login` - Login endpoint
- `POST /api/upload` - Upload gambar produk (admin only)

### File Upload Process

1. Admin memilih file gambar
2. File diupload ke `/api/upload`
3. Server menyimpan file ke `public/uploads/`
4. Return path relatif untuk disimpan di database
5. Gambar ditampilkan di landing page

## 🎯 Usage

### Sebagai Visitor

1. Kunjungi [http://localhost:3000](http://localhost:3000)
2. Lihat produk-produk yang tersedia
3. Toggle antara light/dark mode
4. Explore halaman dengan smooth scrolling

### Sebagai Admin

1. Login di [http://localhost:3000/login](http://localhost:3000/login)
   - Email: `admin@essence.com`
   - Password: `admin123`
2. Akses admin panel di [http://localhost:3000/admin](http://localhost:3000/admin)
3. Tambah, edit, atau hapus produk
4. Upload gambar untuk setiap produk

## 🐛 Troubleshooting

### Database Issues

```bash
# Reset database
npx prisma db push --force-reset
npx prisma generate

# Recreate admin user
node scripts/create-admin.js
```

### Authentication Issues

- Pastikan JWT_SECRET ada di `.env`
- Clear browser cookies
- Check server console untuk error logs

### File Upload Issues

- Pastikan folder `public/uploads` ada
- Check file permissions
- Verify file type (hanya images yang diterima)

## 📦 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Database
npx prisma studio    # Open database GUI
npx prisma generate  # Generate Prisma client
npx prisma db push   # Push schema to database
```

## 🚀 Deployment

### Deploy to Vercel

1. Push code ke GitHub repository
2. Connect repository di [Vercel](https://vercel.com)
3. Set environment variables di Vercel:
   ```
   DATABASE_URL
   JWT_SECRET
   NEXTAUTH_SECRET
   ```
4. Deploy!

### Database for Production

Untuk production, pertimbangkan menggunakan:
- PostgreSQL (Supabase, Neon)
- MySQL (PlanetScale)
- MongoDB (Atlas)

Update `DATABASE_URL` di environment variables.

## 🤝 Contributing

1. Fork the project
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🔗 Links

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://prisma.io/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Vercel Deployment](https://vercel.com)
