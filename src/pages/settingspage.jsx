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

  const [oldPassword, setOldPasword] = useState("");
  const [passwordEdited, setPasswordEdited] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmOldPassword, setConfirmOldPassword] = useState("");

  useEffect(() => {
    setProfile(profile);
    setOldPasword(profile["password"]);
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

  const canSubmit = () => {
    return (confirmPassword === profile["password"]) && (oldPassword === confirmOldPassword)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    Object.assign(profile, editted);
    setProfile(profile);
    setEditted(profile);
  }

  return (
    <div className="h-screen bg-gray-800 text-white p-5">
      <div id="edit section" className="mb-10">
        <h1 className= "mb-4  text-left font-sans text-4xl font-bold w-80"> 
          Edit your profile!
        </h1>

        <form onSubmit= {handleSubmit} className="my-4 py-4 px-4">
          <table className="table-auto">
            <tr className="" id="username">
              <td className="flex justify-items-center">
                <label className="mr-3"> 
                  <h2 className="font-sans font-medium text-2xl"> Name: </h2> 
                </label>
              </td>

              <td> 
                <input type="text"
                  className="form-input bg-gray-100 text-left font-sans font-light w-80 rounded-sm text-black"
                  placeholder={editted["username"] === "" ? profile["username"] : editted["username"]}
                  onChange={(e) => {inputHandler("username", e.target.value)}}
                />
              </td>
            </tr>

            <tr className="" id="password">
              <td className="flex justify-items-center">
                <label className="mr-3"> 
                  <h2 className="font-sans font-medium text-2xl">
                    Password: 
                  </h2> 
                </label>
              </td>

              <td> 
                <input type="password"
                  className="form-input bg-gray-100 text-left font-sans font-light w-80 rounded-sm text-black"
                  placeholder={"Change password"}
                  onChange={(e) => {
                    inputHandler("password", e.target.value);
                      if(e.target.value === ""){
                        setPasswordEdited(false);
                      } else 
                        setPasswordEdited(true);
                    }
                  }
                />
              </td>
            </tr>

            <tr className="" id="confirm-password" hidden={!passwordEdited}>
              <td className="flex justify-items-center">
                <label className="mr-3"> 
                  <h2 className="font-sans font-medium text-2xl">
                    Enter Old Password: 
                  </h2> 
                </label>
              </td>

              <td> 
                <input type="password"
                  className="form-input bg-gray-100 text-left font-sans font-light w-80 rounded-sm text-black"
                  placeholder={"Change password"}
                  onChange={(e) => {
                      setOldPasword(e.target.value);
                    }
                  }
                  required = {passwordEdited}
                />
              </td>
            </tr>
            
            <tr className="" id="confirm-password" hidden={!passwordEdited}>
              <td className="flex justify-items-center">
                <label className="mr-3"> 
                  <h2 className="font-sans font-medium text-2xl">
                    Confirm New Password: 
                  </h2> 
                </label>
              </td>

              <td> 
                <input type="password"
                  className="form-input bg-gray-100 text-left font-sans font-light w-80 rounded-sm text-black"
                  placeholder={"Change password"}
                  onChange={(e) => {
                      setConfirmPassword(e.target.value);
                    }
                  }
                  required = {passwordEdited}
                />
              </td>
            </tr>

            <tr id="about-me" className="my-3">
              <td>
                <label className="mr-3"> 
                  <h2 className="font-sans font-medium text-2xl"> 
                  About Me: 
                  </h2> 
                </label>
              </td>

              <td> 
                <textarea
                  className="w-full max-w-3xl h-fit mb-1 text-lg font-mono bg-slate-50 overflow-hidden resize-none text-black"
                  placeholder={profile["about"]}
                  onChange={(e) => {
                    inputHandler("about", e.target.value);
                    e.target.style.height = 'inherit';
                    e.target.style.height = `${e.target.scrollHeight}px`; 
                  }}
                />
              </td>
            </tr>
          </table>

          <div id="submit">
            <input type="submit"
              value={"Save Changes"}
              className= {"py-1 px-8 rounded-full w-auto text-white bg-orange-500 hover:cursor-pointer hover:bg-orange-600"}
              disabled = {canSubmit()}
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