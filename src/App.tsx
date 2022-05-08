import React from 'react'
import './App.css'
import Vaults from './components/Vaults'
import Header from './components/Header'
import { Route, Routes } from 'react-router-dom'
import { ConnectProvider } from './state/ConnectContext'
import { ThemeProvider } from './state/ThemeContext'

const App: React.FC = () => {
  return (
    <ConnectProvider>
      <ThemeProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Vaults />} />
        </Routes>
      </ThemeProvider>
    </ConnectProvider>
  )
}

export default App
