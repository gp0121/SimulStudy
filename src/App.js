
import React from "react"
import Navbar from "./Components/Navbar/Navbar"
import Home from "./pages/Home/Home"
import About from './pages/About/About'
import Quiz from "./pages/Quiz/Quiz"
import Register from './pages/Register/Register'
import Login from './pages/Login/Login'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"


function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home/>}>
          </Route>
          <Route path='/About' element={<About/>}>
          </Route>
          <Route path='/Quiz' element={<Quiz/>}>
          </Route>
          <Route path='/Register' element={<Register />}>
          </Route>
          <Route path='/Login' element={<Login />}>
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App