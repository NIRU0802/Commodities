import { NextResponse } from "next/server"
import { getProducts, saveProducts } from "@/lib/products"

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params    // ✨ FIXED

  const updates = await req.json()
  const products = getProducts()

  const updatedProducts = products.map(p =>
    p.id === id ? { ...p, ...updates } : p
  )

  saveProducts(updatedProducts)

  return NextResponse.json({ status: "updated" })
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params    // ✨ FIXED

  const products = getProducts()
  const filteredProducts = products.filter(p => p.id !== id)

  saveProducts(filteredProducts)

  return NextResponse.json({ status: "deleted" })
}
