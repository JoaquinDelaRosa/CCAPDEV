import React, { useState } from "react";
import { Link } from "react-router-dom";

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
    
    const isComplete = () => {
      let isComplete = true;
      Object.values(registration).forEach((value) => {isComplete = isComplete && value!== ""})
      return isComplete;
    }

    const isValid = () => {
      // Input validation will go here later. For now just a placeholder will do
      return registration.password === registration.confirmPassword && 
      registration.email !== defaultEmail && registration.username !== defaultUserName;
    }

    const isSubmitDisabled = () => {
      return !(isValid() && isComplete());
    }


    return (
        <div className="flex justify-center items-center h-screen">
          <div className="flex max-w-fit">
            <form>
              <span className="flex justify-center items-center">
                <h2 className="m-0.5  text-center font-sans font-extrabold w-80 "> Create a new account </h2>
              </span>

              <div className="m-2">
                <span>
                  <input type="email" id="reg-email-address" className="form-input bg-gray-100 text-left font-sans font-light w-80" 
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
                    required
                  />
                </span>
              </div> 

              <div className="m-2">
                <input type="text" id="reg-username" className="form-input bg-gray-100 text-left font-sans font-light w-80"
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
                  required
                />
              </div>

              <div className="m-2">
                <input type={passwordInputType} id="reg-password" className="form-input bg-gray-100 text-left font-sans font-light w-80"
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
                  required
                  />
              </div>

              <div className="m-2">  
                <input type={confirmInputType} id="reg-confirm-password" className="form-input bg-gray-100 text-left font-sans font-light w-80"
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
                  required
                />
              </div>

              <span className="flex justify-center items-center">
                  <input type="submit" value="Create Account" disabled={isSubmitDisabled()}
                  className= {"border-2 rounded-full w-auto text-white " + 
                  (isSubmitDisabled() ? "bg-blue-200" : "bg-green-500 hover:cursor-pointer")}
                  />
              </span>
              <br/>
              <p className="flex justify-center items-center font-mono"> 
                Or if you have an account &nbsp; <Link to="../login" className="text-blue-300 hover:text-blue-600"> Log in! </Link>
              </p>
            </form>

          </div> 
        </div>
    )
}

export default Registration;