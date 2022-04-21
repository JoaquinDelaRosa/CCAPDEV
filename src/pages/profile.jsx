import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Profile(){
    const [profile, setProfile] = useState({
        "id": 1,
        "pfp": null,
        "name": "Andrei",
        "username:": "AC",
        "about": "Person",
        "gender": "Male",
        "saves": [],
        "dateJoined": new Date(),
    });
    
    const [pfp, setpfp] = useState(false);
    const [abouting, setAbout] = useState(false);
    const [saving, setSave] = useState(false);

    const handleSettings = () => {
        // make all editable information in the info-section editable textbox. make save changes button.
    
    }

    return (
        <div className="flex flex-wrap h-screen p-4 bg-gray-800 text-white" id="main">

            <div className="w-3/4 p-1 justify-start" id="left-box">
                left
                <div className="p-2" id="saves-section">
                    <button className="text-cyan-500 font-mono rounded-lg border-white border-2 px-1 py-0.5">
                        Saves
                    </button>
                </div>
            </div>

            <div className="w-1/4 p-1 flex justify-center bg-gray-700 rounded-lg" id="right-box">
                right
                <div className="flex justify-center p-1 w-3/4 h-1/4" id="pfp-section">
                    pfp
                </div>
                <div className="" id="info-section">
                    <span className="" id="settings-section">
                        <input type="button">
                            
                        </input>
                    </span>
                    <span className="" id="username-section">

                    </span>
                    <span className="" id="name-section">

                    </span>
                    <span className="" id="about-section">

                    </span>
                    <div className="" id="other-section">
                        <span className="" id="id-section">

                        </span>
                        <span className="" id="gender-section">

                        </span>
                        <span className="" id="datejoined-section">

                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;