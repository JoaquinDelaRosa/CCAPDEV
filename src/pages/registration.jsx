import React, { useState } from "react";
import { Link } from "react-router-dom";

function Registration(){

    const [registration, setRegistration] = useState({
      "email" : "",
      "username" : "", 
      "password" : "",
      "confirmPassword" : ""
    })

    const inputHandler = (name, value) => {
      setRegistration( values => ({...values, [name] : value}))
    }
    
    const isComplete = () => {
      let isComplete = true;
      Object.values(registration).forEach((value) => {isComplete = isComplete && value!== ""})
      return isComplete;
    }

    const isValid = () => {
      // Input validation will go here later. For now just a placeholder will do
      return registration.password === registration.confirmPassword && 
      registration.email !== "" && registration.username !== "";
    }

    const isSubmitDisabled = () => {
      return !(isValid() && isComplete());
    }


    return (
        <div className="flex justify-center items-center h-screen from-gray-900 to-bgGradient bg-gradient-to-br">
          <div className="flex max-w-fit p-8 shadow-md rounded-md bg-gray-800">
            <form>
              <span className="flex justify-center items-center text-cyan-500 select-none">
                <h2 className="m-0.5  text-center font-sans font-extrabold w-80 "> Create a new account </h2>
              </span>

              <div className="m-2">
                <span>
                  <input type="email" id="reg-email-address" className="form-input bg-gray-100 text-left font-sans font-light w-80" 
                    value={registration["email"]}
                    placeholder="ENTER EMAIL ADDRESS" 
                    onChange={(e)=> {
                      inputHandler("email", e.target.value);
                    }}
                    required
                  />
                </span>
              </div> 

              <div className="m-2">
                <input type="text" id="reg-username" className="form-input bg-gray-100 text-left font-sans font-light w-80"
                  value={registration["username"]}
                  placeholder="ENTER USERNAME"
                  onChange={(e) => 
                    inputHandler("username", e.target.value)
                  }
                  required
                />
              </div>

              <div className="m-2">
                <input type="password" id="reg-password" className="form-input bg-gray-100 text-left font-sans font-light w-80"
                  placeholder="ENTER PASSWORD"
                  value={registration["password"]}
                  onChange={(e)=> { 
                    inputHandler("password", e.target.value)
                  }}
                  required
                  />
              </div>

              <div className="m-2 pb-1">  
                <input type="password" id="reg-confirm-password" className="form-input bg-gray-100 text-left font-sans font-light w-80"
                  placeholder="CONFIRM PASSWORD"
                  value={registration["confirmPassword"]}
                  onChange={(e)=> 
                    inputHandler("confirmPassword", e.target.value)
                  }
                  required
                />
              </div>

              <span className="flex justify-center items-center pt-1">
                  <input type="submit" value="Create Account" disabled={isSubmitDisabled()}
                  className= {"border-2 rounded-full w-auto text-white " + 
                  (isSubmitDisabled() ? "bg-blue-200" : "bg-orange-500 hover:cursor-pointer hover:bg-orange-600")}
                  />
              </span>
              <br/>
              <p className="flex justify-center items-center font-mono text-cyan-400 select-none"> 
                Or if you have an account &nbsp; 
                <Link to="../login" className= "text-cyan-600 hover:text-cyan-700 hover:underline"> Log in! </Link>
              </p>
            </form>

          </div> 
        </div>
    )
}

export default Registration;