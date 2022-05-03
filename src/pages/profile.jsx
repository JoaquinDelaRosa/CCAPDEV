import React, { useEffect, useState } from "react";
import parseDate from "../utils/date";
import { Link } from "react-router-dom";


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
    () => {setProfile(profileData)}
  , [profileData]);

  function SortByDate({postList, type}) { // props: array[post]
    // This function returns two buttons that sort the given array to asc or desc
    return (
      <span>
        {/* ASCENDING */}
        <button className="tooltip text-orange-400 float-right hover:bg-gray-900 px-2 rounded-md" 
        onClick={
          (e) => {
            // sort by date (other categories can be added next time)
            postList.sort((a, b) => (a.date.getTime() > b.date.getTime()) ? 1 : -1);
            setProfile( values => ({...values, [type] : postList}))
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
            postList.sort((a, b) => (a.date.getTime() < b.date.getTime()) ? 1 : -1);
            setProfile( values => ({...values, [type] : postList}))
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

  function ShowPosts(props) { // props: object[post]
    if(props.postList.length === 0)
      return (
        <span className="flex justify-center items-center">
          Mmm... Pretty quiet here.
        </span>
      )

    return (
      <span>
        {
          props.postList.map(element => {
            //console.log(typeof(props.postList));
            return (
              <Link to="../feed" className="border-b border-b-blue-200 pb-2 mb-2 flex items-start py-1 text-wText" key = {element.id} id={element.id + props.type}>
                <span className="pr-3" id={element.id + "image" + props.type}>
                  <img src={element.mediaPath} alt={element.mediaAlt} className="w-16 h-16 rounded-sm" id={element.id + "img" + props.type}></img>
                </span>
                Title: {element.title}
                <br/>
                Date: {parseDate(element.date).toString()}
              </Link>
            )
          })
        }
      </span>
    )
  }

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

        <div className="mx-4" id="info-section">
          <div className="flex mb-2 justify-center " id="username-section">
            <span className="">{profile["username"]}</span>
          </div>
          <div className="mb-2 pt-2" id="about-section">
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
      
      <div className="min-w-[67%] h-fit p-2" id="right-box">
        <div className="pl-2 pb-1 text-cyan-400 select-none">
          <b>POSTS</b>
          <SortByDate postList={profile.posts} type={"posts"} />
        </div>
        <div className="py-1 min-h-150 font-mono rounded-md ring-1 ring-gray-400 px-1 bg-gray-900">
          <div className="p-2">
            <div className="py-2" id="right-posts" >
              <ShowPosts postList={profile.posts} type={"posts"}/>
            </div>
          </div>
        </div>
        <div className="mt-5 pl-2 pb-1 text-cyan-400 select-none" >
          <b>SAVED</b>
          <SortByDate postList={profile.saves} type ={"saves"}/>
        </div>
        <div className="by-2 py-1 min-h-150 font-mono rounded-md ring-1 ring-gray-400 px-1 bg-gray-900">
          <div className="p-2">
              <div className="py-2" id="right-saves">
                <ShowPosts postList={profile.saves} type={"saves"}/>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile;