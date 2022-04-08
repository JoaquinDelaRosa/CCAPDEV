/* eslint-disable no-multi-str */
import React, { useState } from "react";

function PostPage(){
  const [post, createPost] = useState({
    "postTitle": "",
    "postMediaPath" : "",
    "postBody" : "",
    "upvotes"  : "",
    "downvotes" : "",
    "views"     : "",
    "comments" : {

    }
  });

  // Placeholder values
  post.postTitle = "Introducing The turboencabulator";
  post.postBody = 
  " The original machine has a base-plate of prefabulated amulite, surmounted by a malleable logarithmic \
    casing in such a way that the two spurving bearings were in a direct line with the pentametric fan. \
    The latter consisted simply of six hydrocoptic marzelvanes, so fitted to the ambifacient lunar waneshaft \
    that side fumbling was effectively prevented. The main winding was of the normal lotus-o-delta type placed \
    in panendermic semiboloid slots in the stator, every seventh conductor being connected by a non-reversible \
    tremie pipe to the differential girdlespring on the \"up\" end of the grammeters.";
  post.upvotes = 10;
  post.downvotes = 20;
  post.views = 100;
  post.postMediaPath = require("../images/sample.png");  

  return (
      <div className="mt-2">
        <div id="post-section" className= "w-full h-auto">
          <div id="post-title-section" className="px-10 h-fit py-5">
            <strong className="text-left font-extrabold font-sans text-4xl align-baseline tracking-wider"> 
               {post.postTitle}
            </strong>
          </div>

          <div id="post-media-section" className="px-10 h-fit w-full pb-5 flex justify-center">
            <img src={post.postMediaPath} alt="A sample" className="self-center max-w-[40rem] max-h-[40rem]"/>
          </div>

          <div id="post-body-section" className="px-10 h-fit pb-5">
            <p className="font-mono text-justify">
              {post.postBody}
              </p>
            </div>
        </div>
        <div id="rating-bar" className="px-10 flex"> 
          <div>
            <p className="mr-5 text-xl font-extrabold text-green-400"> {post.upvotes} </p>
          </div>

          <div>
            <p className="text-xl font-extrabold text-red-400"> {post.downvotes} </p>
          </div>

          <div className="w-full text-right text-xl  text-gray-400">
            <p className="font-bold"> {post.views} &nbsp; </p>
          </div>

          <div className="w-fit text-right text-xl  text-gray-400">
            <p className="font-thin">  views </p>
          </div>
        </div>

        
        <div id="comment-section" className="bg-blue-50 w-full h-auto">
          Comments
        </div>
      </div>
  )
}

export default PostPage;