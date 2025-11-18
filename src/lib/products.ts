import fs from "fs"
import path from "path"

const filePath = path.join(process.cwd(), "src/data/products.json")

export function getProducts() {
  const data = fs.readFileSync(filePath, "utf-8")
  return JSON.parse(data)
}

export function saveProducts(data: any) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
}
