/* eslint-disable no-lone-blocks */
/* eslint-disable no-multi-str */
import React, { useEffect, useState } from "react";
import parseDate from "../utils/date";
import Comment from "./comment";
import TextBox from "./textbox";
import TagLabel from "./taglabel";
import { useLocation } from "react-router-dom";

// Placeholder 
const p = {
  "id" : 1,
  "title" : "Introducing The turboencabulator",
  "author" : "Anonymous",
  "date": new Date(),
  "mediaPath" : require("../images/sample.png"),
  "mediaAlt" : "",
  "body" : 
  " The original machine has a base-plate of prefabulated amulite, surmounted by a malleable logarithmic \
    casing in such a way that the two spurving bearings were in a direct line with the pentametric fan. \
    The latter consisted simply of six hydrocoptic marzelvanes, so fitted to the ambifacient lunar waneshaft \
    that side fumbling was effectively prevented. The main winding was of the normal lotus-o-delta type placed \
    in panendermic semiboloid slots in the stator, every seventh conductor being connected by a non-reversible \
    tremie pipe to the differential girdlespring on the \"up\" end of the grammeters.",
  "upvotes": 10,
  "downvotes": 20,
  "favorites": 1,
  "views": 100,
  "tags" : ["Random", "Funny", "Science", "Technobabble", "Tag", "Game", "Meme", "Gibberish", "English", "This is a tag", "Read", "Test"],
  "comments" : [{
      "id": 1,
      "author"    : "Jane Doe",
      "date"      : new Date(),
      "mediaPath" : null,
      "mediaAlt" : "",
      "body" : "Wow! Great!",
      "upvotes"  : 15,
      "downvotes" : 12,
      "views"     : 20,
      "comments" : []
    },
  
    {
    "id": 2,
    "author" : "Jane Doe",
    "date"  : new Date(),
    "mediaPath" : null,
    "mediaAlt" : "",
    "body" :   " The original machine has a base-plate of prefabulated amulite, surmounted by a malleable logarithmic \
    casing in such a way that the two spurving bearings were in a direct line with the pentametric fan. \
    The latter consisted simply of six hydrocoptic marzelvanes, so fitted to the ambifacient lunar waneshaft \
    that side fumbling was effectively prevented. The main winding was of the normal lotus-o-delta type placed \
    in panendermic semiboloid slots in the stator, every seventh conductor being connected by a non-reversible \
    tremie pipe to the differential girdlespring on the \"up\" end of the grammeters.",
    "upvotes"  : 1,
    "downvotes" : 10,
    "views"     : "12",
    "comments" : [{
        "id": 1,
        "author"    : "Jane Doe",
        "date"  : new Date(),
        "mediaPath" : null,
        "mediaAlt" : "",
        "body" : "Wow! Great!",
        "upvotes"  : 15,
        "downvotes" : 12,
        "views"     : 20,
        "comments" : []
      }]
    }
  ]
}

function PostPage({postData, profile, setProfile}){
  const [post, setPost] = useState({
    "id" : "",
    "title": "",    
    "author": "",
    "date" : new Date(),
    "mediaPath": null,
    "mediaAlt": "",
    "body": "",
    "upvotes": 0,
    "downvotes": 0,
    "favorites": 0,
    "views" : 0,
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
            "author" : (profile) ? profile["username"]  :"Anonymous",
            "date": new Date(),
            "mediaPath" : null,
            "mediaAlt" : "",
            "body" : reply, 
            "upvotes" : 0,
            "downvotes" : 0,
            "views" : 0,
            "tags" : [],
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

  const handleFavorites = () => {
    if (!favorite && !profile.saves.includes(post.id)){
      profile.saves.push(post.id);
    } else if (favorite && profile.saves.includes(post.id)){
      profile.saves.splice(profile.saves.indexOf(post.id));
    }

    if (favorite)
      setPost( values => ({...values, "favorites" : post.favorites - 1}));
    else 
      setPost( values => ({...values, "favorites" : post.favorites + 1}));

    setProfile( values => ({...values, "saves" : profile.saves}));
    
    setFavorited(!favorite);
    
  }


  return (
      <div className="bg-slate-100">
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
              Posted: {parseDate(post.date).toString()}
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
                  <TagLabel content={value}/>
                </div>
              )
            })
          }
        </div>

        <div id="rating-bar" className="px-10 flex h-fit items-center"> 
          <div className="w-full">
            <input type="button" 
            className="text-xl font-semibold text-gray-600 hover:text-blue-900 hover:cursor-pointer mr-5" 
            defaultValue={showing ? "Hide Comments ▲" : "Show Comments ▼"}
            onClick = {() => {setShowing(!showing)}}
            /> 

            <input type="button"
            className="text-xl font-semibold text-gray-600 hover:text-blue-900 hover:cursor-pointer"
            defaultValue={"Reply"}
            onClick = {() => {setReplying(!replying)}}
            />

          </div>

          <div>
            <input type="button" 
              className={`w-fit mr-5 hover:cursor-pointer text-3xl text-green-700 ${upvoted ? "font-extrabold" : "font-semibold"}`}
              onClick={(e) => {handleUpvote(); e.target.value = post.upvotes}}
              value={(upvoted ? "▲" : "△") + post.upvotes}
            />
          </div>

          <div>
            <input type="button" 
              className={`w-fit mr-5 hover:cursor-pointer text-3xl text-red-700 ${downvoted ? "font-extrabold" : "font-semibold"}`}
              onClick={(e) => {handleDownvotes(); e.target.value = post.downvotes}}
              value={ (downvoted ? "▼" :  "▽") + post.downvotes}
            />
          </div>

          <div>
            <input type="button" 
              className={`w-fit mr-5 hover:cursor-pointer text-3xl text-yellow-700 ${favorite ? "font-extrabold" : "font-semibold"}`}
              onClick={(e) => {handleFavorites(); e.target.value = post.favorites}}
              value={ (favorite ? "★" :  "☆") + post.favorites}
            />
          </div>

          <div className="w-fit text-left text-3xl mr-1 text-gray-600">
            <p className="font-bold"> {post.views}</p>
          </div>

          <div className="w-fit text-right text-3xl  text-gray-600">
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