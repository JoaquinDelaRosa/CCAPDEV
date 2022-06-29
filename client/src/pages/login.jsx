import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

// TODO:    Account verification. Ensure the account exists by a query to the DB
const loginURL = '/api/user/login';

function Login({context, setContext}){
    const defaultUserName = "ENTER USERNAME";
    const defaultPassword = "ENTER PASSWORD";
    const navigation = useNavigate();

    const [login, setLogin] = useState({
      "username" : defaultUserName, 
      "password" : defaultPassword,
    })
    
    function InvalidInput(props) {
      if(!isComplete() && isNotDefault())
        return (
          <div className="ml-2 text-red-500 text-xs italic hover:cursor-default pb-2">
            Invalid username or password.
          </div>
      )
    }

    const inputHandler = (name, value) => {
      setLogin( values => ({...values, [name] : value}))
    }
    
    const isComplete = () => {
      let isComplete = true;
      Object.values(login).forEach((value) => {isComplete = isComplete && value!== ""})
      return isComplete;
    }

    const isNotDefault = () => {
      return login.username !== defaultUserName && login.password !== defaultPassword;
    }

    const isValid = () => {
      // Input validation will go here later. For now just a placeholder will do
      return login.username !== defaultUserName && login.password !== defaultPassword;
    }

    const isSubmitDisabled = () => {
      return !(isValid() && isComplete());
    }

    const handleLogin = (e) => {
      if (e !== null) {
        fetch(loginURL, {
          method : "POST",
          headers : {
            'Content-type': 'application/json'
          },
          body: JSON.stringify({
            "username": login["username"],
            "password": login["password"]
          })
        })
        .then((response) => {
          return response.json()
        })
        .then((result) => {
          Cookies.set("id", result.id);

          navigation('../feed');
        }, (err) => {
          alert("Username or Password is incorrect");
        })
        e.preventDefault();
      }

    }

    return (
      <div className="flex justify-center items-center h-screen from-gray-900 to-bgGradient bg-gradient-to-br">
        <div className="flex max-w-fit p-8 shadow-md rounded-md bg-gray-800">
          <form >
            <span className="flex justify-center items-center">
              <h2 className="m-0.5  text-center font-sans font-extrabold w-80 text-cyan-500 select-none"> Log in to your account </h2>
            </span>
            
            <div className="m-2">
              <input type="text" id="reg-username" className="form-input caret-cyan-500 bg-gray-100 text-left font-sans font-light w-80 rounded-sm" placeholder="ENTER USERNAME" 
                onChange={(e) => 
                  inputHandler("username", e.target.value)
                }
                required
                />
              </div>

            <div className="m-2 pb-1">
              <input type="password" id="reg-password" className="form-input caret-cyan-500 bg-gray-100 text-left font-sans font-light w-80 rounded-sm" placeholder="ENTER PASSWORD"
                onChange={(e)=> { 
                  inputHandler("password", e.target.value)
                }}
                required
              />
            </div>
            
            <InvalidInput />

            <span className="pt-1 flex justify-center items-center">
                <input type="submit" value="Log In" disabled={isSubmitDisabled()}
                  className= {"py-1 px-8 rounded-full w-auto text-white " + 
                  (isSubmitDisabled() ? "bg-blue-200" : "bg-orange-500 hover:cursor-pointer hover:bg-orange-600")}
                  onClick={(e) => handleLogin(e)}
                />
            </span>
            
            <br/>
            <p className="flex justify-center items-center font-mono"> 
              <span className="text-cyan-400 select-none">Don't have an account?</span> &nbsp; 
              <Link to="../registration" className="text-cyan-600 hover:text-cyan-700 hover:underline"> Register here </Link>
            </p>
          </form>

        </div> 
      </div>
    )
}

export default Login;