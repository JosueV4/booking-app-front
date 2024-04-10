import './App.css'
import { Outlet } from 'react-router-dom'
import NavBar from './components/NavBar'
import { Container, Modal } from 'react-bootstrap'
import LoadingScreen from './components/LoadingScreen'
import { useSelector } from 'react-redux'
import { useState } from 'react'

function App() {

  const isLoading = useSelector(state => state.app.isLoading);

  return (
    <>
      <div className="educational-purposes">
        Frontend made by academlo instructors for educational purposes
      </div>
      <NavBar />
      <Container className='py-5'>
        <Outlet />
      </Container>
      { isLoading && <LoadingScreen /> }
    </>
  )
}

export default App
