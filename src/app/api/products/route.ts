import { NextResponse } from "next/server"
import { getProducts, saveProducts } from "@/lib/products"

export async function GET() {
  return NextResponse.json(getProducts())
}

export async function POST(req: Request) {
  const body = await req.json()
  const products = getProducts()

  const newProduct = {
    id: "p" + (products.length + 1),
    ...body
  }

  products.push(newProduct)
  saveProducts(products)

  return NextResponse.json(newProduct, { status: 201 })
}
