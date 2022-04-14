import React, { useState }  from "react";
import { Link } from "react-router-dom";

function Navbar(){
  const [loggedin, setLoggedIn] = useState(false);

  return (
    <div className="flex flex-auto">
      <div className="px-5 hover:bg-sky-600" 
        hidden={loggedin}
      >
        <Link to="./registration">
          <button className>
            <p className="font-mono font-thin text-2xl"> Sign up </p>
          </button>
        </Link>
      </div>

      <div className="px-5 hover:bg-sky-600"
        hidden={loggedin}
      >
        <Link to="./login">
          <button>
            <p className="font-mono font-thin text-2xl"> Login </p>
          </button>
        </Link>
      </div>

      <div className="px-5 hover:bg-sky-600"
        hidden={!loggedin}
      >
          {/* Add functionality for logging out here*/}
          <button>
            <p className="font-mono font-thin text-2xl"> Log Out </p>
          </button>
      </div>
    
      <div className="px-5 hover:bg-sky-600"
        hidden={loggedin}
      >
        <Link to="./postpage">
          <button>
            <p className="font-mono font-thin text-2xl"> Post </p>
          </button>
        </Link>
      </div>

      <div className="px-5 hover:bg-sky-600">
        <Link to="./feed">
          <button>
            <p className="font-mono font-thin text-2xl"> Feed </p>
          </button>
        </Link>
      </div>

    </div>
  );
}

export default Navbar;