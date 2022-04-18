import React, { useEffect, useState } from "react";
import Postbox from "./postbox";

const p = {
    "id": 1,
    "title": "Introducing The turboencabulator",
    "author": "Anonymous",
    "date": new Date(),
    "mediaPath": require("../images/sample.png"),
    "mediaAlt": "",
    "upvotes": 10,
    "downvotes": 20,
    "views": 100,
    }
 


function Feed() {

    const [post, setPost] = useState({
        "id": "",
        "title": "",
        "author": "",
        "date": new Date(),
        "mediaPath": null,
        "mediaAlt": "",
        "upvotes": 0,
        "downvotes": 0,
        "views": 0,
    });

    useEffect(
        () => { setPost(p) }, []
    );

  return (
    <div>
      {/* Webpage Header */}
      <div>
        <h2 className="font-mono font-extrabold"> Foo Bar</h2>
      </div>

          <div>
              {
                  /* Feed itself. This will contain all the posts. Structure the posts in JSON. Refer to postpage for an example. No need to 
                  include comments.
                  */
                  
                  [p].map(element => { 
                      return <Postbox content={content}/>
                  })
                          
                  
        }
      </div>

      <div>
        {
        /* Side bar. THis is where you put, say, popular posts.
        */
        }
      </div>


      <div>
        {/* Footer */}
      </div>
    </div>
  )
}

export default Feed;