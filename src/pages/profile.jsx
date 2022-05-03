import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import parseDate from "../utils/date";


function Profile({profileData}){
  const [profile, setProfile] = useState({
    "id" : 0,
    "pfp": null,
    "name": "",
    "username": "",
    "password": "",
    "about": "",
    "gender": "",
    "saves": [],
    "posts" : [],
    "dateJoined": new Date()
  });
    
  useEffect(
    () => {setProfile(profileData)}, [profileData]
  )

  return (
    <div className="flex flex-auto p-8 bg-gray-800 text-white" id="main">
      <div className="max-w-[25%] w-fit h-fit p-2 mx-4 bg-gray-700 rounded-lg" id="left-box">
        <Link to="../settings" className="absolute pl-2">
          &#9965;
        </Link>
        <div className="justify-center flex pt-3 pb-1" id="pfp-section">  
          <span className="mt-3 w-32 h-32">
            <img 
                src={profile["pfp"]} 
                alt={profile["username"] + "'s profile picture"}
                className = "w-full h-full object-cover rounded-full overflow-hidden hover:opacity-80 hover:cursor-pointer"
            />
          </span>
        </div>

        <div className="w-fit ml-4" id="info-section">
          <span className="mb-2" id="username-section">
            <h3> {profile["username"]} </h3>
          </span>

          <span className="mb-2" id="about-section">
            <p> <strong> About Me: </strong> </p>
            <p> {profile["about"]} </p>
          </span>

          <div className="mb-2" id="other-section">
            <div className="" id="gender-section">
              <p> {profile["gender"]} </p>
            </div>

            <div className="" id="datejoined-section">
              <p> <strong> User since: </strong> </p>
              <p> {parseDate(profile["dateJoined"])} </p> 
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile;