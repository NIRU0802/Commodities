"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useAuth } from "@/hooks/useAuth"

export default function HomePage() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Redirect users based on role if logged in
    if (user?.role === "manager") router.replace("/dashboard")
    else if (user?.role === "store-keeper") router.replace("/products")
    // If not logged in → stay on home page (or redirect to /login)
  }, [user, router])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4">Welcome to Slooze Commodities Management</h1>
      <p className="text-gray-600 mb-6 text-center">
        Manage products, track inventory, and stay on top of operations.
      </p>

      <div className="flex gap-4">
        <a
          href="/login"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </a>
      </div>
    </div>
  )
}
