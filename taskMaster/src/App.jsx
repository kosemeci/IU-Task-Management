import { useState } from 'react'
import './App.css'
import Header from './component/Header'
import UserPage from './component/User'
import HomePage from './component/Home'
import Notification from './component/Notification'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {

  return (

    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/notification" element={<Notification />} />
      </Routes>
    </Router>

  )
}

export default App
