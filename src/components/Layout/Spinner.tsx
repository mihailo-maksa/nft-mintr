import React, { useContext } from 'react'
import { ThemeContext } from '../../state/ThemeContext'
import spinner from '../../assets/spinner.gif'
import './layout.scss'
import { Filler } from '../../helpers/utils'

const Spinner: React.FC = (): JSX.Element => {
  const { isDarkMode } = useContext(ThemeContext)

  return (
    <div className={`${isDarkMode ? 'dark-mode-spinner' : ''}`}>
      <Filler />
      <img src={spinner} alt="Spinner" className="spinner" />
      <div className="loading">Please wait...</div>
    </div>
  )
}

export default Spinner
