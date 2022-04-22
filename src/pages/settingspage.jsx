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
    if (value === null || value === "")
        value = profile[name];
    
    setEditted( values => ({...values, [name] : value}))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    Object.assign(profile, editted);
    setProfile(profile);
    setEditted(profile);
  }

  return (
    <div className="h-screen bg-gray-400 p-5">
      <div id="edit section" className="mb-10">
        <h1 className= "mb-2  text-left font-sans text-4xl font-bold w-80"> 
          Edit your profile!
        </h1>

        <form onSubmit= {handleSubmit} className="my-4">
          <div className="flex my-3" id="username">
            <label className="mr-3"> 
              <h2 className="font-sans font-medium text-1xl"> Name: </h2> 
            </label>

            <div> 
              <input type="text"
                className="form-input bg-gray-100 text-left font-sans font-light w-80 rounded-sm"
                placeholder={editted["username"] === "" ? profile["username"] : editted["username"]}
                onChange={(e) => {inputHandler("username", e.target.value)}}
              />
            </div>
          </div>

          <div className="flex my-3" id="password">
            <label className="mr-3"> 
              <h2 className="font-sans font-medium text-1xl">
                Password: 
              </h2> 
            </label>

            <div> 
              <input type="password"
                className="form-input bg-gray-100 text-left font-sans font-light w-80 rounded-sm"
                placeholder={"Change password"}
                onChange={(e) => {inputHandler("password", e.target.value)}}
              />
            </div>
          </div>

          <div id="about-me" className="my-3">
            <label className="mr-3"> 
              <h2 className="font-sans font-medium text-1xl"> 
              About Me: 
              </h2> 
            </label>

            <div> 
              <textarea
                className="w-full max-w-xl h-fit mb-1 text-lg font-mono bg-slate-50 overflow-hidden resize-none"
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
              className= {"py-1 px-8 rounded-full w-auto text-white bg-orange-500 hover:cursor-pointer hover:bg-orange-600"}
            />
          </div>
                
        </form>
      </div>

      <div id="delete section" className="mt-20">
        <h1 className= "mb-2  text-left font-sans text-3xl font-bold w-80">
          Delete your profile? 
        </h1>
        
        <div id="delete-button">
          <label>
            <p className="font-sans font-medium text-1xl">
              Warning: This cannot be undone
            </p>
          </label>
          <input type="button"
            className="py-1 px-8 rounded-full w-auto text-white bg-red-700 hover:cursor-pointer hover:bg-orange-800"
            value={"Yes"}
          />
        </div> 
      </div>
    </div>
  )
}

export default SettingsPage;