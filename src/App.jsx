import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'

import Homepage from './pages/Home'
import Signin from './pages/Signin'
import Login from './pages/Login'
import Info from './pages/Info'
import Donate from './pages/Donate'
import Request from './pages/Request'
import User from './pages/User'

import MyNav from './components/Navbar'
import Footer from './components/Footer'

function App() {
  const [user, setUser] = useState(null)

  return (
    <div>
      <MyNav user = {user}/> 
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/login' element={<Login />} />
        <Route path='/info' element={<Info />} />
        <Route path='/donate' element={<Donate />} />
        <Route path='/request' element={<Request />} />
        <Route path='/user' element={<User />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
