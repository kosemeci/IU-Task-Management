import { useState } from 'react'
import './App.css'
import Header from './component/Header'
import UserPage from './component/User'
import HomePage from './component/Home'
import TaskPage from './component/Task'
import LoginPage from './component/Login'
import Notification from './component/Notification'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {

  return (

    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path='/tasks' element={<TaskPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/notification" element={<Notification />} />
      </Routes>
    </Router>

  )
}

export default App
