import { NextRequest, NextResponse } from "next/server";
import { getProducts, saveProducts } from "@/lib/products";
import type { Product } from "@/types/product";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params; // No await needed

  const updates = await req.json();
  const products: Product[] = await getProducts();

  const updatedProducts = products.map((p) =>
    p.id === id ? { ...p, ...updates } : p
  );

  await saveProducts(updatedProducts);

  return NextResponse.json({ status: "updated" });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const products: Product[] = await getProducts();
  const filteredProducts = products.filter((p) => p.id !== id);

  await saveProducts(filteredProducts);

  return NextResponse.json({ status: "deleted" });
}
