import React, { useEffect, useState } from "react";

// TODO: Handle Profile Deletion (Phase 2). Should remove profile from DB

function DangerPage({profile, setProfile}){
  
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

  const [confirmPassword, setConfirmPassword] = useState("");
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    setProfile(profile);
  }, [profile, setProfile]);

  useEffect(() => {
    if(profile !== null){
      setEditted(profile);
    }
  }, [setEditted, profile]);

  const canSubmit = () => {
    if (deleted) 
      return (confirmPassword === profile["password"]);
    return true;
  }

  const handleSubmit = (event) => {
    if (canSubmit()){
      event.preventDefault();
      Object.assign(profile, editted);
      setProfile(profile);
      setEditted(profile);
    }
  }

  return (
   <div className="h-screen bg-gray-800 text-white p-5">
    <div id="delete section">
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
          className="my-3 py-1 px-8 rounded-full w-auto text-white bg-red-700 hover:cursor-pointer hover:bg-orange-800"
          value={"Yes"}
          onClick={() => setDeleted(true)}
        />
          
        <form onSubmit= {handleSubmit} className="my-4 py-4 px-4">
          <table className="table-auto">
            <tbody>
              <tr className="" id="confirm-password" hidden={!deleted}>
                <td className="flex justify-items-center">
                  <label className="mr-3"> 
                    <h2 className="font-sans font-medium text-2xl">
                    Confirm Password: 
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
                    required = {deleted}
                />
                </td>
              </tr>
            </tbody>
          </table>

          <div id="submit" hidden={!deleted}>
            <input type="submit"
              value={"Save Changes"}
              className= {"py-1 px-8 rounded-full w-auto text-white " + 
              (canSubmit() ? "bg-orange-500 hover:cursor-pointer hover:bg-orange-600" : "bg-blue-200 hover:cursor-pointer hover:bg-blue-300")}
            />
          </div>
        </form>
      </div> 
    </div>
  </div>
  )
}

export default DangerPage;