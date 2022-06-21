import React, { useEffect, useState } from "react";
import parseDate from "../utils/date";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import defaultProfile from "../utils/defaultProfile";
import UserPosts from "./userposts";
import UserSaves from "./usersaves";

// TO-DO:   Posts should be fetched rather than hardcoded.

const userURL = '/api/user';

function Profile({context, setContext}){
  const [profile, setProfile] = useState(defaultProfile);
  
  const [searchParams, ] = useSearchParams();
  let location = useLocation(defaultProfile);

  useEffect(
    () => {
      const username = searchParams.get("username");
      let data = fetch(userURL + "?username=" + username, { 
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
            setProfile(profileData);
          } else{
            setProfile(defaultProfile);
          }
        });
      }
    }
  , [location.search, searchParams]);

  return (
    <div className="flex flex-auto p-8 bg-gray-800 text-white h-screen" id="main">
      <div className="max-w-[25%] w-fit h-fit p-2 mx-4 bg-gray-700 rounded-lg" id="left-box">
        {
          profile && context && profile.username === context.username &&
          <Link to={"../settings?username=" + profile.username} className="absolute pl-2">
            &#9965;
          </Link>
        }
        <div className="justify-center flex pt-3 pb-1" id="pfp-section">  
          <span className="mt-3 w-32 h-32">
            <img 
                src={profile["pfp"]} 
                alt={profile["username"] + "'s profile picture"}
                className = "w-full h-full object-cover rounded-full overflow-hidden hover:opacity-80 hover:cursor-pointer"
            />
          </span>
        </div>

        <div className="mx-4" id="info-section">
          <div className="flex mb-2 justify-center " id="username-section">
            <span className="">{profile["username"]}</span>
          </div>
          <div className="mb-2 pt-2" id="about-section">
            <p> <strong> About Me: </strong> </p>
            <p> {profile["about"]} </p>
          </div>

          <div className="mb-2" id="other-section">
            <div className="pb-2" id="gender-section">
              <p> {profile["gender"]} </p>
            </div>

            <div className="pb-2" id="datejoined-section">
              <p> <strong> User since: </strong> </p>
              <p> {parseDate(new Date(profile["dateJoined"]))} </p> 
            </div>
          </div>
        </div>
      </div>
      
      <div className="min-w-[67%] h-fit p-2" id="right-box">
        <UserPosts username={profile.username}/>
        <UserSaves username={profile.username}/>
      </div>
    </div>
  )
}

export default Profile;