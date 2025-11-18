import { NextRequest, NextResponse } from "next/server";
import { getProducts, saveProducts } from "@/lib/products";
import type { Product } from "@/types/product";

export async function PUT(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const id = context.params.id;

  const updates = await request.json();
  const products: Product[] = await getProducts();

  const updatedProducts = products.map((p) =>
    p.id === id ? { ...p, ...updates } : p
  );

  await saveProducts(updatedProducts);

  return NextResponse.json({ status: "updated" });
}

export async function DELETE(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const id = context.params.id;

  const products: Product[] = await getProducts();
  const filteredProducts = products.filter((p) => p.id !== id);

  await saveProducts(filteredProducts);

  return NextResponse.json({ status: "deleted" });
}
