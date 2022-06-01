import React, { useContext, useEffect, useState } from 'react'
import { getContract } from '../../helpers/contract'
import contracts from '../../contracts/contracts.json'
import {
  SwitchToPolygonAlert,
  Filler,
  MATIC_CHAIN_ID,
  errorNotification,
  notifyUser,
  copyToClipboard,
  NumberFormat,
  RPC_URL,
} from '../../helpers/utils'
import { ConnectContext } from '../../state/ConnectContext'
import { ThemeContext } from '../../state/ThemeContext'
import './home.scss'
import { ethers } from 'ethers'
import Tooltip from 'react-bootstrap/esm/Tooltip'
import OverlayTrigger from 'react-bootstrap/esm/OverlayTrigger'

const provider = new ethers.providers.JsonRpcProvider(RPC_URL)

const Home: React.FC = (): JSX.Element => {
  const { isDarkMode } = useContext(ThemeContext)
  const { library, account } = useContext(ConnectContext)
  const [networkWarning, setNetworkWarning] = useState<boolean>(true)
  const [currentChainId, setCurrentChainId] = useState<number>(0)

  const [nftContractAddress, setNftContractAddress] = useState<string>('')
  const [mintPrice, setMintPrice] = useState<string>('0')
  const [nftsLeft, setNftsLeft] = useState<string>('0')
  const nftsTotal = '256'

  useEffect(() => {
    const main = async () => {
      try {
        // @ts-ignore
        const { chainId: chain_id } = await new ethers.providers.Web3Provider(
          window.ethereum,
        ).getNetwork()

        setCurrentChainId(chain_id)

        setNftContractAddress(contracts.contracts.MintrNFT.address)

        const nftContract = new ethers.Contract(
          contracts.contracts.MintrNFT.address,
          contracts.contracts.MintrNFT.abi,
          provider,
        )

        const _mintPrice = await nftContract.price()
        setMintPrice(ethers.utils.formatEther(_mintPrice.toString()))

        const _totalSupply = await nftContract.totalSupply()
        const totalSupply = ethers.utils.formatUnits(
          _totalSupply.toString(),
          '0',
        )

        const _nftsLeft = parseFloat(nftsTotal) - parseFloat(totalSupply)
        setNftsLeft(_nftsLeft.toString())
      } catch (error) {
        console.error(error)
      }
    }

    main()
  }, [account])

  const mint = async () => {
    try {
      const mintPriceValue = ethers.utils.parseEther(mintPrice.toString())

      const nftContract = await getContract(
        library,
        account,
        contracts.contracts.MintrNFT.address,
        contracts.contracts.MintrNFT.abi,
      )

      const tx = await nftContract.mint([account], { value: mintPriceValue })

      notifyUser(tx)
    } catch (error) {
      console.error(error)
      // @ts-ignore
      if (error.code === 4001) {
        errorNotification('User rejected transaction signature.')
      } else {
        errorNotification('Transaction failed.')
      }
    }
  }

  return (
    <div className={`${isDarkMode ? 'home home-dark-mode' : 'home'}`}>
      <Filler />
      <SwitchToPolygonAlert
        currentChainId={currentChainId}
        requiredChainId={MATIC_CHAIN_ID}
        alertCondition={networkWarning}
        alertConditionHandler={() => setNetworkWarning(false)}
        isDarkMode={isDarkMode}
      />

      <h1 className="home-title bold text-center mb-3 mt-4 p-2">
        NFT Mintr Collection
      </h1>

      <p className="home-subtitle bold text-center mb-5 p-2">
        A sample collection of 256 demo NFTs on the{' '}
        <a
          href={`https://polygonscan.com/address/${contracts.contracts.MintrNFT.address}`}
          target="_blank"
          rel="noopener noreferrer"
          className="link"
          style={{
            color: '#8F5AE8',
          }}
        >
          Polygon mainnet.
        </a>{' '}
        Minting is open NOW for everyone!
      </p>

      <span className="mint-group mb-4">
        <button
          className="btn btn-primary mint-btn mr-4"
          type="button"
          onClick={mint}
        >
          Mint
        </button>
        <span className="home-subtitle bold text-center p-2">
          Mint Price:{' '}
          <NumberFormat value={parseFloat(mintPrice)} decimalScale={0} /> MATIC
        </span>
      </span>

      <h4 className="home-subtitle bold text-center mb-5 p-2">
        Mintr NFTs Left to Mint:{' '}
        <NumberFormat value={parseFloat(nftsLeft)} decimalScale={0} /> /{' '}
        <NumberFormat value={parseFloat(nftsTotal)} decimalScale={0} />
      </h4>

      <p className="home-subtitle bold text-center mb-5 p-2">
        Contract Address:{' '}
        <OverlayTrigger
          key="bottom"
          placement="bottom"
          // @ts-ignore
          className="header-addresss mr-3"
          overlay={
            <Tooltip
              id="tooltip-bottom"
              style={{
                fontWeight: 'bold',
              }}
            >
              Click to Copy
            </Tooltip>
          }
        >
          <a
            href="/"
            onClick={(e) => copyToClipboard(e, nftContractAddress)}
            className="header-address mr-3 contract-address"
            style={{
              color: '#8F5AE8',
              marginTop: '30px',
              textDecoration: 'underline',
            }}
          >
            <span
              style={{
                textDecoration: 'underline',
              }}
            >
              {nftContractAddress}
            </span>
          </a>
        </OverlayTrigger>
      </p>

      <Filler />
      <Filler />
      <Filler />
      <Filler />
    </div>
  )
}

export default Home
