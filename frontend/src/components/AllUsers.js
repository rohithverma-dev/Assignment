import React from 'react'
import { Link } from 'react-router-dom';

const AllUsers = ({ user, setUser }) => {

  const handleLogout = () => {
    localStorage.setItem("token", null)
    setUser(null)
  }

  return (
    <div>
      {user && <div className="">
        <span style={{margin:"5px"}} > {user.first_name} </span>
        <span style={{margin:"5px"}} > {user.last_name} </span>
        <p> {user.email} </p>
      </div>}

      <br />
      <br />
      <br />
      <br />

      <div className="">
        <Link to="/register" >Register</Link>
      </div>
      <div className="">
        <Link to="/login" >Login</Link>
      </div>
      <div className="">
        <Link to="/password/forgot" >Forgot passord</Link>
      </div>
      <div className="">
      </div>

      <br />
      

      <button style={{margin:"20px"}} onClick={handleLogout} >logout</button>



    </div>
  )
}

export default AllUsers
