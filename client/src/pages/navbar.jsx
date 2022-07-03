import Cookies from "js-cookie";
import React, { useEffect, useState }  from "react";
import { Link , useNavigate} from "react-router-dom";

const loggedInNavbar = {
  'Feed': '/feed',
  'Upload': '/upload', 
  'Profile': '/profile',
  'Log Out': '/',
  "Danger Zone": "/dangerpage" ,
  'About' : '/about'
}

const loggedOutNavbar = {
  'Feed': '/feed',
  'Login': '/login',
  'SignUp': '/registration',
  'About' : '/about'
}

function Navbar({context, setContext}){
  const [navbar, setNavbar] = useState(loggedOutNavbar);
  const id = Cookies.get("id");
  const navigation = useNavigate();
  
  const logOut = (e) => {
      if (e !== null) {
        Cookies.set("id", "")
        setNavbar(loggedOutNavbar);
        navigation('./')
      }
      e.preventDefault();
  }
  
  useEffect(() => {
    console.log(Cookies.get("id"));
      if(Cookies.get("id").length === 0) {
        setNavbar(loggedOutNavbar) ;
      } else {
        loggedInNavbar.Profile = './profile?id=' + Cookies.get("id");
        loggedInNavbar["Danger Zone"] = './dangerpage?id=' + Cookies.get("id");
        setNavbar(loggedInNavbar);
      }
    }, [id]
  )

  return (
    <nav className="sticky top-0 flex flex-auto space-x-3 py-2 pl-3 opacity-95 bg-gray-800 ring-1 ring-cyan-[#2d467d] outline-white bg-gradient-to-br from-gray-900 backdrop-blur-xl">
      {
        Object.keys(navbar).map((key) => {
          return <Link to={navbar[key]} key={key} className="px-4 py-1 font-medium border-b-2 border-gray-800 hover:border-b-2 hover:border-orange-500 hover:text-orange-100 text-wText" 
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