import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Register = ({setUser}) => {
    const [first_name, setFirst_name] = useState("")
    const [last_name, setLast_name] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")

    const navigate = useNavigate()
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/v1/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Set content type to application/json
            },
            body: JSON.stringify({ first_name, last_name, email, password }), // Convert object to JSON string
        });

        const data = await response.json()
        console.log(data);
        if (data.success == true) {
            setUser(data.user)
            localStorage.setItem("token" , data.token )
            navigate("/")
        }

        if (data.success == false) {
            setUser(null)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit} >
              <div className="">
                
                  <input type="text" placeholder='first name' value={first_name} onChange={(e) => setFirst_name(e.target.value)} />
                  </div>
              <div className="">
                
                  <input type="text" placeholder='last name' value={last_name} onChange={(e) => setLast_name(e.target.value)} />
                  </div>
              <div className=""> 
                  <input type="email" placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
              <div className="">
                
                  <input type="password" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                  </div>
                <button type='submit' > Register </button>
            </form>

      


        </div>
    )
}

export default Register
