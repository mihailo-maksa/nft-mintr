import React from 'react'
import './App.css'
import Vaults from './components/Vaults'
import Header from './components/Header'
import { Route, Routes } from 'react-router-dom'
import { ConnectProvider } from './state/ConnectContext'
import { ThemeProvider } from './state/ThemeContext'
import { Web3ReactProvider } from '@web3-react/core'
import { ethers } from 'ethers'

export const getLibrary = (): ethers.providers.Web3Provider => {
  return new ethers.providers.Web3Provider(window.ethereum)
}

const App: React.FC = () => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ConnectProvider>
        <ThemeProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Vaults />} />
          </Routes>
        </ThemeProvider>
      </ConnectProvider>
    </Web3ReactProvider>
  )
}

export default App
