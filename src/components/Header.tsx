"use client"

import { useAuth } from "@/hooks/useAuth"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Header() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [theme, setTheme] = useState<"light" | "dark">("light")

  // Load theme from localStorage
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as "light" | "dark"
    if (storedTheme) setTheme(storedTheme)
    else localStorage.setItem("theme", "light")
    document.documentElement.classList.toggle("dark", storedTheme === "dark")
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    document.documentElement.classList.toggle("dark", newTheme === "dark")
  }

  const handleLogout = () => {
    logout()
    router.replace("/login")
  }

  return (
    <header className="bg-white dark:bg-gray-800 shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">
        Slooze Commodities
      </h1>

      {user && (
        <div className="flex items-center gap-4">
          {/* Role-based Menu */}
          <nav className="flex gap-3">
            {user.role === "manager" && (
              <button
                onClick={() => router.push("/dashboard")}
                className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                Dashboard
              </button>
            )}
            <button
              onClick={() => router.push("/products")}
              className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              Products
            </button>
          </nav>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="bg-gray-200 dark:bg-gray-700 p-2 rounded"
            title="Toggle Dark/Light Mode"
          >
            {theme === "light" ? "🌞" : "🌙"}
          </button>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  )
}
