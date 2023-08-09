/* eslint-disable react-refresh/only-export-components */
import { ReactNode, createContext, useContext, useState } from "react"

const ThemeContext = createContext(false)
const ThemeUpdateContext = createContext(() => {})

export function useTheme() {
  return useContext(ThemeContext)
}
export function useThemeUpdate() {
  return useContext(ThemeUpdateContext)
}

export function ThemeProvider({ children } : { children: ReactNode }) {
  const [darkTheme, setDarkTheme] = useState<boolean>(false)

  const toggleTheme = () => {
    setDarkTheme(prev => !prev)
  }

  return (
    <ThemeContext.Provider value={darkTheme}>
      <ThemeUpdateContext.Provider value={toggleTheme}>
        {children}
      </ThemeUpdateContext.Provider>
    </ThemeContext.Provider>
  )
}
