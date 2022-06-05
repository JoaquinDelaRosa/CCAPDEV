import React, { useEffect, useState } from "react";
import { useLocation, useSearchParams, useNavigate } from "react-router-dom";
import defaultProfile from "../utils/defaultProfile";

// TODO: Handle Profile Deletion (Phase 2). Should remove profile from DB
const deleteURL = 'http://localhost:3000/api/user/delete';
const userURL = 'http://localhost:3000/api/user';

function DangerPage(){
  const [profile, setProfile] = useState(defaultProfile);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [deleted, setDeleted] = useState(false);

  const [searchParams, ] = useSearchParams();
  let location = useLocation(defaultProfile);
  const navigation = useNavigate();

  useEffect(() => {
    const username = searchParams.get("username");
      let data = fetch(userURL + "?username=" + username, { // Careful! This URL search pattern is highly coupled to Danger Zone Navbar.
        method : "GET",
        headers : {
          'Content-type': 'application/json'
        },
      })
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        console.log("Error in retrieving profile information");
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

  const canSubmit = () => {
    if (deleted) 
      return (confirmPassword === profile["password"]);
    return false;
  }

  const handleSubmit = (event) => {
    if (canSubmit()){
      // Fetch backend to delete profile
      fetch(deleteURL + "?username=" + profile["username"], {
        method: "DELETE",
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(profile)
      })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        alert(res.message);  
      })
      .then(() => {
        navigation('../feed');
      })
      event.preventDefault();
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
                    placeholder={"Confirm Password"}
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
              value={"Delete Account"}
              disabled ={!canSubmit()}
              className= {"py-1 px-8 rounded-full w-auto text-white " + 
              (canSubmit() ? "bg-orange-500 hover:cursor-pointer hover:bg-orange-600" : "bg-blue-200 hover:cursor-not-allowed")}
            />
          </div>
        </form>
      </div> 
    </div>
  </div>
  )
}

export default DangerPage;