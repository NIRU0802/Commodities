import products from "@/data/products.json";

export default function ProductPage({ params }: { params: { id: string } }) {
  // match product like p1, p2, p3...
  const product = products.find((item: any) => item.id === params.id);

  if (!product) {
    return (
      <div className="p-6 text-red-600 font-semibold">
        Product not found ❌
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold">{product.name}</h1>

      <div className="grid grid-cols-1 gap-4 text-lg">
        <p>
          <span className="font-semibold">ID:</span> {product.id}
        </p>

        <p>
          <span className="font-semibold">Price:</span> ₹{product.price} /kg
        </p>

        <p>
          <span className="font-semibold">Available Quantity:</span>{" "}
          {product.quantity} kg
        </p>
      </div>

      <div className="pt-4">
        <a
          href="/products"
          className="text-blue-600 underline hover:text-blue-800"
        >
          ← Back to Products
        </a>
      </div>
    </div>
  );
}
