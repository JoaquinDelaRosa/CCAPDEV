import React from "react";

function Comment({ post }) {
  return (
    <div className="p-0 w-fit">
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
              className="text-sm font-semibold text-gray-400 hover:text-blue-900 hover:cursor-pointer"
              defaultValue={"Show Comments"}
            />
          </div>

          <div className="align-middle">
            <p className="w-fit mr-3 font-extrabold text-green-400"> {post.upvotes} </p>
          </div>

          <div>
            <p className="w-fit mr-3 font-extrabold text-red-400"> {post.downvotes} </p>
          </div>
        </div>

        <div id="comment-section" className=" w-full h-auto " >
        {
          post.comments.map( (value) => {
              return (
                <div className="flex">
                  <div className="w-2 h-full"> </div>
                  <Comment post={value} key={value.id}/>
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