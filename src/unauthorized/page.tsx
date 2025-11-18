"use client"

import { useRouter } from "next/navigation"
import Header from "@/components/Header"

export default function UnauthorizedPage() {
  const router = useRouter()

  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 dark:bg-gray-900">
        <h1 className="text-5xl font-bold text-red-600 dark:text-red-400 mb-4">
          403
        </h1>
        <p className="text-xl text-gray-700 dark:text-gray-300 mb-6">
          Unauthorized Access
        </p>
        <button
          onClick={() => router.back()}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Go Back
        </button>
      </div>
    </>
  )
}
