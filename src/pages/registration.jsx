import React, { useState } from "react";

function Registration(){

    const [email, setEmail] = useState("EMAIL ADDRESS");
    const [username, setUsername] = useState("USERNAME");
    const [password, setPassword] = useState("PASSWORD");
    const [confirmPassword, setConfirmPassword] = useState("CONFIRM PASSWORD");
    

    return (
        <div>
          <div>
            <form>
              <div className="m-2">
                <input type="email" id="reg-email-address" className="form-input bg-gray-100 text-left " 
                  value={email} 
                  onChange={(e)=> {setEmail(e.target.value)}}
                />
              </div> 

              <div className="m-2">
                <input type="text" id="reg-username" className="form-input bg-gray-100 text-left "
                  value={username}
                  onChange={(e)=> setUsername(e.target.value)}
                />
              </div>

              <div className="m-2">
                <input type="password" id="reg-password" className="form-input bg-gray-100 text-left "
                  value={password}
                  onChange={(e)=> setPassword(e.target.value)}/>
              </div>

              <div className="m-2">  
                <input type="password" id="reg-confirm-password" className="form-input bg-gray-100 text-left "
                  value={confirmPassword}
                  onChange={(e)=> setConfirmPassword(e.target.value)}
                />
              </div>

              <span>
                  <input type="submit" value="Create Account"/>
              </span>
            </form>
          </div> 
        </div>
    )
}

export default Registration;