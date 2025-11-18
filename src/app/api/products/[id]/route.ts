import { NextResponse } from "next/server";
import { getProducts, saveProducts } from "@/lib/products";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const updates = await req.json();
  const products = await getProducts();

  const updatedProducts = products.map((p) =>
    p.id === id ? { ...p, ...updates } : p
  );

  await saveProducts(updatedProducts);

  return NextResponse.json({ status: "updated" });
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const products = await getProducts();
  const filteredProducts = products.filter((p) => p.id !== id);

  await saveProducts(filteredProducts);

  return NextResponse.json({ status: "deleted" });
}
