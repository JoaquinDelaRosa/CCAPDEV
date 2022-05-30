﻿import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import parseDate from "../utils/date";

// TODO:  Post Id should be assigned in the DB.

const defaultPost = {
  "id": "",
  "title": "",
  "author": "",
  "date": new Date(),
  "mediaPath": null,
  "mediaAlt": "",
  "body": "",
  "upvotes": 0,
  "downvotes": 0,
  "favorites": 0,
  "views": 0,
  "tags" : [],
  "comments": []
}

function Postbox({ content }) {
    const [post, setPost] = useState(defaultPost);

    useEffect(() => {
        if (content !== undefined) {
          setPost(content);
        } else {
          setPost(defaultPost);
        }
    }, [content]);

    return (
      <div className= "w-full h-auto border-gray-800 bg-gray-700 hover:bg-gray-500 px-4 py-2 border-2 mb-3">
        <Link to={("/postpage/" + post.id)} state={{postData: post}}>
          <div className="">
            <strong className="text-left font-extrabold font-sans text-2xl align-baseline tracking-wider"> 
                {post.title}
            </strong>
          </div>

          <div id="post-author-section" className="h-fit mb-5">
              <p className="text-left font-mono font-semibold mb-0"> 
                By: {post.author}
              </p>            
              <p className="text-left font-mono"> 
                Posted: {parseDate(new Date(post['date']))}
              </p>
          </div>

          <div className="px-10 h-fit w-full pb-5 flex justify-center">
            <img src={post.mediaPath} alt={post.mediaAlt} className="self-center max-w-[40rem] max-h-[40rem]"/>
          </div>
        </Link>

        <div className="flex h-fit">
          <div>
            <input type="button" 
              className={`w-fit mr-5 hover:cursor-pointer text-xl text-green-700 hover:text-green-500
              ${false ? "font-extrabold" : "font-bold"}`}
              onClick={(e) => {; e.target.value = post.upvotes}}
              value={post.upvotes}
            />
          </div>

          <div>
            <input type="button" 
              className={`w-fit mr-5 hover:cursor-pointer text-xl text-red-700 hover:text-red-500
              ${false ? "font-extrabold" : "font-bold"}`}
              onClick={(e) => {; e.target.value = post.downvotes}}
              value={post.downvotes}
            />
          </div>

          <div>
            <input type="button" 
              className={`w-fit mr-5 hover:cursor-pointer text-xl text-yellow-700 hover:text-yellow-500
              ${false ? "font-extrabold" : "font-bold"}`}
              onClick={(e) => {; e.target.value = post.favorites}}
              value={"☆ " +  post.favorites}
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