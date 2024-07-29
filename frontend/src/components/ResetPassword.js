import React, { useState } from 'react'
import { useParams } from 'react-router-dom';

const ResetPassword = (setUser) => {
    const { token } = useParams();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const UserResetPassword = async (ttokken  ) => {
        const response = await fetch(`http://localhost:5000/api/v1/password/reset/${ttokken}`, {
          method: "PUT",
            body: JSON.stringify({password , confirmPassword} )  , 
          });
        const data = await response.json()
          console.log(data);
        if (data.success== true) {
          console.log("data", data);
          setUser(data.user)
        }
      }

    const resetPasswordSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        // myForm.set("password", password);
        // myForm.set("confirmPassword", confirmPassword);
        UserResetPassword(token);
      }
  return (
    <div>
           <form className="resetPasswordForm" onSubmit={resetPasswordSubmit}  >
                <div>
                  <input  type="password"  placeholder="New Password"  required  value={password}  onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="loginPassword">
                  <input  type="password"  placeholder="Confirm Password"  required  value={confirmPassword}  onChange={(e) => setConfirmPassword(e.target.value)}  />
                </div>
                <input type="submit"  value="Update"  className="resetPasswordBtn" />
              </form>
    </div>
  )
}

export default ResetPassword
