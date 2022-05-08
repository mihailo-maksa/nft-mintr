import React, { useState } from 'react'

const ThemeContext = React.createContext({
  isDarkMode: false,
  switchMode: () => {},
})

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(
    JSON.parse(localStorage.getItem('Mode')),
  )

  const switchMode = () => {
    if (JSON.parse(localStorage.getItem('Mode')) === false) {
      setIsDarkMode(true)
      localStorage.setItem('Mode', JSON.stringify(true))
    } else {
      setIsDarkMode(false)
      localStorage.setItem('Mode', JSON.stringify(false))
    }
  }

  return (
    <ThemeContext.Provider
      value={{
        isDarkMode,
        switchMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}
