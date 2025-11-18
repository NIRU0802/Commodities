// src/app/api/auth/login/route.ts
import { NextResponse } from 'next/server'

const users = [
  { id: 1, email: 'manager@slooze.xyz', password: 'password', role: 'Manager' },
  { id: 2, email: 'store@slooze.xyz', password: 'password', role: 'StoreKeeper' }
]

export async function POST(req: Request) {
  const body = await req.json()
  const { email, password } = body || {}
  const u = users.find(x => x.email === email && x.password === password)
  if (!u) return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 })
  // Demo token (do NOT use in prod)
  const token = Buffer.from(JSON.stringify({ id: u.id, role: u.role })).toString('base64')
  return NextResponse.json({ token, role: u.role, user: { id: u.id, email: u.email } })
}
