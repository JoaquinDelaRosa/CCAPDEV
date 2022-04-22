import React, { useEffect, useState } from "react";

function SettingsPage({profile, setProfile}){
    const [editted, setEditted] = useState({
        "id" : 0,
        "pfp": null,
        "name": "",
        "username": "",
        "password" : "",
        "about": "",
        "gender": "",
        "saves": [],
        "posts" : [],
        "dateJoined": new Date()
    });

    useEffect(() => {
        setProfile(profile);
    }, [profile, setProfile]);

    useEffect(() => {
        if(profile !== null){
            setEditted(profile);
        }
    }, [setEditted, profile]);

    
    const inputHandler = (name, value) => {
        setEditted( values => ({...values, [name] : value}))
    }

    const handleSubmit = () => {
        setProfile(editted);
    }

    return (
        <div>
            <div id="edit section">
                Edit your profile!
                <form>
                    <div className="flex" id="username">
                        <div> <h2 className="mr-3"> Name: </h2> </div>
                        <div> 
                            <input type="text"
                                placeholder={editted["name"]}
                                onChange={(e) => {inputHandler("name", e.target.value)}}
                            />
                        </div>
                    </div>

                    <div className="flex" id="password">
                        <div> <h2 className="mr-3"> Password: </h2> </div>
                        <div> 
                            <input type="password"
                                placeholder={"Change password"}
                                onChange={(e) => {inputHandler("password", e.target.value)}}
                            />
                        </div>
                    </div>

                    <div id="about-me">
                        <div> <h2 className="mr-3"> About Me: </h2> </div>
                        <div> 
                        <textarea
                            className="w-full h-fit mb-1 text-lg font-mono bg-slate-50 overflow-hidden resize-none"
                            placeholder={profile["about"]}
                            onChange={(e) => {
                                inputHandler("about", e.target.value);
                                e.target.style.height = 'inherit';
                                e.target.style.height = `${e.target.scrollHeight}px`; 
                            }}
                        />
                        </div>
                    </div>

                    <div id="submit">
                        <input type="submit"
                            value={"Save Changes"}
                            onSubmit={(e) => {handleSubmit()}}    
                            className= {"py-1 px-8 rounded-full w-auto text-white bg-orange-500 hover:cursor-pointer hover:bg-orange-600"}
                        />
                    </div>
                    
                </form>
            </div>

            <div id="delete section">
                Delete your profile?
                {/* Backend logic for profile deletion goes here */}
            </div>
        </div>
    )
}

export default SettingsPage;