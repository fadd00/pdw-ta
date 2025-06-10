"use client"
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

interface Product {
  id: string
  name: string
  description: string
  price: number
  color: string
  image?: string
}

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false) // For Add Product form
  const [showEditForm, setShowEditForm] = useState(false) // For Edit Product form
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [uploading, setUploading] = useState(false)
  const [formData, setFormData] = useState({
    id: '', // Added for editing
    name: '',
    description: '',
    price: '',
    color: 'amber',
    image: ''
  })
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products')
      if (response.ok) {
        const data = await response.json()
        setProducts(data)
      }
      // Reset forms on fetch
      // setShowForm(false)
      // setShowEditForm(false)
      // setEditingProduct(null)
    } catch (error) {
      console.error('Failed to fetch products:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        const data = await response.json()
        setFormData(prev => ({ ...prev, image: data.imagePath }))
      } else {
        const error = await response.json()
        alert(error.error || 'Failed to upload image')
      }
    } catch (error) {
      alert('Failed to upload image')
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        setFormData({ id: '', name: '', description: '', price: '', color: 'amber', image: '' })
        setShowForm(false)
        if (fileInputRef.current) {
          fileInputRef.current.value = '' // Reset file input
        }
        fetchProducts()
        alert('Product added successfully!')
      } else {
        const data = await response.json()
        if (response.status === 401 || response.status === 403) {
          router.push('/login')
        }
        alert(data.error || 'Failed to add product')
      }
    } catch (error) {
      alert('Something went wrong')
    }
  }

  const getColorGradient = (color: string) => {
    switch (color) {
      case 'rose':
        return 'from-rose-200 to-rose-400'
      case 'blue':
        return 'from-blue-200 to-blue-400'
      default:
        return 'from-amber-200 to-amber-400'
    }
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setFormData({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      color: product.color,
      image: product.image || ''
    })
    setShowEditForm(true)
    setShowForm(false) // Hide add form if open
    if (fileInputRef.current) {
        fileInputRef.current.value = '' // Reset file input for edit form
    }
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingProduct) return

    try {
      const response = await fetch(`/api/products/${editingProduct.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        setFormData({ id: '', name: '', description: '', price: '', color: 'amber', image: '' })
        setShowEditForm(false)
        setEditingProduct(null)
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
        fetchProducts()
        alert('Product updated successfully')
      } else {
        const data = await response.json()
        if (response.status === 401 || response.status === 403) {
          router.push('/login')
        }
        alert(data.error || 'Failed to update product')
      }
    } catch (error) {
      alert('Something went wrong during update')
    }
  }

  const handleDelete = async (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await fetch(`/api/products/${productId}`, {
          method: 'DELETE'
        })

        if (response.ok) {
          fetchProducts()
          alert('Product deleted successfully')
          if (editingProduct && editingProduct.id === productId) {
            setShowEditForm(false)
            setEditingProduct(null)
          }
        } else {
          const data = await response.json()
          if (response.status === 401 || response.status === 403) {
            router.push('/login')
          }
          alert(data.error || 'Failed to delete product')
        }
      } catch (error) {
        alert('Something went wrong during deletion')
      }
    }
  }


  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex items-center justify-center">
        <div className="text-amber-900 text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-light text-amber-900">Admin Dashboard</h1>
          <div className="flex gap-4">
            <button
              onClick={() => {
                if (showEditForm) { // If edit form is open, cancel it and open add form
                  setShowEditForm(false)
                  setEditingProduct(null)
                  setFormData({ id: '', name: '', description: '', price: '', color: 'amber', image: '' })
                }
                setShowForm(!showForm) // Toggle add form
              }}
              className="bg-amber-800 text-white px-6 py-2 rounded-lg hover:bg-amber-900 transition-colors"
            >
              {showForm ? 'Cancel' : 'Add Product'}
            </button>
            <button
              onClick={() => {
                router.push('/')
              }}
              className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              View Site
            </button>
          </div>
        </div>

        {/* Add Product Form */}
        {showForm && !showEditForm && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-light text-black mb-6">Add New Product</h2>
            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
              {/* Form fields remain largely the same, ensure formData is used */}
              <div>
                <label className="block text-black text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 text-black"
                  required
                />
              </div>
              <div>
                <label className="block text-black text-sm font-medium mb-2">Price</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 text-black"
                  required
                />
              </div>
              <div>
                <label className="block text-black text-sm font-medium mb-2">Color</label>
                <select
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 text-black"
                >
                  <option value="amber">Amber</option>
                  <option value="rose">Rose</option>
                  <option value="blue">Blue</option>
                </select>
              </div>
              <div>
                <label className="block text-black text-sm font-medium mb-2">Product Image</label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 text-black file:text-black"
                  disabled={uploading}
                />
                {uploading && <p className="text-sm text-black mt-1">Uploading...</p>}
                {formData.image && (
                  <div className="mt-2">
                    <Image
                      src={formData.image}
                      alt="Preview"
                      width={100}
                      height={100}
                      className="rounded-lg object-cover"
                    />
                  </div>
                )}
              </div>
              <div className="md:col-span-2">
                <label className="block text-black text-sm font-medium mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 text-black"
                  rows={3}
                  required
                />
              </div>
              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="bg-amber-800 text-white px-8 py-3 rounded-lg hover:bg-amber-900 transition-colors"
                  disabled={uploading}
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Edit Product Form */}
        {showEditForm && editingProduct && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-light text-black mb-6">Edit Product</h2>
            <form onSubmit={handleUpdate} className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-black text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 text-black"
                  required
                />
              </div>
              <div>
                <label className="block text-black text-sm font-medium mb-2">Price</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 text-black"
                  required
                />
              </div>
              <div>
                <label className="block text-black text-sm font-medium mb-2">Color</label>
                <select
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 text-black"
                >
                  <option value="amber">Amber</option>
                  <option value="rose">Rose</option>
                  <option value="blue">Blue</option>
                </select>
              </div>
              <div>
                <label className="block text-black text-sm font-medium mb-2">Product Image</label>
                <input
                  ref={fileInputRef} // Re-use the same ref for resetting
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 text-black file:text-black"
                  disabled={uploading}
                />
                {uploading && <p className="text-sm text-black mt-1">Uploading...</p>}
                {formData.image && (
                  <div className="mt-2">
                    <p className="text-xs text-gray-500 mb-1">Current image:</p>
                    <Image
                      src={formData.image}
                      alt="Preview"
                      width={100}
                      height={100}
                      className="rounded-lg object-cover"
                    />
                  </div>
                )}
              </div>
              <div className="md:col-span-2">
                <label className="block text-black text-sm font-medium mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 text-black"
                  rows={3}
                  required
                />
              </div>
              <div className="md:col-span-2 flex gap-4">
                <button
                  type="submit"
                  className="bg-amber-800 text-white px-8 py-3 rounded-lg hover:bg-amber-900 transition-colors"
                  disabled={uploading}
                >
                  Update Product
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowEditForm(false)
                    setEditingProduct(null)
                    setFormData({ id: '', name: '', description: '', price: '', color: 'amber', image: '' })
                    if (fileInputRef.current) {
                      fileInputRef.current.value = ''
                    }
                  }}
                  className="bg-gray-300 text-black px-8 py-3 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-light text-amber-900 mb-6">Products</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="border border-gray-200 rounded-lg p-4 flex flex-col">
                <div className="text-center mb-4">
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={100}
                      height={150}
                      className="mx-auto rounded-lg object-cover h-[150px]" // Fixed height
                    />
                  ) : (
                    <div className={`w-16 h-24 bg-gradient-to-b ${getColorGradient(product.color)} rounded-t-full mx-auto mb-2 opacity-70 flex items-center justify-center`}>
                       <span className="text-xs text-white">No Image</span>
                    </div>
                  )}
                </div>
                <h3 className="text-lg font-medium text-amber-900 mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-2 flex-grow">{product.description}</p>
                <p className="text-amber-800 font-medium mb-4">${product.price}</p>
                <div className="flex gap-2 mt-auto">
                  <button
                    onClick={() => handleEdit(product)}
                    className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}