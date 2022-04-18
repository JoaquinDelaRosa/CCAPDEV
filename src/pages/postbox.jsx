import React, { useEffect, useState } from "react";
import parseDate from "../utils/date";

function Postbox({ content }) {
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

    useEffect(() => {
        if (content !== undefined)
            setPost(content);
    }, [content]);

    return (
      <div>
        <div>
          <p> 
            {post.title} 
          </p>
        </div>

        <div>
          <p>
            {post.author}
          </p>      
        </div>

        <div>
           <p>
            {parseDate(post.date)}
          </p>
        </div>

        <div>
          <img src={post.mediaPath} alt={post.mediaAlt}/>
        </div>

        <div>
          <p>
            {post.upvotes}
          </p>

          <p>
            {post.downvotes}
          </p>

          <p>
            {post.views}
          </p>

        </div>
      </div>
    )
}

export default Postbox;