import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import parseDate from "../utils/date";
import { hasDownvoted, hasUpvoted, hasViewed, hasFavorited } from "../utils/voted";
import Author from "./author";
import Cookies from "js-cookie";

// TODO:  Post Id should be assigned in the DB.
// TODO upvotes and downvotes should correspond to the current state (i.e., loaded profile )

const postURL = "/api/post/edit"

const defaultPost = {
  "id": "",
  "title": "",
  "author": "",
  "date": new Date(),
  "mediaPath": null,
  "mediaAlt": "",
  "body": "",
  "upvotes": [],
  "downvotes": [],
  "favorites": [],
  "views": [],
  "tags" : [],
  "comments": []
}

function Postbox({ content, context }) {
    const [post, setPost] = useState(defaultPost);  
    const [upvoted, setUpvoted] = useState(hasUpvoted(post, Cookies.get("id")));
    const [downvoted, setDownVoted] = useState(hasDownvoted(post, Cookies.get("id")));
    const [favorite, setFavorited] = useState(hasFavorited(post, Cookies.get("id")));

    useEffect(() => {
        if (content !== undefined) {
          setPost(content);
          setUpvoted(hasUpvoted(post, Cookies.get("id")));
          setDownVoted(hasDownvoted(post, Cookies.get("id")));
          setFavorited(hasFavorited(post, Cookies.get("id")));

          handleView()

        } else {
          setPost(defaultPost);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [content, Cookies.get("id"), post.id]);

      
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
        .catch((error) => {
          //console.log("Error in updating the Post\n" + error);
        })
      },  [post.comments, context, post]
    )

    const handleView = () => {
      if (Cookies.get("id") === "")
        return;

      if (!hasViewed(post, Cookies.get("id"))){
        post.views.push(Cookies.get("id"));
      }
    }


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
      // FETCH associated profile data
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

    return (
      <div className= "w-full h-auto border-gray-800 bg-gray-700 hover:bg-gray-500 px-4 py-2 border-2 mb-3">
        <Link to={("/postpage/" + post.id)} state={{id: post.id}}>
          <div className="">
            <strong className="text-left font-extrabold font-sans text-2xl align-baseline tracking-wider"> 
                {post.title}
            </strong>
          </div>
        </Link>

          <div id="post-author-section" className="h-fit mb-5">
              <p className="text-left font-mono font-semibold mb-0"> 
                By: <Author context={context} author={post.author} />
              </p>
              
            <Link to={("/postpage/" + post.id)} state={{id: post.id}}>       
              <p className="text-left font-mono"> 
                Posted: {parseDate(new Date(post['date']))}
              </p>
            </Link>
          </div>

        <Link to={("/postpage/" + post.id)} state={{id: post.id}}>
          <div className="px-10 h-fit w-full pb-5 flex justify-center">
            <img src={post.mediaPath} alt={post.mediaAlt} className="self-center max-w-[40rem] max-h-[40rem]"/>
          </div>
        </Link>

        <div className="flex h-fit">
          <div>
            <input type="button" 
              className={`w-fit mr-5 hover:cursor-pointer text-xl text-green-700 hover:text-green-500
              ${false ? "font-extrabold" : "font-bold"}`}
              onClick={(e) => {handleUpvote(); e.target.value = post.upvotes.length}}
              value={post.upvotes.length}
            />
          </div>

          <div>
            <input type="button" 
              className={`w-fit mr-5 hover:cursor-pointer text-xl text-red-700 hover:text-red-500
              ${false ? "font-extrabold" : "font-bold"}`}
              onClick={(e) => {handleDownvotes(); e.target.value = post.downvotes.length}}
              value={post.downvotes.length}
            />
          </div>

          <div>
            <input type="button" 
              className={`w-fit mr-5 hover:cursor-pointer text-xl text-yellow-700 hover:text-yellow-500
              ${false ? "font-extrabold" : "font-bold"}`}
              onClick={(e) => {handleFavorites(); e.target.value = post.favorites.length}}
              value={"☆ " +  post.favorites.length}
            />
          </div>

          
          <div className="w-fit text-left text-xl mr-1 text-gray-400">
              <p className="font-bold"> {post.views.length}</p>
            </div>

            <div className="w-fit text-right text-xl  text-gray-400">
              <p className="font-thin">  views </p>
          </div>
        </div>
      </div>
    )
}

export default Postbox;