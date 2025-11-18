import { NextResponse } from "next/server";
import { getProducts, saveProducts } from "@/lib/products";
import type { Product } from "@/types/product";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const updates = await req.json();
  const products: Product[] = getProducts(); // NO await

  const updatedProducts = products.map((p: Product) =>
    p.id === id ? { ...p, ...updates } : p
  );

  saveProducts(updatedProducts);

  return NextResponse.json({ status: "updated" });
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const products: Product[] = getProducts(); // NO await
  const filteredProducts = products.filter((p: Product) => p.id !== id);

  saveProducts(filteredProducts);

  return NextResponse.json({ status: "deleted" });
}
