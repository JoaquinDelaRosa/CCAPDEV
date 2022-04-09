import React, {useState} from "react";
import TextBox from "./textbox";

function Comment({ post }) {
  const [showing, setShowing] = useState(false);
  const [replying, setReplying] = useState(false);
  const [reply, setReply] = useState("");

  
  const onReply = (rep) => {
    if (rep !== "")
      setReply(reply);
    console.log(reply);
  }

  return (
    <div className="p-0 w-full">
      <div id="comment-box" className="w-full h-auto">
        <div id="comment-author" className="h-fit mb-1 px-0">
          <p className="text-left font-mono text-lg font-semibold">
            {post.author}
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
          <div className="w-fit mr-3">
            <input type="button"
              className="text-sm mr-3 font-semibold text-gray-400 hover:text-blue-900 hover:cursor-pointer"
              defaultValue={showing ? "Hide Comments ▲" : "Show Comments ▼"}
              onClick = {() => {setShowing(!showing)}}
            />

            <input type="button"
              className="text-sm mr-3 font-semibold text-gray-400 hover:text-blue-900 hover:cursor-pointer"
              defaultValue={"Reply"}
              onClick = {() => {setReplying(!replying)}}
            />
          </div>

          <div className="align-middle">
            <p className="w-fit mr-3 font-extrabold text-green-400"> {post.upvotes} </p>
          </div>

          <div>
            <p className="w-fit mr-3 font-extrabold text-red-400"> {post.downvotes} </p>
          </div>
        </div>

        <div id="reply-box" className="w-full mt-2, mb-1">
          {
            replying && <TextBox onReply={onReply}/>
          }
        </div>
        <div id="comment-section" className=" w-full h-auto " >
        {
          post.comments.map( (value) => {
            return (
                showing && 
                <div className="flex border-2 pr-4 py-2 min-w-[10rem]" key={value.id}>
                  <div className="w-2 h-full"> </div>
                  <Comment post={value}/>
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