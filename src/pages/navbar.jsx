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
  ['Post', './postpage'],
  ['Feed', './feed'],
  ['Log out', './'],
  ['Profile', './profile'],
  ['Settings', './settings']
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
    <nav className="flex flex-auto space-x-4">
      {console.log(profile) /* check if actually log out*/}
      {
        navbar.map(([title, url]) => (
          // The hash is not a good fix for this.
          <Link to={url} key={title} className="rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900" 
            onClick={(e) => {
              if(title === 'Log out') {
                logOut(e)
                console.log(profile);
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