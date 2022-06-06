import React, { useEffect, useState }  from "react";
import { Link } from "react-router-dom";

const loggedInNavbar = {
  'Feed': './feed',
  'Upload': './upload', 
  'Profile': './profile',
  'Log Out': './',
  "Danger Zone": "./dangerpage" 
}

const loggedOutNavbar = {
  'Feed': './feed',
  'Login': './login',
  'SignUp': './registration'
}

function Navbar({profile, setProfile}){
  



  const logOut = (e) => {
      if (e !== null)
        setProfile(null);
  }

  useEffect(() => {
    setProfile(profile);
  }, [profile, setProfile]);
  
  const [navbar, setNavbar] = useState(loggedOutNavbar);

  
  useEffect(() => {
      if(profile === null) {
        setNavbar(loggedOutNavbar) 
      } else {
        loggedInNavbar.Profile = './profile?username=' + profile.username;
        loggedInNavbar["Danger Zone"] = './dangerpage?username=' + profile.username;
        setNavbar(loggedInNavbar);
      }
    }, [profile, setNavbar]
  )

  return (
    <nav className="sticky top-0 flex flex-auto space-x-4 py-2 pl-3 opacity-95 bg-gray-800 ring-1 ring-cyan-[#2d467d] outline-white bg-gradient-to-br from-gray-900 backdrop-blur-xl">
      {
        Object.keys(navbar).map((key) => {
          return <Link to={navbar[key]} key={key} className="px-4 py-1 rounded-lg font-medium hover:bg-gray-900 hover:ring-1 hover:ring-orange-500 hover:text-orange-100 text-wText" 
            onClick={(e) => {
              if(key === 'Log Out') {
                logOut(e);
              }
            }}>
            {key}
          </Link>
        })
      }
    </nav>
  );
}

export default Navbar;