import React, { useState } from "react";

function Registration(){

    const defaultEmail = "EMAIL ADDRESS";
    const defaultUserName = "ENTER USERNAME";
    const defaultPassword = "ENTER PASSWORD";
    const defaultConfirmPassword = "CONFIRM PASSWORD";

    const [registration, setRegistration] = useState({
      "email" : defaultEmail,
      "username" : defaultUserName, 
      "password" : defaultPassword,
      "confirmPassword" : defaultConfirmPassword
    })

    const inputHandler = (name, value) => {
      setRegistration( values => ({...values, [name] : value}))
    }

    const [passwordInputType, setPasswordInputType] = useState("text");
    const [confirmInputType, setConfirmInputType] = useState("text");
    

    return (
        <div>
          <div>
            <form>
              <div className="m-2">
                <span>
                  <input type="email" id="reg-email-address" className="form-input bg-gray-100 text-left font-sans font-light w-1/4" 
                    value={registration["email"]} 
                    onChange={(e)=> {
                      inputHandler("email", e.target.value);
                    }}
                    onFocus={(e) => {
                      if(e.target.value === defaultEmail)
                        inputHandler("email", "");
                    }}
                    onBlur={(e)=>{
                      if(registration["email"] === "")
                        inputHandler("email", defaultEmail)
                    }}
                  />
                </span>
              </div> 

              <div className="m-2">
                <input type="text" id="reg-username" className="form-input bg-gray-100 text-left font-sans font-light w-1/4"
                  value={registration["username"]}
                  onChange={(e) => 
                    inputHandler("username", e.target.value)
                  }
                  onFocus={(e) =>{
                    if(e.target.value === defaultUserName)
                      inputHandler("username", "");
                  }}
                  onBlur={(e)=>{
                    if(registration["username"] === "")
                      inputHandler("username", defaultUserName);
                  }}
                />
              </div>

              <div className="m-2">
                <input type={passwordInputType} id="reg-password" className="form-input bg-gray-100 text-left font-sans font-light w-1/4"
                  value={registration["password"]}
                  onChange={(e)=> { 
                    inputHandler("password", e.target.value)
                  }}
                  onFocus = {(e) => {
                    if(e.target.value === defaultPassword){
                      setPasswordInputType("password");
                      inputHandler("password", "");
                    }
                  }}
                  onBlur={(e)=>{
                    if(registration["password"] === ""){
                      inputHandler("password", defaultPassword);
                      setPasswordInputType("text");
                    }
                  }}
                  />
              </div>

              <div className="m-2">  
                <input type={confirmInputType} id="reg-confirm-password" className="form-input bg-gray-100 text-left font-sans font-light w-1/4"
                  value={registration["confirmPassword"]}
                  onChange={(e)=> 
                    inputHandler("confirmPassword", e.target.value)
                  }
                  onFocus = {(e) => {
                    if(e.target.value === defaultConfirmPassword){
                      setConfirmInputType("password");
                      inputHandler("confirmPassword", "");
                    }
                  }}
                  onBlur={(e)=>{
                    if(registration["confirmPassword"] === ""){
                      inputHandler("confirmPassword", defaultConfirmPassword);
                      setConfirmInputType("text");
                    }
                  }}
                />
              </div>

              <span>
                  <input type="submit" value="Create Account" 
                  className="border-2 rounded-full w-1/6 bg-blue-200 text-white hover:bg-blue-500 hover:text-white"
                  
                  onFocus = {(e) => {
                    // Input validation will go here later. For now just a placeholder will do
                    
                  }}
                  />
              </span>
            </form>
          </div> 
        </div>
    )
}

export default Registration;