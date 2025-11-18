// src/lib/auth.ts
export type Role = 'Manager' | 'StoreKeeper' | null

export function getClientRole(): Role {
  if (typeof window === 'undefined') return null
  const r = localStorage.getItem('role') as Role | null
  return r || null
}

export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false
  return !!localStorage.getItem('token')
}
