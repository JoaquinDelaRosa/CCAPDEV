import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import TagLabel from "./taglabel";
import defaultPost from "../utils/defaultPost";
import Cookies from "js-cookie";

const editURL = '/api/post/edit';

function EditPost({postData, context, setContext}){
  const reader = new FileReader();
  const navigation = useNavigate();

  const [post, setPost] = useState(defaultPost);

  let location = useLocation();

  useEffect(
    () => {
      if (location.state && location.state.postData) {
        setPost(location.state.postData)
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [Cookies.get("id"), location, post.id]
  )
    
  const inputHandler = (name, value) => {
    setPost( values => ({...values, [name] : value}))
  }

  const handleUpload = (e) => {
    if (e && e.target.files && e.target.files[0]){
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = function(){
            inputHandler("mediaPath", reader.result);
        }
    }
  }

  const handleTags = (tag) => {
    if (!post.tags.includes(tag.trim()))
      post.tags.push(tag.trim()); 
    inputHandler("tags", post.tags);
  }
  
  const canPost = (() =>{
    return Cookies.get("id") !== null && Cookies.get("id") !== "" && post.body.length > 5 && post.title.length > 5 && post.mediaPath !== null;
  })

  const handlePermissions = () => {
    // Make sure the post editor has permissions to edit the post
    return Cookies.get("id") === post.author;
  }

  const onSubmit = (e) => {
    if(handlePermissions) {
        fetch(editURL + "?id=" + post.id, {
        method : "PATCH",
        headers : {
        'Content-type': 'application/json'
        },
        body: JSON.stringify({
        "id" : post.id,
        "title": post.title,    
        "author": post.author,
        "date" : post.date,
        "mediaPath": post.mediaPath,
        "mediaAlt": post.mediaAlt,
        "body": post.body,
        "upvotes": post.upvotes,
        "downvotes": post.downvotes,
        "favorites" : post.favorites,
        "views" : post.views,
        "tags" : post.tags,
        "comments": post.comments
        })
        })
        .then((response) => {
        return response.text();
        })
        .then((result) => {
        console.log(result);
        })
        .then(() => {
        navigation('/postpage/' + post.id, {state: {id : post.id}});
        })
        .catch((error) => {
        console.log("Error in Updating the Post\n" + error);
        })
        e.preventDefault();
    }
  };

  return (
    <div className="py-3 px-4 bg-gray-800 text-white min-h-screen" id="upload-page">
      <div id="header" className="w-full h-full">
        <div>
          <h2 className="font-bold font-mono text-3xl text-cyan-400"> Change the post's image </h2>
        </div>
      </div>

      <div id ="body" className="my-3 px-4 h-full">
          <form className="w-full h-full" method="PATCH" action={editURL} >
            <input type="text" id="post-title"
            className="w-full h-fit mb-1 text-lg font-mono bg-slate-50 overflow-hidden resize-none text-black"
            onChange={(e) => {
                inputHandler("title", e.target.value);
                inputHandler("mediaAlt", e.target.value);
                e.target.style.height = 'inherit';
                e.target.style.height = `${e.target.scrollHeight}px`; 
            }}
            name = "text"
            value = {post.title}
            required
            />

            <input accept="image/*" type="file"
              onChange={(e)=> {
                handleUpload(e)
              }}
              required
            />

            <div id="img-preview" className="px-10 h-fit w-full pb-5 flex justify-center">
              <img src={post.mediaPath} alt={post.mediaAlt} className="self-center max-w-[40rem] max-h-[40rem]"/>
            </div>

            <input type="text" id="post-tags"
            className="w-full h-fit mb-1 text-lg font-mono bg-slate-50 overflow-hidden resize-none text-black"
            onChange={(e) => {
                if (e.target.value.indexOf(" ") !== -1){
                  handleTags(e.target.value);
                  e.target.value = "";
                }
                e.target.style.height = 'inherit';
                e.target.style.height = `${e.target.scrollHeight}px`; 
            }}
            name = "text"
            placeholder= "Tags"
            />

            <div id="tags-bar" className="flex h-fit flex-wrap">
              {
                post.tags.map((value) => {
                  return ( value !== "" && 
                    <div key={value} className="flex">
                      <TagLabel content={value}/>
                      <button
                      onClick={() => {
                        inputHandler("tags", post.tags.filter((t) => {return t!==value;}))
                      }}
                      >
                        <p className="pr-3"> {"  ???"} </p>
                      </button>
                    </div>
                  )
                })
              }
            </div>
            
            <textarea id="post-body"
            className="w-full h-fit mb-1 text-lg font-mono bg-slate-50 overflow-hidden resize-none text-black"
            onChange={(e) => {
                inputHandler("body", e.target.value);
                e.target.style.height = 'inherit';
                e.target.style.height = `${e.target.scrollHeight}px`; 
            }}
            name = "text"
            value= {post.body}
            required
            />

            <span className="pt-1 flex justify-start items-center">
                <input type="submit" value="Update Post" disabled={!canPost()}
                  className= {"py-1 px-8 rounded-full w-auto font-mono  text-2xl font-semibold hover:cursor-pointer text-white " + 
                  (canPost() ? "bg-blue-200" : "bg-orange-500 " +
                  (canPost() ? "hover:bg-blue-400" : "hover:bg-orange-600"))}

                onClick = {(e) => (onSubmit(e))}
                />
            </span>

        </form>
      </div>
    </div>
  )
}

export default EditPost;