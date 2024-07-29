import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Register from './components/Register';
import AllUsers from './components/AllUsers';
import Login from './components/Login';
import ForgotPassword from "./components/ForgotPassword.js"
import ResetPassword from "./components/ResetPassword.js"

function App() {
  const [user, setUser] = useState(null)
  return (
    <>
      <Router>
     
        <Routes>
          <Route path="/" element={    <AllUsers user={user} setUser={setUser} /> } />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register setUser={setUser} />} />
          <Route exact path="/password/forgot" element={<ForgotPassword />} ></Route>
          <Route exact path="/password/reset/:token" element={<ResetPassword setUser={setUser} />} ></Route>
          </Routes>
      </Router>
    </>
  );
}

export default App;
