'use client'
import {useEffect, useState, createContext, useContext} from 'react'

type Theme = 'light'|'dark'
const ThemeContext = createContext({theme: 'light' as Theme, toggle: ()=>{}})

export function ThemeProvider({children}:{children:React.ReactNode}) {
  const [theme, setTheme] = useState<Theme>('light')
  useEffect(()=>{
    const stored = localStorage.getItem('theme') as Theme | null
    if(stored) setTheme(stored)
    else {
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      setTheme(prefersDark ? 'dark' : 'light')
    }
  },[])
  useEffect(()=>{
    const root = document.documentElement
    if(theme === 'dark') root.classList.add('dark')
    else root.classList.remove('dark')
    localStorage.setItem('theme', theme)
  },[theme])
  return <ThemeContext.Provider value={{theme, toggle: ()=>setTheme(prev=> prev==='dark' ? 'light' : 'dark')}}>{children}</ThemeContext.Provider>
}

export const useTheme = ()=> useContext(ThemeContext)
