import React from "react";
import Postbox from "./postbox";

function Feed(){
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
                  <Postbox/>
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