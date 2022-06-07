export function hasUpvoted(post, user){
    return post.upvotes.includes(user);
}

export function hasDownvoted(post, user){
    return post.downvotes.includes(user);
}