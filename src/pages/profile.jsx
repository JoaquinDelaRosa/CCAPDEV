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

    const [pfp, setpfp] = useState(false);
    const [abouting, setAbout] = useState(false);
    const [saving, setSave] = useState(false);

    const handleSettings = () => {
        // make all editable information in the info-section editable textbox. make save changes button.
    
    }

    return (
        <div className="flex flex-auto h-screen p-4 bg-gray-800 text-white" id="main">
            <div className="w-full min-w-3/4 h-fit p-2 justify-start" id="left-box">
                <div className="p-2" id="saves-section">
                    <button className="text-cyan-500 font-mono rounded-lg border-white border-2 px-1 py-0.5">
                        Saves
                    </button>
                </div>
            </div>
            
            <div className="w-fit h-fit p-2 mr-4 flex justify-start bg-gray-700 rounded-lg" id="right-box">
                <div className="flex justify-right align-middle  w-fit h-fit" id="pfp-section">
                    <img src={profile["pfp"]} 
                        alt={profile["username"] + "'s profile picture"}
                        className = "rounded-full"
                        width={128}
                        height={128}
                    />
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