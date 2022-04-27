import React, { useState } from "react";
import { Link } from "react-router-dom";
import parseTags from "../utils/search";

function UploadPage({profile}){
  const reader = new FileReader();

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
    "views" : 0,
    "tags" : [],
    "comments": []
  });
    
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
  
  const canPost = (() =>{
    return profile !== null && post.body.length > 5 && post.title.length > 5 && post.mediaPath !== null;
  })

  return (
    <div className="my-3 px-4">
      <div id="header" className="w-full">
        <div>
          <h2 className="font-bold font-sans text-3xl"> Post a new Image! </h2>
        </div>
      </div>

      <div id ="body" className="my-3 px-4">
        {/* Submission proper will be handled in the backend / phase 2. It's more convenient that way. */ }
          <form className="w-full h-fit"
          >
            <input type="text" id="post-title"
            className="w-full h-fit mb-1 text-lg font-mono bg-slate-50 overflow-hidden resize-none"
            onChange={(e) => {
                inputHandler("title", e.target.value);
                inputHandler("mediaAlt", e.target.value);
                e.target.style.height = 'inherit';
                e.target.style.height = `${e.target.scrollHeight}px`; 
            }}
            name = "text"
            placeholder= "Title"
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
            className="w-full h-fit mb-1 text-lg font-mono bg-slate-50 overflow-hidden resize-none"
            onChange={(e) => {
                inputHandler("tags", parseTags(e.target.value));
                e.target.style.height = 'inherit';
                e.target.style.height = `${e.target.scrollHeight}px`; 
            }}
            name = "text"
            placeholder= "Title"
            required
            />
            
            <textarea id="post-body"
            className="w-full h-fit mb-1 text-lg font-mono bg-slate-50 overflow-hidden resize-none"
            onChange={(e) => {
                inputHandler("body", e.target.value);
                e.target.style.height = 'inherit';
                e.target.style.height = `${e.target.scrollHeight}px`; 
            }}
            name = "text"
            placeholder= "Description"
            required
            />

            <span className="pt-1 flex justify-start items-center">
              <Link to={"/"}>
                <input type="submit" value="Post!" disabled={!canPost()}
                  className= {"py-1 px-8 rounded-full w-auto hover:cursor-pointer text-white " + 
                  (canPost() ? "bg-blue-200" : "bg-orange-500 " +
                  (canPost() ? "hover:bg-blue-400" : "hover:bg-orange-600"))}
                />
              </Link>
            </span>

        </form>
      </div>

      <div id="footer">

      </div>
    </div>
  )
}

export default UploadPage;