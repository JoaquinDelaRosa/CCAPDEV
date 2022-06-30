/* eslint-disable no-lone-blocks */
/* eslint-disable no-multi-str */
import React, { useEffect, useState } from "react";
import parseDate from "../utils/date";
import Comment from "./comment";
import TextBox from "./textbox";
import TagLabel from "./taglabel";
import { useLocation ,useNavigate, Link} from "react-router-dom";
import { hasDownvoted, hasFavorited, hasUpvoted } from "../utils/voted";
import defaultPost from "../utils/defaultPost";
import Author from "./author";
import {v4} from "uuid"
import Cookies from "js-cookie";

// TO-DO: 
//        Edit/ Delete posts. More convenient to do this with the DB
//        Comments should be deletable / editable. This'll be handled in Phase 2

const getURL = "/api/post/get"
const postURL = "/api/post/edit"
const deleteURL = "/api/post/delete"


function PostPage({context, setContext}){
  const [post, setPost] = useState(defaultPost);

  const [showing, setShowing] = useState(true);
  const [replying, setReplying] = useState(false);
  const [reply, setReply] = useState("");
  const [upvoted, setUpvoted] = useState(hasUpvoted(post, Cookies.get("id")));
  const [downvoted, setDownVoted] = useState(hasDownvoted(post, Cookies.get("id")));
  const [favorite, setFavorited] = useState(hasFavorited(post, Cookies.get("id")));
  const [deleting, setDeleting] = useState(false);
  const [observer, setObserver] = useState(false);

  let location = useLocation();
  const navigation = useNavigate();

  useEffect(
    () => {
      if (location.state && location.state.id) {
        const id = location.state.id; 

        fetch(getURL + "?id=" + id, {
          method : "GET",
          headers : {
            'Content-type': 'application/json'
          }
        })
        .then((res) => {
          return res.json();
        })
        .then((p) => 
        {
          setPost(p);
          setUpvoted(hasUpvoted(post, Cookies.get("id")));
          setDownVoted(hasDownvoted(post, Cookies.get("id")));
          setFavorited(hasFavorited(post, Cookies.get("id")));
        })
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [Cookies.get("id"), location, post.id]
  )

    useEffect( () => {
      if (reply !== ""){
          post.comments.push({
            "id": v4(), 
            "author" : (Cookies.get("id")) ? Cookies.get("id")  :"",
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
        setReplying(false);
      }
    },  [post.comments, reply, context]
  )

  useEffect( () => {
      // TODO: Make this more efficient by using a multi-part upload rather than a JSON.
      fetch(postURL + "?id=" + post.id, {
        method : "PATCH",
        headers : {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(post)
      })
      .then((response) => {
        return response.text();
      })
      .then((result) => {
        //console.log(result);
      })
      .then(() =>{
        setObserver(false);
      })
      .catch((error) => {
        //console.log("Error in updating the Post\n" + error);
      })
    },  [post.comments, context, post, observer]
  )

  const handleUpvote = () => {
    if (Cookies.get("id") === "")
      return;

    if (upvoted) {
      setPost( values => ({...values,
        "upvotes" : post.upvotes.filter(((value) => {return value !== Cookies.get("id");}))
      }))
    }
    else {
      post.upvotes.push(Cookies.get("id"));
      setPost( values => ({...values, 
        "upvotes" : post.upvotes
      }))
      if (downvoted) 
        setPost( values => ({...values, 
        "downvotes" : post.downvotes.filter((value) => {return value !== Cookies.get("id");})
      }))
    }
    
    setDownVoted(false);
    setUpvoted(!upvoted);
  }

  const handleDownvotes = () => {
    if (Cookies.get("id") === "")
      return;

    if (downvoted) {
      setPost( values => ({...values, 
        "downvotes" : post.downvotes.filter((value) => {return value !== Cookies.get("id");})
      }))
    }
    else {
      post.downvotes.push(Cookies.get("id"));
      setPost( values => ({...values, 
        "downvotes" : post.downvotes
      }))
      if (upvoted)
        setPost( values => ({...values, 
          "upvotes" : post.upvotes.filter(((value) => {return value !== Cookies.get("id")}))
      }))
    }

    setUpvoted(false);
    setDownVoted(!downvoted);
  }

  
  const handleFavorites = () => {
    if (Cookies.get("id") === "")
      return;

    if (favorite)
      setPost( values => ({...values, 
        "favorites" : post.favorites.filter((value) => {return value !== Cookies.get("id")})
      }));
    else {
      post.favorites.push(Cookies.get("id"));
      setPost( values => ({...values, 
        "favorites" : post.favorites
      }));
    }
    
    setFavorited(!favorite);
  }

  const handleDelete = () => {
    if (Cookies.get("id") === "")
      return;

    fetch(deleteURL + "?id=" + post.id, {
      method : "DELETE",
      headers : {
        'Content-type': 'application/json'
      }
    })
    .then((response) => {
      return response.text();
    })
    .then(() => {
      navigation("../feed");
    })
    .catch((err) => {
      console.log(err);
    })
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
              By: <Author context={context} author={post.author} />
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
            className="text-xl font-semibold text-gray-400 hover:text-blue-200 hover:cursor-pointe mr-5"
            defaultValue={"Reply"}
            onClick = {() => {setReplying(!replying)}}
            />
            {
              Cookies.get("id") === post.author && 
              <Link to={"../edit/" +post.id}  state={{postData : post}}>
                <input type="button"
                className="text-xl font-semibold text-gray-400 hover:text-blue-200 hover:cursor-pointer mr-5"
                defaultValue={"Edit"}
                />
              </Link>
            }

            {
              Cookies.get("id") === post.author && 
              <input type="button"
              className="text-xl font-semibold text-gray-400 hover:text-blue-200 hover:cursor-pointer mr-5"
              defaultValue={"Delete"}
              onClick = {() => {setDeleting(!deleting)}}
              />
            }

            {
              deleting === true && 
              <input type="button"
              className="text-xl font-semibold text-red-500 hover:text-blue-700 hover:cursor-pointer"
              defaultValue={"Are you sure? This cannot be undone."}
              onClick = {() => {handleDelete()}}
              />
            }
          </div>

          <div>
            <input type="button" 
              className={`w-fit mr-5 hover:cursor-pointer text-3xl text-green-700 hover:text-green-500
              ${upvoted ? "font-extrabold" : "font-semibold"}`}
              onClick={(e) => {handleUpvote(); e.preventDefault()}}
              value={(upvoted ? "▲" : "△") + post.upvotes.length}
            />
          </div>

          <div>
            <input type="button" 
              className={`w-fit mr-5 hover:cursor-pointer text-3xl text-red-700 hover:text-red-500
              ${downvoted ? "font-extrabold" : "font-semibold"}`}
              onClick={(e) => {handleDownvotes(); e.preventDefault()}}
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
            post.comments.map( (value, index) => {
              return (
                showing &&  
                <div className="flex border-l-4 border-l-gray-500 my-2" key={index}>
                  <div className="w-5 h-full "> </div> 
                  <Comment content={value} context = {context} parent={post} setObserver = {setObserver} />
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