/* eslint-disable no-lone-blocks */
/* eslint-disable no-multi-str */
import React, { useEffect, useState } from "react";
import parseDate from "../utils/date";
import Comment from "./comment";
import TextBox from "./textbox";
import TagLabel from "./taglabel";
import { useLocation } from "react-router-dom";

// TO-DO: Archived posts. Requires the DB
//        Edit/ Delete posts. More convenient to do this with the DB
//        Comments should be deletable / editable. This'll be handled in Phase 2
//        Upvotes and downvotes should check if user has already liked / disliked. Replace the checks of the form if(upvoted) / if(Downvoted).

function PostPage({postData, context, setContext}){
  const [post, setPost] = useState({
    "id" : "",
    "title": "",    
    "author": "",
    "date" : new Date(),
    "mediaPath": null,
    "mediaAlt": "",
    "body": "",
    "upvotes": [],
    "downvotes": [],
    "favorites": [],
    "views" : [],
    "tags" : [],
    "comments": []
  });

  const [showing, setShowing] = useState(true);
  const [replying, setReplying] = useState(false);
  const [reply, setReply] = useState("");
  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownVoted] = useState(false);
  const [favorite, setFavorited] = useState(false);

  let location = useLocation();

  useEffect(
    () => {
      if (location.state && location.state.postData)
        setPost(location.state.postData)
    }, [location]
  )

  useEffect( () => {
      if (reply !== ""){
          post.comments.push({
            "id": Math.random() * 2<<20,      // Temporary hash for id
            "author" : (context) ? context["username"]  :"Anonymous",
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
      }
    },  [post.comments, reply, context]
  )

  const handleUpvote = () => {
    console.log(post.upvotes);
    if (upvoted) {
      post.upvotes.push("");
      setPost( values => ({...values,
        "upvotes" : post.upvotes
      }))
    }
    else {
      post.upvotes.push("");
      setPost( values => ({...values, 
        "upvotes" : post.upvotes}
      ))
      if (downvoted) 
        setPost( values => ({...values, 
        "downvotes" : post.downvotes.filter((val) => {return true;})
      }))
    }

    setDownVoted(false);
    setUpvoted(!upvoted);
  }

  const handleDownvotes = () => {
    if (downvoted) {
      post.downvotes.push("");
      setPost( values => ({...values, 
        "downvotes" : post.downvotes
      }))
    }
    else {
      post.downvotes.push("");
      setPost( values => ({...values, 
        "downvotes" : post.downvotes
      }))
      if (upvoted)
        setPost( values => ({...values, 
          "upvotes" : post.upvotes.filter(((value) => {return true}))}
        ))
    }

    setUpvoted(false);
    setDownVoted(!downvoted);
  }

  
  const handleFavorites = () => {
    let profile = {saves : []};
    // FETCH associated profile data

    if (!favorite && !profile.saves.includes(post.id)){
      profile.saves.push(post.id);
    } else if (favorite && profile.saves.includes(post.id)){
      profile.saves.splice(profile.saves.indexOf(post.id));
    }

    if (favorite)
      setPost( values => ({...values, 
        "favorites" : post.favorites.filter((value) => {return true})
      }));
    else {
      post.favorites.push("");
      setPost( values => ({...values, 
        "favorites" : post.favorites
      }));
    }

    // PATCH profile 
    //setProfile( values => ({...values, "saves" : profile.saves}));
    
    setFavorited(!favorite);
  }


  return (
      <div className="bg-gray-800 text-white">
        <div id="post-section" className= "w-full h-auto">
          <div id="post-title-section" className="px-10 h-fit pt-5 pb-3">
            <strong className="text-left font-extrabold font-sans text-4xl align-baseline tracking-wider"> 
              {post.title}
            </strong>
          </div>

          <div id="post-author-section" className="px-10 h-fit mb-5">
            <p className="text-left font-mono font-semibold mb-0"> 
              By: {post.author}
            </p>            
            <p className="text-left font-mono"> 
              Posted: {parseDate(new Date(post['date']))}
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

        <div id="tags-bar" className="px-10 flex h-fit flex-wrap">
          {
            post.tags.map((value) => {
              return (
                // Ideally in the DB, each tag has an associated id. so key={value} should be replaced with the tagid
                <div key={value}>
                  <TagLabel content={value} bg="bg-green-600" text="text-gray"/>
                </div>
              )
            })
          }
        </div>

        <div id="rating-bar" className="px-10 flex h-fit items-center"> 
          <div className="w-full">
            <input type="button" 
            className="text-xl font-semibold text-gray-400 hover:text-blue-200 hover:cursor-pointer mr-5" 
            defaultValue={showing ? "Hide Comments ▲" : "Show Comments ▼"}
            onClick = {() => {setShowing(!showing)}}
            /> 

            <input type="button"
            className="text-xl font-semibold text-gray-400 hover:text-blue-200 hover:cursor-pointer"
            defaultValue={"Reply"}
            onClick = {() => {setReplying(!replying)}}
            />

          </div>

          <div>
            <input type="button" 
              className={`w-fit mr-5 hover:cursor-pointer text-3xl text-green-700 hover:text-green-500
              ${upvoted ? "font-extrabold" : "font-semibold"}`}
              onClick={(e) => {handleUpvote();}}
              value={(upvoted ? "▲" : "△") + post.upvotes.length}
            />
          </div>

          <div>
            <input type="button" 
              className={`w-fit mr-5 hover:cursor-pointer text-3xl text-red-700 hover:text-red-500
              ${downvoted ? "font-extrabold" : "font-semibold"}`}
              onClick={(e) => {handleDownvotes();}}
              value={ (downvoted ? "▼" :  "▽") + post.downvotes.length}
            />
          </div>

          <div>
            <input type="button" 
              className={`w-fit mr-5 hover:cursor-pointer text-3xl text-yellow-700 hover:text-yellow-500
              ${favorite ? "font-extrabold" : "font-semibold"}`}
              onClick={(e) => {handleFavorites(); e.target.value = post.favorites.length}}
              value={ (favorite ? "★" :  "☆") + post.favorites.length}
            />
          </div>

          <div className="w-fit text-left text-3xl mr-1 text-gray-400">
            <p className="font-bold"> {post.views.length}</p>
          </div>

          <div className="w-fit text-right text-3xl  text-gray-400">
            <p className="font-thin">  {" views"} </p>
          </div>
        </div>
        
        <div id="reply-box" className="w-full px-10 mt-4 mb-2">
          {
            replying && <TextBox reply={reply} setReply={setReply}/>
          }
        </div>

        <div id="comment-section" className=" w-fit h-auto px-12" >
          {
            post.comments.map( (value) => {
              return (
                showing &&  
                <div className="flex border-l-4 border-l-gray-500 my-2" key={value.id}>
                  <div className="w-5 h-full "> </div> 
                  <Comment content={value} />
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