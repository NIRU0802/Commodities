"use client"

import { useEffect, useState } from "react"
import Header from "@/components/Header"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

export default function DashboardPage() {
  const [products, setProducts] = useState<any[]>([])
  const [movements, setMovements] = useState<any[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const prodRes = await fetch("/api/products")
      const prodData = await prodRes.json()
      setProducts(prodData)

      const moveRes = await fetch("/api/movements")
      const moveData = await moveRes.json()
      setMovements(moveData)
    }

    // Initial load
    fetchData()

    // Auto-refresh every 5 seconds
    const interval = setInterval(fetchData, 5000)
    return () => clearInterval(interval)
  }, [])

  const lowStockCount = products.filter(p => p.quantity < 10).length
  const stockData = products.map(p => ({ name: p.name, qty: p.quantity }))
  const pieData = products.map(p => ({ name: p.name, value: p.quantity }))
  const COLORS = ["#3b82f6", "#f97316", "#10b981", "#ef4444", "#8b5cf6"]

  return (
    <div className="p-6">
      <Header />

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <div className="p-4 bg-white shadow rounded">
          <p className="text-gray-900">Total Products</p>
          <p className="text-2xl text-black font-bold">{products.length}</p>
        </div>
        <div className="p-4 bg-white shadow rounded">
          <p className="text-gray-900">Low Stock Items</p>
          <p className="text-2xl text-black font-bold">{lowStockCount}</p>
        </div>
        <div className="p-4 bg-white shadow rounded">
          <p className="text-gray-900">Total Movements</p>
          <p className="text-2xl text-black font-bold">{movements.length}</p>
        </div>
        <div className="p-4 bg-white shadow rounded">
          <p className="text-gray-900">Alerts</p>
          <p className="text-2xl text-black font-bold">
            {lowStockCount > 0 ? "⚠️" : "✅"}
          </p>
        </div>
      </div>

      {/* GRAPHS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Stock Bar Chart */}
        <div className="p-4 bg-white shadow rounded">
          <p className="font-semibold text-black mb-2">Stock Bar Chart</p>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={stockData}>
              <XAxis
                dataKey="name"
                tick={({ x, y, payload }) => {
                  const product = stockData.find(p => p.name === payload.value)
                  const color = product && product.qty < 15 ? "#ef4444" : "#000"
                  return (
                    <text
                      x={x}
                      y={y + 10}
                      textAnchor="end"
                      fill={color}
                      fontSize={12}
                      transform={`rotate(-35, ${x}, ${y + 10})`}
                    >
                      {payload.value}
                    </text>
                  )
                }}
              />
              <YAxis />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const product = payload[0].payload
                    const color = product.qty < 15 ? "#ef4444" : "#000"
                    return (
                      <div className="bg-white p-2 border rounded shadow">
                        <p style={{ color, fontWeight: "bold" }}>{product.name}</p>
                        <p style={{ color, fontWeight: "bold" }}>Qty: {product.qty}</p>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Bar dataKey="qty">
                {stockData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.qty < 15 ? "#ef4444" : "#3b82f6"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart + Low Stock List */}
        <div className="p-4 bg-white shadow rounded flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <p className="font-semibold text-black mb-2">Inventory Distribution</p>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#3b82f6"
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Low Stock List */}
          <div className="flex-1">
            <p className="font-semibold text-black mb-2">Low Stock Items</p>
            {products.filter(p => p.quantity < 15).length === 0 ? (
              <p className="text-green-600 font-bold">All stocks are healthy ✅</p>
            ) : (
              <ul className="list-disc ml-5 text-red-600 font-bold">
                {products
                  .filter(p => p.quantity < 15)
                  .map(p => (
                    <li key={p.id}>
                      {p.name} - Qty: {p.quantity}
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Recent Movements Table */}
      <div className="mt-6 bg-white shadow rounded p-4">
        <p className="font-semibold text-black mb-4">Recent Movements</p>
        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead>
              <tr>
                <th className="border text-black px-4 py-2">Product</th>
                <th className="border text-black px-4 py-2">Action</th>
                <th className="border text-black px-4 py-2">Qty</th>
                <th className="border text-black px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {movements.map(m => (
                <tr key={m.id}>
                  <td className="border px-4 py-2">{m.product}</td>
                  <td className="border px-4 py-2">{m.action}</td>
                  <td className="border px-4 py-2">{m.quantity}</td>
                  <td className="border px-4 py-2">{m.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
