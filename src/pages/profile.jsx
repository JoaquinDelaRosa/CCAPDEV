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
        <div className="flex flex-wrap h-screen w-screen p-5" id="main">
            main
            <div className="" id="left-box">
                left-box
                <div className="" id="saves-section">
                    saves
                </div>
            </div>

            <div className="" id="right-box">
                <div className="" id="pfp-section">

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