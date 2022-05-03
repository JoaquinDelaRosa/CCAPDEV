import React, { useEffect, useState } from "react";
import Postbox from "./postbox";
import List from "./List";

const content = [{
  "id": 1,
  "title": "Introducing The turboencabulator",
  "author": "Anonymous",
  "date": new Date(),
  "mediaPath": require("../images/sample.png"),
  "mediaAlt": "",
  "upvotes": 10,
  "downvotes": 20,
  "favorites": 0,
  "views": 100,
  "tags" : [],
  "comments" : []
}, {
  "id": 2,
  "title": "This is what smoking does...(cleaned 2-3 months ago)",
  "author": "nobody____special",
  "date": new Date(),
  "mediaPath": require("../images/p2.png"),
  "mediaAlt": "",
  "upvotes": 1110,
  "downvotes": 345,
  "favorites": 0,
  "views": 100,
  "tags" : [],
  "comments" : []
}, {
  "id": 3,
  "title": "Does anyone know the name of this drawing technique in which you do shadows with lines? Do you guys know any good material that teaches how to draw like that? Btw the Drawing is Pythagoras by D. Cunego",
  "author": "Dragon_Leviosa",
  "date": new Date(),
  "mediaPath": require("../images/p3.png"),
  "mediaAlt": "",
  "upvotes": 1021,
  "downvotes": 48,
  "favorites": 0,
  "views": 100,
  "tags" : [],
  "comments" : []
}, {
  "id": 4,
  "title": "Overwatch vs TF2, Character Types",
  "author": "HEV_tux",
  "date": new Date(),
  "mediaPath": require("../images/p4.png"),
  "mediaAlt": "",
  "upvotes": 4195,
  "downvotes": 794,
  "favorites": 0,
  "views": 100,
  "tags" : [],
  "comments" : []
}, {
  "id": 5,
  "title": "R301 and Rampage in Crafting for S13",
  "author": "Spyrogrunt2",
  "date": new Date(),
  "mediaPath": require("../images/p5.png"),
  "mediaAlt": "",
  "upvotes": 521,
  "downvotes": 24,
  "favorites": 0,
  "views": 100,
  "tags" : [],
  "comments" : []
}]
 


function Feed() {
  const [postList, setPostList] = useState([]);
  let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setPostList(lowerCase);
  };

    useEffect(
      () => { setPostList(content) }, []
    );

  return (
    <div className="pt-2 bg-gray-800 text-white">
      <div className="flex w-full text-black px-10 pt-5">
        <input type="search" 
          className="w-5/6"
          placeholder="Searhc for a post" 
          onChange={event => {/* Handle search here*/ }}></input>
      </div>

      <div id="header" className="px-10 h-fit pt-5 ph-3 pb-5 w-full">
        <h2 className="text-left font-semibold font-sans text-4xl align-baseline tracking-wider"> 
            See What's up!
        </h2>
      </div>

      {/* This should be fetched from the DB probably, but for now we can hard code it*/}
      <div className="flex flex-auto">
        <div id = "feed" className="w-fit pl-10 h-fit mb-5 ml-4">
          {
           /* postList.filter(element => {
              if (query === null) {
                // if query is empty
                return element;
              } else if (element.title.toLowerCase().include(query.toLowerCase())) {
                //returns filtered array
                return element;
              }
            })*/ 
            
            postList.map(element => { 
              return (
                <div key ={element.id} className="flex border-4 px-4 py-2">
                  <Postbox content={element}/>
                </div>
              )}
            )
            
            // <List input={postList} />
          }
        </div>

        <div id = "Sidebar" className="ml-32 mr-32 border-2 h-fit w-full">
          <h2 className="font-bold font-sans text-2xl pb-2 w-full"> Trending Tags</h2>

          <ul className="marker:text-sky-400 list-disc pl-5 space-y-2 text-xl font-medium">
            <li>Funny</li>
            <li>Game</li>
            <li>Random</li>
            <li>Science</li>
            <li>Meme</li>
          </ul>
        </div>

      </div>

      <div id = "Footer" className="pt-10">

      </div>
    </div>
  )
}

export default Feed;