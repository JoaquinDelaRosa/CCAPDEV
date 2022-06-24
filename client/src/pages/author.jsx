import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";


const userURL = '/api/user';

function Author({context, author}) {
    const [username, setUsername] = useState("");
    useEffect(() => {
        if (author !== ""){
            let data = fetch(userURL + "?id=" + author, { 
                method : "GET",
                headers : {
                  'Content-type': 'application/json'
                },
              })
              .then((response) => {
                return response.json();
              })
              .catch((error) => {
                console.log("Error in retrieving profile information" );
              });
        
              if (data) {
                data.then( (profileData) => {
                  if (profileData) {
                    setUsername(profileData.username);
                  } else{
                    setUsername("");
                  }
                });
              }
        }
    }, [author])


    return (
    <span className={(username.length > 0 ? "hover:text-blue-300" : "")}>
        { username.length > 0  && 
        <Link to={"../profile?id=" + author}>
            {username}
        </Link>
        }

        { username.length <= 0 &&
          "<Anonymous>"
        }
    </span>
    )
}

export default Author;