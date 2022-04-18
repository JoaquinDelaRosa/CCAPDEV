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
}]
 


function Feed() {
  const [postList, setPostList] = useState([]);

    useEffect(
      () => { setPostList(content) }, []
    );

  return (
    <div>
      <div id="header">
        <h2 className="font-mono font-extrabold"> Foo Bar</h2>
      </div>

      <div id = "feed">
        { 
          postList.map(element => { 
            return (
              <div key ={element.id}>
                <Postbox content={element}/>
              </div>
            )}
          )
        }
      </div>

      <div id = "Sidebar">
        Add Content
      </div>

      <div id = "Footer">
        Add Content
      </div>
    </div>
  )
}

export default Feed;