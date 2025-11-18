"use client"

import { useAuth } from "@/hooks/useAuth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

interface Props {
  allowedRoles: ("manager" | "store-keeper")[] // multiple allowed roles
  children: React.ReactNode
}

export default function RoleGuard({ allowedRoles, children }: Props) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (loading) return // wait until auth info is ready

    // Not logged in → redirect to login
    if (!user) {
      router.replace("/login")
      return
    }

    // Logged in but role not allowed → redirect to unauthorized
    if (user && !allowedRoles.includes(user.role)) {
      router.replace("/unauthorized")
    }
  }, [user, loading, allowedRoles, router])

  // Show loading until auth is ready
  if (loading || !user) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-700 dark:text-gray-200">
        Loading...
      </div>
    )
  }

  return <>{children}</>
}
