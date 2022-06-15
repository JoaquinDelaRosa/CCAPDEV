import React, {useEffect, useState} from "react";
import parseDate from "../utils/date";
import TextBox from "./textbox";
import { hasDownvoted, hasUpvoted } from "../utils/voted";
import { Link} from "react-router-dom";

function Comment({ content, context , setContext, parent, setObserver}) {
  const [post, setPost] = useState({
    "id" : "",
    "title": "",
    "author": "",
    "date": new Date(),
    "mediaPath": null,
    "mediaAlt": "",
    "body": "",
    "upvotes": [],
    "downvotes": [],
    "views" : [],
    "comments": []
  });
  const [showing, setShowing] = useState(false);
  const [replying, setReplying] = useState(false);
  const [editing, setEditing] = useState(false);
  const [reply, setReply] = useState("");
  const [upvoted, setUpvoted] = useState(hasUpvoted(post, context.username));
  const [downvoted, setDownVoted] = useState(hasDownvoted(post, context.userame));
  
  useEffect( () => {
    if (content !== undefined) {
      setPost(content);
      setUpvoted(hasUpvoted(post, context.username));
      setDownVoted(hasDownvoted(post, context.username));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content, context.username, post.id]);

  useEffect( () => {
    if (reply !== "" && replying){
          post.comments.push({
            "id": Math.random() * 2<<20,      // Temporary hash for id
            "author" : (context) ? context["username"] : "",
            "date": new Date(),
            "mediaPath" : null,
            "mediaAlt" : "",
            "body" : reply, 
            "upvotes" : [],
            "downvotes" : [],
            "views" : [],
            "comments" : []
          }
        )
        setPost(values => ({...values, "comments" : post.comments}))
        setObserver(true);
        setReplying(false);
      }

    else if (reply !== "" && editing){
      post.body = reply;
      setPost(values => ({...values, "body" : post.body}))
      setEditing(false);
      setObserver(true);
    }

    },  [post.comments, reply, context, replying, editing, post, setObserver]
  )

  const handleUpvote = () => {
    if (upvoted) {
      setPost( values => ({...values,
        "upvotes" : post.upvotes.filter(((value) => {return value !== context.username;}))
      }))
    }
    else {
      post.upvotes.push(context.username);
      setPost( values => ({...values, 
        "upvotes" : post.upvotes
      }))
      if (downvoted) 
        setPost( values => ({...values, 
        "downvotes" : post.downvotes.filter((value) => {return value !== context.username;})
      }))
    }
    
    setDownVoted(false);
    setUpvoted(!upvoted);
    setObserver(true);
  }

  const handleDownvotes = () => {
    if (downvoted) {
      setPost( values => ({...values, 
        "downvotes" : post.downvotes.filter((value) => {return value !== context.username;})
      }))
    }
    else {
      post.downvotes.push(context.username);
      setPost( values => ({...values, 
        "downvotes" : post.downvotes
      }))
      if (upvoted)
        setPost( values => ({...values, 
          "upvotes" : post.upvotes.filter(((value) => {return value !== context.username}))
      }))
    }

    setUpvoted(false);
    setDownVoted(!downvoted);
    setObserver(true);
  }
  return (
    <div className="pl-4 w-full">
      <div id="comment-box" className="w-full h-auto">
        <div id="comment-author" className="h-fit mb-1">
          <p className="text-left font-mono text-lg font-semibold inline-flex">
            {(post.author.length > 0) ? post.author : "<Anonymous>"} &nbsp; 
          </p>         
          <p className="text-left font-mono text-gray-400 inline-flex"> 
            {parseDate(new Date(post['date']))}
          </p>
        </div>
        
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
              className="text-base mr-3 pt-1 font-semibold text-gray-400 hover:text-blue-200 hover:cursor-pointer"
              defaultValue={showing ? "Hide Comments ▲" : "Show Comments ▼"}
              onClick = {() => {setShowing(!showing)}}
            />

            <input type="button"
              className="text-base mr-3 pt-1 font-semibold text-gray-400 hover:text-blue-200 hover:cursor-pointer"
              defaultValue={"Reply"}
              onClick = {() => {setReplying(!replying)}}
            />

            {
                context.username === post.author && 
                  <input type="button"
                  className="text-xl font-semibold text-gray-400 hover:text-blue-200 hover:cursor-pointer mr-5"
                  defaultValue={"Edit"}
                  onClick = {() => setEditing(!editing)}
                  />
              }
  
              {
                context.username === post.author && 
                <input type="button"
                className="text-xl font-semibold text-gray-400 hover:text-blue-200 hover:cursor-pointer"
                defaultValue={"Delete"}
                onClick = {() => {}}
                />
              }
          </div>

          <div className="align-middle">
            <input type="button" 
              className={"w-fit mr-3 hover:cursor-pointer text-green-700 text-xl hover:text-green-500 " 
              + (upvoted ? "font-extrabold" : "font-bold")}
              onClick={(e) => {handleUpvote()}}
              value={(upvoted ? "▲" : "△") + post.upvotes.length}
            />
          </div>

          <div>
            <input type="button" 
              className={"w-fit mr-3 hover:cursor-pointer text-red-700 text-xl hover:text-red-500 " 
              + (downvoted ? "font-extrabold" : "font-bold")}
              onClick={(e) => {handleDownvotes()}}
              value={ (downvoted ? "▼" :  "▽") + post.downvotes.length}
            />
          </div>


        </div>

        <div id="reply-box" className="w-full mt-2, mb-1">
          {
            (replying || editing) && <TextBox reply = {reply} setReply={setReply}/>
          }
        </div>
        <div id="comment-section" className=" w-full h-auto " >
        {
          post.comments.map( (value) => {
            return (
                showing &&
                <div className="flex border-l-2 border-l-gray-400 ml-4 my-2 min-w-[10rem] h-full" key={value.id}>
                  <div className="w-2 h-full"> </div>
                  <Comment content={value} context={context} parent={parent} setObserver = {setObserver}/>
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