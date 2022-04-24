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
      <div className= "w-full h-auto">
        <div>
          <strong className="text-left font-extrabold font-sans text-2xl align-baseline tracking-wider"> 
              {post.title}
          </strong>
        </div>

        <div id="post-author-section" className="h-fit mb-5">
            <p className="text-left font-mono font-semibold mb-0"> 
              By: {post.author}
            </p>            
            <p className="text-left font-mono"> 
              Posted: {parseDate(post.date).toString()}
            </p>
        </div>

        <div className="px-10 h-fit w-full pb-5 flex justify-left">
          <img src={post.mediaPath} alt={post.mediaAlt} className="self-center max-w-[40rem] max-h-[40rem]"/>
        </div>

        <div className="flex h-fit">
          <div>
            <input type="button" 
              className={`w-fit mr-5 hover:cursor-pointer text-xl text-green-400 ${false ? "font-extrabold" : "font-bold"}`}
              onClick={(e) => {; e.target.value = post.upvotes}}
              value={post.upvotes}
            />
          </div>

          <div>
            <input type="button" 
              className={`w-fit mr-5 hover:cursor-pointer text-xl text-red-400 ${false ? "font-extrabold" : "font-bold"}`}
              onClick={(e) => {; e.target.value = post.downvotes}}
              value={post.downvotes}
            />
          </div>

          
          <div className="w-fit text-left text-xl mr-1 text-gray-400">
              <p className="font-bold"> {post.views}</p>
            </div>

            <div className="w-fit text-right text-xl  text-gray-400">
              <p className="font-thin">  views </p>
          </div>
        </div>
      </div>
    )
}

export default Postbox;