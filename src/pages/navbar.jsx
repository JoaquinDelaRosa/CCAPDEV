import React, { useEffect }  from "react";
import { Link } from "react-router-dom";

function Navbar({profile, setProfile}){
  const logOut = (e) => {
      if (e !== null)
        setProfile(null);
  }

  useEffect(() => {
    setProfile(profile);
  }, [profile, setProfile])
  
  return (
    <div className="flex flex-auto">
      <div className="px-5 hover:bg-sky-600" >
        <Link to="./">
          <button>
            <p className="font-mono font-thin text-2xl"> Home </p>
          </button>
        </Link>
      </div>

      <div className="px-5 hover:bg-sky-600" 
        hidden={profile !== null}
      >
        <Link to="./registration">
          <button>
            <p className="font-mono font-thin text-2xl"> Sign up </p>
          </button>
        </Link>
      </div>

      <div className="px-5 hover:bg-sky-600"
        hidden={profile !== null}
      >
        <Link to="./login">
          <button>
            <p className="font-mono font-thin text-2xl"> Login </p>
          </button>
        </Link>
      </div>

      <div className="px-5 hover:bg-sky-600"
        hidden={profile === null}
      >
        <Link to="./">
          <button onClick={(e) => logOut(e)}>
            <p className="font-mono font-thin text-2xl"> Log Out </p>
          </button>
        </Link>
      </div>
    
      <div className="px-5 hover:bg-sky-600"
        hidden={profile === null}
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

      <div className="px-5 hover:bg-sky-600">
        <Link to="./profile">
          <button>
            <p className="font-mono font-thin text-2xl"> Profile </p>
          </button>
        </Link>
      </div>

    </div>
  );
}

export default Navbar;