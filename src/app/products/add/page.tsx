"use client";

import { useState } from "react";

export default function AddProductPage() {
  const [form, setForm] = useState({
    id: "",
    name: "",
    price: "",
    quantity: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/products/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setMessage(data.message);
  };

  return (
    <div className="p-6 max-w-xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Add New Product</h1>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 shadow rounded-lg">

        <input
          name="id"
          placeholder="Product ID (e.g. p16)"
          className="border p-2 w-full rounded"
          value={form.id}
          onChange={handleChange}
          required
        />

        <input
          name="name"
          placeholder="Product Name"
          className="border p-2 w-full rounded"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="price"
          placeholder="Price"
          type="number"
          className="border p-2 w-full rounded"
          value={form.price}
          onChange={handleChange}
          required
        />

        <input
          name="quantity"
          placeholder="Quantity"
          type="number"
          className="border p-2 w-full rounded"
          value={form.quantity}
          onChange={handleChange}
          required
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Product
        </button>
      </form>

      {message && <p className="text-green-600 font-semibold">{message}</p>}
    </div>
  );
}
