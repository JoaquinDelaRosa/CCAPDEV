import React, { useEffect, useState } from "react";
import parseDate from "../utils/date";
import { Link } from "react-router-dom";


function Profile({profileData}){
  const reader = new FileReader();
  
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
    () => {setProfile(profileData)}
  , [profileData]);

  function SortByDate(props) { // props: array[post]
    // This function returns two buttons that sort the given array to asc or desc
    return (
      <span>
        {/* ASCENDING */}
        <button className="tooltip text-orange-400 float-right hover:bg-gray-900 px-2 rounded-md" 
        onClick={
          (e) => {
            // sort by date (other categories can be added next time)
            props.array.sort((a, b) => (a.date.getTime() > b.date.getTime()) ? 1 : -1);
          }
        }>
          &#129041;
          <span className="tooltiptext opacity-90">
            sort asc date
          </span>
        </button>
        {/* DESCENDING */}
        <button className="tooltip text-orange-400 float-right hover:bg-gray-900 px-2 rounded-md" 
        onClick={
          (e) => {
            props.array.sort((a, b) => (a.date.getTime() < b.date.getTime()) ? 1 : -1);
          }
        }>
          &#129043;
          <span className="tooltiptext opacity-90">
            sort desc date
          </span>
        </button>
      </span>
    )
  }

  const inputHandler = (name, value) => {
    setProfile( values => ({...values, [name] : value}))
  }

  function ShowPosts(props) { // props: array[post]
    return (
      <span>
        {
          props.array.forEach(([id, title, author, date, mediaPath, mediaAlt, body, upvotes, downvotes, views, comments]) => {
            <div className="flex py-1 text-wText" id={id}>
              <span id={id + "image"}>
                <img src={mediaPath} alt={mediaAlt} className="w-16 h-16 rounded-sm space-x-2"></img>
              </span>
              Date: {date}
              Title: {title}
            </div>
          })
        }
      </span>
    )
  }

  return (
    <div className="flex flex-auto h-screen p-4 bg-gray-800 text-white" id="main">
      <div className="min-w-3/4 h-fit p-2" id="left-box">
        <div className="pl-2 pb-1 text-cyan-400 select-none">
          Recent Posts
          <SortByDate array={profile.posts} />
        </div>
        <div className="py-1 font-mono rounded-md ring-1 ring-gray-400 px-1 bg-gray-900">
          <div className="p-2">
            <div className="py-2" id="left-posts">
              <ShowPosts array={profile.posts} />
            </div>
          </div>
        </div>
        <div className="mt-3 pl-2 pb-1 text-cyan-400 select-none">
          Saves
          <SortByDate array={profile.saves} />
        </div>
        <div className="by-2 py-1 font-mono rounded-md ring-1 ring-gray-400 px-1 bg-gray-900">
          <div className="p-2">
              <div className="py-2" id="left-posts">
                <ShowPosts array={profile.saves} />
              </div>
          </div>
        </div>
      </div>
      
      <div className="relative w-fit h-fit p-2 mx-4 bg-gray-700 rounded-lg" id="right-box">
        <Link to="../settings" className="right-4 absolute">
          &#9965;
        </Link>
        <div className="justify-center flex py-3" id="pfp-section">  
          <span className="w-32 h-32">
            <img 
                src={profile["pfp"]} 
                alt={profile["username"] + "'s profile picture"}
                className = "w-full h-full object-cover rounded-full overflow-hidden hover:opacity-80 hover:cursor-pointer"
                onClick={
                  (e) => {
                    document.getElementById("pfp-input").click()
                  }
                }
            />
            <input 
              type="file" 
              hidden={true}
              id="pfp-input" 
              onChange={(e) => {
                if (e && e.target.files && e.target.files[0]){
                    reader.readAsDataURL(e.target.files[0]);
                    reader.onload = function(){
                    inputHandler("pfp", reader.result);
                  }
                }
              }}
            />
          </span>
        </div>

        <div className="mx-4" id="info-section">
          <div className="flex mb-2 justify-center " id="username-section">
            <span className="">{profile["username"]}</span>
          </div>
          <div className="mb-2" id="about-section">
            <p> <strong> About Me: </strong> </p>
            <p> {profile["about"]} </p>
          </div>

          <div className="mb-2" id="other-section">
            <div className="pb-2" id="gender-section">
              <p> {profile["gender"]} </p>
            </div>

            <div className="pb-2" id="datejoined-section">
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