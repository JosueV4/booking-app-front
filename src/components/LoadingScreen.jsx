import React from 'react'
import { spinner } from '../assets'
import '../styles/loading-screen.css';

const LoadingScreen = () => {
  return (
    <div className='overlay'>
        <img src={spinner} alt="spinner" className='spinner' />
    </div>
  )
}

export default LoadingScreen
