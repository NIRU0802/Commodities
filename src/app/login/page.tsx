"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    const demoUsers = {
      "manager@slooze.com": { name: "John Manager", role: "manager", email },
      "keeper@slooze.com": { name: "Riya Keeper", role: "store-keeper", email },
    }

    const user = demoUsers[email]
    if (!user || password !== "123456") {
      alert("Invalid credentials")
      return
    }

    login(user)
    router.replace(user.role === "manager" ? "/dashboard" : "/products")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center">
          Slooze Commodities
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">
          Manage products, track inventory, and streamline operations.
        </p>

        <form className="flex flex-col gap-4" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition"
          />

          <button
            type="submit"
            className="mt-2 w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center text-gray-500 dark:text-gray-400 text-sm">
          Demo Accounts:
          <ul className="mt-1">
            <li>Manager → manager@slooze.com / 123456</li>
            <li>Store Keeper → keeper@slooze.com / 123456</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
