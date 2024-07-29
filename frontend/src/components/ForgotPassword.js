import React, { useState } from 'react'

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const UserForgotPassword = async () => {
        const response = await fetch(`http://localhost:5000/api/v1/password/forgot`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({email}) , 
          });
        const data = await response.json()
        console.log(data);
      }
    const forgotPasswordSubmit = (e) => {
        e.preventDefault();
        // const myForm = new FormData();
        // myForm.set("email", email);
        UserForgotPassword();
      }

    return (
        <form  onSubmit={forgotPasswordSubmit} action="">
            <div>
                <input type="email" placeholder="Email" required name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <button type='submit'> Submit </button>
        </form>
    )
}

export default ForgotPassword
