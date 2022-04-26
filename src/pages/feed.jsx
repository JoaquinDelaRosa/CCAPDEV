import React, { useEffect, useState } from "react";
import Postbox from "./postbox";

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

    useEffect(
      () => { setPostList(content) }, []
    );

  return (
    <div className="mt-2">
      <div id="header" className="px-10 h-fit pt-5 ph-3 pb-5">
        <h2 className="text-left font-semibold font-sans text-4xl align-baseline tracking-wider"> 
            See What's up!
          <input type="text" placeholder="Search" className="absolute right-0 mr-36"></input>
        </h2>

      </div>

      <div>
        <div id = "Sidebar" className="float-right">
          Sidebar
        </div>

        <div id = "feed" className="w-fit pl-10 h-fit mb-5">
          { 
            postList.map(element => { 
              return (
                <div key ={element.id} className="flex border-4 px-4 py-2">
                  <Postbox content={element}/>
                </div>
              )}
            )
          }
        </div>
      </div>

      <div id = "Footer" className="pt-10">

      </div>
    </div>
  )
}

export default Feed;