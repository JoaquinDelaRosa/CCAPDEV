import React, { useState } from "react";

function Registration(){

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    

    return (
        <div>
          <div>
            <form>

              <div>
                <input type="email" id="reg-email-address" 
                  value={email} 
                  onChange={(e)=> setEmail(e.target.value)}
                />
              </div> 

              <div>
                <input type="text" id="reg-username"
                  value={username}
                  onChange={(e)=> setUsername(e.target.value)}
                />
              </div>

              <div>
                <input type="password" id="reg-password"
                  value={password}
                  onChange={(e)=> setPassword(e.target.value)}/>
              </div>

              <div>  
                <input type="password" id="reg-confirm-password"
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