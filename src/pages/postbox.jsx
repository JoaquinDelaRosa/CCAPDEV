import React, { useEffect, useState } from "react";

function Postbox({ content }) {
    const [post, setPost] = useState({
        "id": "",
        "title": "",
        "author": "",
        "date": new Date(),
        "mediaPath": null,
        "mediaAlt": "",
        "upvotes": 0,
        "downvotes": 0,
        "views": 0,
    });

    useEffect(() => {
        if (content !== undefined)
            setPost(content);
    }, [content]);

    return (
        <div>
            <div>
                <p>Title</p>
                {post.title}
            </div>

            <div>
                <p>Author</p>
                {post.author}
            </div>

            <div>
                <p>Date</p>
                {post.date}
            </div>

            <div>
                <p>Image</p>
                {post.mediaPath}
            </div>

            <div>
                <p>Statistics</p>
                {post.upvotes}
                {post.downvotes}
                {post.views}
            </div>
        </div>
    )
}

export default Postbox;