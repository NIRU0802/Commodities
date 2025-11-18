"use client"

import { useEffect, useState } from "react"
import ProductModal from "@/components/ProductModal"
import Header from "@/components/Header"

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([])
  const [modalOpen, setModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<any>(null)

  // Load products
  const loadProducts = async () => {
    const res = await fetch("/api/products")
    const data = await res.json()
    setProducts(data)
  }

  useEffect(() => {
    loadProducts()
  }, [])

  // Save / Update product
  const handleSave = async (data: any) => {
    if (editingProduct) {
      await fetch(`/api/products/${editingProduct.id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      })
    } else {
      await fetch(`/api/products`, {
        method: "POST",
        body: JSON.stringify(data),
      })
    }

    setModalOpen(false)
    setEditingProduct(null)
    loadProducts()
  }

  // Delete product
  const deleteProduct = async (id: string) => {
    await fetch(`/api/products/${id}`, { method: "DELETE" })
    loadProducts()
  }

  return (
    <div>

      {/* HEADER */}
      <Header />

      {/* PAGE HEADER */}
      <div className="flex justify-between items-center mb-6 mt-4">
        <h1 className="text-2xl font-bold p-2">Products</h1>
        <button
          onClick={() => {
            setEditingProduct(null)
            setModalOpen(true)
          }}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          + Add Product
        </button>
      </div>

      {/* PRODUCT GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="p-4 border rounded flex flex-col justify-between">
            <div className="mb-2">
              <p className="font-semibold">{product.name}</p>
              <p className="text-sm text-gray-600">
                Price: ₹{product.price} | Qty: {product.quantity}
              </p>
            </div>

            <div className="flex gap-3 mt-auto">
              <button
                onClick={() => {
                  setEditingProduct(product)
                  setModalOpen(true)
                }}
                className="px-3 py-1 bg-blue-600 text-white rounded"
              >
                Edit
              </button>
              <button
                onClick={() => deleteProduct(product.id)}
                className="px-3 py-1 bg-red-600 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {modalOpen && (
        <ProductModal
          initialData={editingProduct}
          onSave={handleSave}
          onClose={() => {
            setModalOpen(false)
            setEditingProduct(null)
          }}
        />
      )}
    </div>
  )
}
