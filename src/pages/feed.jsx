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
  "views": 100,
}, {
  "id": 2,
  "title": "Introducing The turboencabulator 2",
  "author": "Anonymous",
  "date": new Date(),
  "mediaPath": require("../images/sample.png"),
  "mediaAlt": "",
  "upvotes": 10,
  "downvotes": 20,
  "views": 100,
}, {
  "id": 3,
  "title": "Introducing The turboencabulator 3",
  "author": "Anonymous",
  "date": new Date(),
  "mediaPath": require("../images/sample.png"),
  "mediaAlt": "",
  "upvotes": 10,
  "downvotes": 20,
  "views": 100,
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
    <div className="mt-2">
      <div id="header" className="px-10 h-fit pt-5 ph-3 pb-5">
        <h2 className="text-left font-semibold font-sans text-4xl align-baseline tracking-wider"> 
            See What's up!
          <input type="text" placeholder="Search" onChange={event => setPostList(event.target.value)} className="absolute right-0 mr-36"></input>
        </h2>

      </div>

      <div>
        <div id = "Sidebar" className="float-right pr-80 pt-16 ">
          <h2 className="text-center font-bold font-sans text-xl">Trending Tags</h2>
          <ul>
            <li>Funny</li>
            <li>Game</li>
            <li>Random</li>
          </ul>
        </div>

        <div id = "feed" className="w-fit pl-10 h-fit mb-5">
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
      </div>

      <div id = "Footer" className="pt-10">

      </div>
    </div>
  )
}

export default Feed;