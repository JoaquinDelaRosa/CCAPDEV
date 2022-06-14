import React, { useEffect, useState } from "react";
import parseDate from "../utils/date";
import { Link, useLocation, useSearchParams } from "react-router-dom";

const searchURL = '/api/post/favorited';

function UserSaves({username}){
    const [postList, setPostList] = useState([])
    
    useEffect( () => {
        let data = fetch(searchURL + "?author:" + username, {
            method : "GET",
            headers : {
              'Content-type' : 'application/json'
            },
          })
          
          .then((response) => {
            if (response) {
              return response.json();
            }
          })
          .catch((error) => {
            console.log("Error in retrieving posts" + error)
          });
          
          if (data) {
            data.then( (postData) => {
              if (postData) {
                setPostList(postData);
              } else{
                setPostList([]);
              }
            });
          }
    }, [username])




    return (
      <span>
          <div className="pl-2 pb-1 text-cyan-400 select-none">
            <b>SAVES</b>
            <span>
                {/* ASCENDING */}
                <button className="tooltip text-orange-400 float-right hover:bg-gray-900 px-2 rounded-md" 
                onClick={
                (e) => {
                    // sort by date (other categories can be added next time)
                    postList.sort((a, b) => (a.date.getTime() > b.date.getTime()) ? 1 : -1);
                    setPostList(postList);
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
                    setPostList(postList);
                }
                }>
                &#129043;
                <span className="tooltiptext opacity-90">
                    sort desc date
                </span>
                </button>
            </span>
          </div>
          <div className="py-1 min-h-150 font-mono rounded-md ring-1 ring-gray-400 px-1 bg-gray-900">
            <div className="p-2">
              <div className="py-2" id="right-posts" >
                { 
                    (postList.length === 0 || username === "")  && 
                    <span className="flex justify-center items-center">
                        Mmm... Pretty quiet here.
                    </span>
                }
                {
                    !(postList.length === 0 || username === "") && 
                    postList.map(element => {
                        return (
                        element && element.date && element.id && 
                        <Link to="../feed" className="border-b border-b-blue-200 pb-2 mb-2 flex items-start py-1 text-wText" key = {element.id} id={element.id}>
                            <span className="pr-3" id={element.id + "image"}>
                            <img src={element.mediaPath} alt={element.mediaAlt} className="w-16 h-16 rounded-sm" id={element.id + "img"}></img>
                            </span>
                            Title: {element.title}
                            <br/>
                            Date: {parseDate(new Date(element.date)).toString()}
                        </Link>
                        )
                    })
                }
            </div>
          </div>
        </div>
      </span>
    )
}

export default UserSaves;