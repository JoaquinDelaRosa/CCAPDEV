import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login(){

    const defaultUserName = "ENTER USERNAME";
    const defaultPassword = "ENTER PASSWORD";

    const [login, setLogin] = useState({
      "username" : defaultUserName, 
      "password" : defaultPassword,
    })

    const inputHandler = (name, value) => {
      setLogin( values => ({...values, [name] : value}))
    }

    const [passwordInputType, setPasswordInputType] = useState("text");
    
    const isComplete = () => {
      let isComplete = true;
      Object.values(login).forEach((value) => {isComplete = isComplete && value!== ""})
      return isComplete;
    }

    const isValid = () => {
      // Input validation will go here later. For now just a placeholder will do
      return login.username !== defaultUserName && login.password !== defaultPassword;
    }

    const isSubmitDisabled = () => {
      return !(isValid() && isComplete());
    }


    return (
        <div className="flex justify-center items-center h-screen">
          <div className="flex max-w-fit">
            <form>
              <span className="flex justify-center items-center">
                <h2 className="m-0.5  text-center font-sans font-extrabold w-80 "> Login into your account </h2>
              </span>
              <div className="m-2">
                <input type="text" id="reg-username" className="form-input bg-gray-100 text-left font-sans font-light w-80"
                  value={login["username"]}
                  onChange={(e) => 
                    inputHandler("username", e.target.value)
                  }
                  onFocus={(e) =>{
                    if(e.target.value === defaultUserName)
                      inputHandler("username", "");
                  }}
                  onBlur={(e)=>{
                    if(login["username"] === "")
                      inputHandler("username", defaultUserName);
                  }}
                  required
                />
              </div>

              <div className="m-2">
                <input type={passwordInputType} id="reg-password" className="form-input bg-gray-100 text-left font-sans font-light w-80"
                  value={login["password"]}
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
                    if(login["password"] === ""){
                      inputHandler("password", defaultPassword);
                      setPasswordInputType("text");
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
                Don't have an account? &nbsp; <Link to="../registration" className="text-blue-300 hover:text-blue-600"> Register now! </Link>
              </p>
            </form>

          </div> 
        </div>
    )
}

export default Login;