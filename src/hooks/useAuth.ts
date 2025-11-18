"use client"

import { useAuthContext } from "@/context/AuthContext"

export const useAuth = () => {
  const { user, loading, login, logout } = useAuthContext()
  return { user, loading, login, logout }
}
