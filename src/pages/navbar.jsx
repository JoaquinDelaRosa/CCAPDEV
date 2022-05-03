import React, { useEffect, useState }  from "react";
import { Link } from "react-router-dom";

const loggedOutNavbar = [
  ['Home', './'],
  ['Feed', './feed'],
  ['Log in', './login'],
  ['Sign Up', './registration']
]

const loggedInNavbar = [ 
  ['Home', './'],
  ['Posts', './postpage'],    /* This should be removed actually. Do it once we handle linking stuff together*/
  ['Upload', './upload'], 
  ['Feed', './feed'],
  ['Log out', './'],
  ['Profile', './profile'],
  ["Danger Zone", "./dangerpage"]
]

function Navbar({profile, setProfile}){
  const logOut = (e) => {
      if (e !== null)
        setProfile(null);
  }

  useEffect(() => {
    setProfile(profile);
  }, [profile, setProfile]);
  
  const [navbar, setNavbar] = useState(loggedInNavbar);

  
  useEffect(() => {
      profile === null ? 
        setNavbar(loggedOutNavbar) : 
        setNavbar(loggedInNavbar);
    }, [profile, setNavbar]
  )

  return (
    <nav className="sticky top-0 flex flex-auto space-x-4 py-2 pl-3 opacity-95 bg-gray-800 ring-1 ring-cyan-[#2d467d] outline-white bg-gradient-to-br from-gray-900 backdrop-blur-xl">
      {
        navbar.map(([title, url]) => (
          <Link to={url} key={title} className="px-4 py-1 rounded-lg font-medium hover:bg-gray-900 hover:ring-1 hover:ring-orange-500 hover:text-orange-100 text-wText" 
            onClick={(e) => {
              if(title === 'Log out') {
                logOut(e);
              };
            }}>
            {title}
          </Link>
        ))
      }
    </nav>
  );
}

export default Navbar;