import React, { useEffect, useState } from "react";
import Postbox from "./postbox";
import TagLabel from "./taglabel";
import { useLocation, useSearchParams } from "react-router-dom";

// TODO: Feed should fetch content from DB rather than content being hardcoded.
//       Handle searching by title and by tag
//       Trending tags should be fetched in DB
const feedURL = '/api/post/feed'; 



function Feed() {
  const [postList, setPostList] = useState([]);

  const [searchParams, ] = useSearchParams();
  let location = useLocation(); 

    useEffect(
      () => {  
        let data = fetch(feedURL, {
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
      }, 
      [location.search, searchParams]);

  return (
    <div className="pt-2 bg-gray-800 text-white min-h-screen min-w-full">
      <div className="flex w-full text-black px-10 pt-5">
        <input type="search" 
          className="w-5/6"
          placeholder="Search for a post" 
          onChange={event => {/* Handle search here*/ }}></input>
      </div>

      <div id="header" className="px-10 h-fit pt-5 ph-3 pb-5 w-full font-mono text-cyan-400">
        <h2 className="text-left font-semibold font-sans text-4xl align-baseline tracking-wider"> 
            See What's up!
        </h2>
      </div>

      {/* This should be fetched from the DB probably, but for now we can hard code it*/}
      <div className="flex flex-auto">
        <div id = "feed" className="w-fit pl-10 h-fit mb-5 ml-4">
          {
            postList.map((element, index) => { 
              if (!postList.length) return null;
              
              return (
                <div key ={index} className="flex">
                  <Postbox content={element}/>
                </div>
              )}
            )
          }
        </div>

        <div id = "Sidebar" className="ml-32 mr-32 border-2 border-gray-700 p-4 h-fit w-full">
          <h2 className="font-bold font-mono text-3xl pb-2 w-full text-cyan-400"> Trending Tags</h2>

          <ul className="marker:text-sky-400 list-disc pl-5 space-y-2 text-xl font-medium font-mono ">
            <TagLabel content={"funny"} text="text-gray" bg="bg-green-600"/>
            <TagLabel content={"random"} text="text-gray" bg="bg-green-600"/>
            <TagLabel content={"science"} text="text-gray" bg="bg-green-600"/>
            <TagLabel content={"meme"} text="text-gray" bg="bg-green-600"/>
            <TagLabel content={"game"} text="text-gray" bg="bg-green-600"/>
          </ul>
        </div>

      </div>

      <div id = "Footer" className="pt-10">

      </div>
    </div>
  )
}

export default Feed;