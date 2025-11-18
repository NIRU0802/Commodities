"use client"

import { useState, useEffect } from "react"

interface Product {
  id?: string
  name: string
  price: number
  quantity: number
}

interface Props {
  initialData?: Product
  onSave: (product: Product) => void
  onClose: () => void
}

export default function ProductModal({ initialData, onSave, onClose }: Props) {
  const [name, setName] = useState("")
  const [price, setPrice] = useState<string>("")
  const [quantity, setQuantity] = useState<string>("")

  useEffect(() => {
    if (initialData) {
      setName(initialData.name ?? "")
      setPrice(initialData.price?.toString() ?? "")
      setQuantity(initialData.quantity?.toString() ?? "")
    } else {
      setName("")
      setPrice("")
      setQuantity("")
    }
  }, [initialData])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const finalPrice = Number(price)
    const finalQuantity = Number(quantity)

    if (!name || finalPrice < 0 || finalQuantity < 0) {
      return alert("Enter valid values")
    }

    onSave({
      id: initialData?.id,
      name,
      price: finalPrice,
      quantity: finalQuantity, // ✅ THIS FIXES EVERYTHING
    })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">

        <h2 className="text-xl font-bold mb-4">
          {initialData ? "Edit Product" : "Add Product"}
        </h2>

        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 rounded border dark:border-gray-600 bg-gray-50 dark:bg-gray-700"
            required
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="p-2 rounded border dark:border-gray-600 bg-gray-50 dark:bg-gray-700"
            required
          />

          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="p-2 rounded border dark:border-gray-600 bg-gray-50 dark:bg-gray-700"
            required
          />

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Save
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}
