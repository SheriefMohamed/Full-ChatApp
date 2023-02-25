import React from 'react'
import { BrowserRouter as Router, Route , Routes } from "react-router-dom";
import Regist from './pages/Regist';
import Chat from './pages/Chat';
import Login from './pages/Login';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Regist />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/" element={<Chat />}></Route>
      </Routes>
    </Router>
  )
}

export default App
