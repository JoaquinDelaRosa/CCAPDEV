import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Login({profile, setProfile}){

    const defaultUserName = "ENTER USERNAME";
    const defaultPassword = "ENTER PASSWORD";

    const [login, setLogin] = useState({
      "username" : defaultUserName, 
      "password" : defaultPassword,
      "username" : "", 
      "password" : "",
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
      return login.username !== "" && login.password !== "";
    }

    const isSubmitDisabled = () => {
      return !(isValid() && isComplete());
    }

    useEffect(() => {
      setProfile(profile);
    }, [profile, setProfile])

    const handleLogin = (e) => {
      if (e !== null)
        setProfile(login);
    }

    return (
      <div className="flex justify-center items-center h-screen">
        <div className="flex max-w-fit">
          <form>
            <span className="flex justify-center items-center">
              <h2 className="m-0.5  text-center font-sans font-extrabold w-80 "> Login into your account </h2>
            </span>
            
            <div className="m-2">
              <input type="text" id="reg-username" className="form-input bg-gray-100 text-left font-sans font-light w-80" placeholder="ENTER USERNAME" 
              <input type="text" id="reg-username" className="form-input bg-gray-100 text-left font-sans font-light w-80" 
                placeholder="ENTER USERNAME" 
                onChange={(e) => 
                  inputHandler("username", e.target.value)
                }
                onBlur={(e)=>{
                  if(login["username"] === "")
                    inputHandler("username", defaultUserName);
                }}
                required
                />
              </div>

            <div className="m-2">
              <input type="password" id="reg-password" className="form-input bg-gray-100 text-left font-sans font-light w-80" 
                placeholder="ENTER PASSWORD"
                onChange={(e)=> { 
                  inputHandler("password", e.target.value)
                }}
                    setPasswordInputType("text");
                  }
                }}
                required
              />
            </div>

            <span className="flex justify-center items-center">
              <input type="submit" value="Log In" disabled={isSubmitDisabled()}
                className= {"border-2 rounded-full w-auto px-10 text-white " + 
                (isSubmitDisabled() ? "bg-blue-200" : "bg-green-500 hover:cursor-pointer")}
                onSubmit={(e) => handleLogin(e)}
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