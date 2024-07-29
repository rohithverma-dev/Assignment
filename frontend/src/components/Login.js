import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const Login = ({ setUser }) => {

  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")

  const navigate = useNavigate()
  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/v1/login', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          "x-authorization"   : `Bearer ${localStorage.getItem("token")}` // Pass token in the header
      },
      body: JSON.stringify({ email, password }), // Convert form data to JSON string
  });

    const data = await response.json()
    console.log(data);
    if (data.success == true) {
      setUser(data.user)
      localStorage.setItem("token", data.token)
      navigate("/")
    }

    if (data.success == false) {
      setUser(null)
    }
  }



  return (
    <div style={{ margin: "10px" }} >
      <form onSubmit={handleLogin} >
        <div className="">
          <input type="email" placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="">
          <input type="password" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        <button type='submit' > Login </button>
      </form>
    </div>
  )
}

export default Login
