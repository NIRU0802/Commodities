// src/components/NavBar.tsx
'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useTheme } from './ThemeProvider'

export default function NavBar() {
  const { theme, toggle } = useTheme()
  const [role, setRole] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') setRole(localStorage.getItem('role'))
  }, [])

  function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    window.location.href = '/login'
  }

  return (
    <nav className="flex items-center justify-between px-4 py-3 border-b bg-white dark:bg-gray-800">
      <div className="flex items-center gap-6">
        <Link href="/" className="font-bold text-lg">Slooze</Link>
        {role && <Link href="/products">Products</Link>}
        {role === 'Manager' && <Link href="/dashboard">Dashboard</Link>}
        {role && <Link href="/add-product">Add Product</Link>}
      </div>

      <div className="flex items-center gap-4">
        <button onClick={toggle} className="px-3 py-1 border rounded">
          {theme === 'dark' ? '🌙' : '☀️'}
        </button>
        {role ? <button onClick={logout} className="px-3 py-1 border rounded">Logout</button> : <Link href="/login" className="px-3 py-1 border rounded">Login</Link>}
      </div>
    </nav>
  )
}
