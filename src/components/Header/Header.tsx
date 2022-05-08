import React, { useContext } from 'react'
import { makeShortAddress } from '../../helpers/utils'
import { ConnectContext } from '../../state/ConnectContext'

const Header: React.FC = (): JSX.Element => {
  const {
    connect,
    disconnect,
    isConnected,
    account,
    library,
    chainId,
  } = useContext(ConnectContext)

  console.log({
    connect,
    disconnect,
    isConnected,
    account,
    library,
    chainId,
  })

  return (
    <div className="app-header">
      <div className="app-logo">
        <img src={require('../../assets/moonfarm.svg')} alt="Logo" />
        <h1 className="app-title">MoonFarm</h1>
      </div>

      <div className="app-nav">
        <div className="app-mode-icon"></div>
        <div className="app-account">
          {isConnected ? (
            <div className="user-address">
              {/* @ts-ignore */}
              <span>{makeShortAddress(account)}</span>
              <span onClick={disconnect}>Disconnect</span>
            </div>
          ) : (
            <button type="button" onClick={connect}>
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header
