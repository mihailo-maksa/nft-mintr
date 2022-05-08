import React, { useState } from 'react'

interface Props {
  children: React.ReactNode
}

export const ThemeContext = React.createContext({
  isDarkMode: false,
  switchMode: () => {},
})

export const ThemeProvider: React.FC<Props> = ({ children }): JSX.Element => {
  const [isDarkMode, setIsDarkMode] = useState(
    // @ts-ignore
    JSON.parse(localStorage.getItem('Mode')),
  )

  const switchMode = () => {
    // @ts-ignore
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
