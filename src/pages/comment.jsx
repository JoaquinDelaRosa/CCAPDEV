import React, {useEffect, useState} from "react";
import parseDate from "../utils/date";
import TextBox from "./textbox";

function Comment({ content, profile }) {
  const [post, setPost] = useState({
    "id" : "",
    "title": "",
    "author": "",
    "date": new Date(),
    "mediaPath": null,
    "mediaAlt": "",
    "body": "",
    "upvotes": 0,
    "downvotes": 0,
    "views" : 0,
    "comments": []
  });
  const [showing, setShowing] = useState(false);
  const [replying, setReplying] = useState(false);
  const [reply, setReply] = useState("");

  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownVoted] = useState(false);
  
  useEffect( () => {
    if (content !== undefined)
      setPost(content);
  }, [content]);

  useEffect( () => {
    if (reply !== ""){
          post.comments.push({
            "id": Math.random() * 2<<20,      // Temporary hash for id
            "author" : (profile) ? profile["username"] : "Anonymous",
            "date": new Date(),
            "mediaPath" : null,
            "mediaAlt" : "",
            "body" : reply, 
            "upvotes" : 0,
            "downvotes" : 0,
            "views" : 0,
            "comments" : []
          }
        )
        setPost(values => ({...values, "comments" : post.comments}))
      }
    },  [post.comments, reply, profile]
  )

  const handleUpvote = () => {
    if (upvoted)
      setPost( values => ({...values, "upvotes" : post.upvotes - 1}))
    else {
      setPost( values => ({...values, "upvotes" : post.upvotes + 1}))
      if (downvoted)
        setPost( values => ({...values, "downvotes" : post.downvotes -1}))
    }

    setDownVoted(false);
    setUpvoted(!upvoted);
  }

  const handleDownvotes = () => {
    if (downvoted)
      setPost( values => ({...values, "downvotes" : post.downvotes - 1}))
    else {
      setPost( values => ({...values, "downvotes" : post.downvotes + 1}))
      if (upvoted)
        setPost( values => ({...values, "upvotes" : post.upvotes -1}))
    }

    setUpvoted(false);
    setDownVoted(!downvoted);
  }
  return (
    <div className="pl-4 w-full">
      <div id="comment-box" className="w-full h-auto">
        <div id="comment-author" className="h-fit mb-1">
          <p className="text-left font-mono text-lg font-semibold inline-flex">
            {post.author} &nbsp; 
          </p>         
          <p className="text-left font-mono text-gray-400 inline-flex"> 
            {parseDate(post.date)}
          </p>
        </div>

        {/* Note that comments do not require images */}
        {(post.mediaPath !== null) ?
          <div id="comment-media" className="mb-1 h-fit w-full flex">
            <img src={post.mediaPath} alt={post.mediaAlt}
            className="max-w-[20rem] max-h-[20rem]"
            />
          </div>
          : null
        }

        <div id="post-body-section" className="h-fit pl-5">
          <p className="font-mono text-justify">
            {post.body}
          </p>
        </div>

        <div id="rating-bar" className="flex h-fit mb-2">
          <div className="w-fit mr-3 ">
            <input type="button"
              className="text-base mr-3 pt-1 font-semibold text-gray-600 hover:text-blue-900 hover:cursor-pointer"
              defaultValue={showing ? "Hide Comments ▲" : "Show Comments ▼"}
              onClick = {() => {setShowing(!showing)}}
            />

            <input type="button"
              className="text-base mr-3 pt-1 font-semibold text-gray-600 hover:text-blue-900 hover:cursor-pointer"
              defaultValue={"Reply"}
              onClick = {() => {setReplying(!replying)}}
            />
          </div>

          <div className="align-middle">
            <input type="button" 
              className={"w-fit mr-3 hover:cursor-pointer text-green-700 text-xl " + (upvoted ? "font-extrabold" : "font-bold")}
              onClick={(e) => {handleUpvote()}}
              value={(upvoted ? "▲" : "△") + post.upvotes}
            />
          </div>

          <div>
            <input type="button" 
              className={"w-fit mr-3 hover:cursor-pointer text-red-700 text-xl " + (downvoted ? "font-extrabold" : "font-bold")}
              onClick={(e) => {handleDownvotes()}}
              value={ (downvoted ? "▼" :  "▽") + post.downvotes}
            />
          </div>

        </div>

        <div id="reply-box" className="w-full mt-2, mb-1">
          {
            replying && <TextBox reply = {reply} setReply={setReply}/>
          }
        </div>
        <div id="comment-section" className=" w-full h-auto " >
        {
          post.comments.map( (value) => {
            return (
                showing &&
                <div className="flex border-l-2 border-l-gray-400 ml-4 my-2 min-w-[10rem] h-full" key={value.id}>
                  <div className="w-2 h-full"> </div>
                  <Comment content={value}/>
                </div>
              )
           })
        }
        </div>

      </div>
    </div>
    )
}

export default Comment;