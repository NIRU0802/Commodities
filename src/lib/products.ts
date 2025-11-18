import fs from "fs";
import path from "path";
import type { Product } from "@/types/product";

const filePath = path.join(process.cwd(), "src/data/products.json");

export function getProducts(): Product[] {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data) as Product[];
}

export function saveProducts(products: Product[]): void {
  fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
}
