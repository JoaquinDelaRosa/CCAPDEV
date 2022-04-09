/* eslint-disable no-lone-blocks */
/* eslint-disable no-multi-str */
import React, { useEffect, useState } from "react";
import Comment from "./comment";
import TextBox from "./textbox";

// Placeholder 
const p = {
  "title" : "Introducing The turboencabulator",
  "author" : "Anonymous",
  "body" : 
  " The original machine has a base-plate of prefabulated amulite, surmounted by a malleable logarithmic \
    casing in such a way that the two spurving bearings were in a direct line with the pentametric fan. \
    The latter consisted simply of six hydrocoptic marzelvanes, so fitted to the ambifacient lunar waneshaft \
    that side fumbling was effectively prevented. The main winding was of the normal lotus-o-delta type placed \
    in panendermic semiboloid slots in the stator, every seventh conductor being connected by a non-reversible \
    tremie pipe to the differential girdlespring on the \"up\" end of the grammeters.",
  "upvotes": 10,
  "downvotes": 20,
  "views": 100,
  "mediaPath" : require("../images/sample.png"),

  "comments" : [{
      "id": 1,
      "mediaPath" : null,
      "mediaAlt" : "",
      "body" : "Wow! Great!",
      "upvotes"  : "1",
      "downvotes" : "10",
      "views"     : "20",
      "author"    : "Jane Doe",
      "comments" : []
    },
  
    {
    "id": 2,
    "mediaPath" : null,
    "mediaAlt" : "",
    "body" :   " The original machine has a base-plate of prefabulated amulite, surmounted by a malleable logarithmic \
    casing in such a way that the two spurving bearings were in a direct line with the pentametric fan. \
    The latter consisted simply of six hydrocoptic marzelvanes, so fitted to the ambifacient lunar waneshaft \
    that side fumbling was effectively prevented. The main winding was of the normal lotus-o-delta type placed \
    in panendermic semiboloid slots in the stator, every seventh conductor being connected by a non-reversible \
    tremie pipe to the differential girdlespring on the \"up\" end of the grammeters.",
    "upvotes"  : "1",
    "downvotes" : "10",
    "views"     : "20",
    "author"    : "Jane Doe",
    "comments" : [
      {
        "id": 23,
        "mediaPath" : null,
        "mediaAlt" : "",
        "body" :   " The original machine has a base-plate of prefabulated amulite, surmounted by a malleable logarithmic \
        casing in such a way that the two spurving bearings were in a direct line with the pentametric fan. \
        The latter consisted simply of six hydrocoptic marzelvanes, so fitted to the ambifacient lunar waneshaft \
        that side fumbling was effectively prevented. The main winding was of the normal lotus-o-delta type placed \
        in panendermic semiboloid slots in the stator, every seventh conductor being connected by a non-reversible \
        tremie pipe to the differential girdlespring on the \"up\" end of the grammeters.",
        "upvotes"  : "1",
        "downvotes" : "10",
        "views"     : "20",
        "author"    : "Jane Doe",
        "comments" : []
      }
    ]}
  ]
}

function PostPage(){
  const [post, setPost] = useState({
    "id" : "",
    "title": "",
    "mediaPath": null,
    "mediaAlt": "",
    "body": "",
    "upvotes": "",
    "downvotes": "",
    "views" : "",
    "author": "",
    "comments": []
  });

  const [showing, setShowing] = useState(true);
  const [replying, setReplying] = useState(false);
  const [reply, setReply] = useState("");

  useEffect(
    () => {setPost(p)}, []
  )

  useEffect( () => {
      post.comments.push({
        "id": 1000,
        "mediaPath" : null,
        "mediaAlt" : "",
        "body" : reply, 
        "upvotes" : 0,
        "downvotes" : 0,
        "views" : 0,
        "author" : "Anonymous",
        "comments" : []
      })
    },  [post.comments, reply]
  )

  return (
      <div className="mt-2">
        <div id="post-section" className= "w-full h-auto">
          <div id="post-title-section" className="px-10 h-fit pt-5 pb-3">
            <strong className="text-left font-extrabold font-sans text-4xl align-baseline tracking-wider"> 
              {post.title}
            </strong>
          </div>

          <div id="post-author-section" className="px-10 h-fit pb-5">
            <p className="text-left font-mono "> 
              By: {post.author}
            </p>
          </div>

          <div id="post-media-section" className="px-10 h-fit w-full pb-5 flex justify-center">
            <img src={post.mediaPath} alt={post.mediaAlt} className="self-center max-w-[40rem] max-h-[40rem]"/>
          </div>

          <div id="post-body-section" className="px-10 h-fit pb-5">
            <p className="font-mono text-justify">
              {post.body}
              </p>
            </div>
        </div>
        <div id="rating-bar" className="px-10 flex h-fit"> 
          <div className="w-full">
            <input type="button" 
            className="text-l font-semibold text-gray-400 hover:text-blue-900 hover:cursor-pointer mr-5" 
            defaultValue={showing ? "Hide Comments ▲" : "Show Comments ▼"}
            onClick = {() => {setShowing(!showing)}}
            /> 

            <input type="button"
            className="text-l font-semibold text-gray-400 hover:text-blue-900 hover:cursor-pointer"
            defaultValue={"Reply"}
            onClick = {() => {setReplying(!replying)}}
            />

          </div>

          <div>
            <p className="w-fit mr-5 text-xl font-extrabold text-green-400"> {post.upvotes} </p>
          </div>

          <div>
            <p className="w-fit mr-5 text-xl font-extrabold text-red-400"> {post.downvotes} </p>
          </div>

          <div className="w-fit text-left text-xl mr-1 text-gray-400">
            <p className="font-bold"> {post.views}</p>
          </div>

          <div className="w-fit text-right text-xl  text-gray-400">
            <p className="font-thin">  views </p>
          </div>
        </div>
        
        <div id="reply-box" className="w-full px-10 mt-4 mb-2">
          {
            replying && <TextBox onReply={setReply}/>
          }
        </div>

        <div id="comment-section" className=" w-fit h-auto mx-10" >
          {
            post.comments.map( (value) => {
              return (
                showing && 
                <div className="flex border-4 pr-4 py-2" key={value.id}>
                  <div className="w-5 h-full "> </div> 
                  <Comment post={value} />
                </div>
              )
            })
          }
        </div>
        
        <div id="footer" className="h-[3rem]">

        </div>
      </div>
  )
}

export default PostPage;