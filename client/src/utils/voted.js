export function hasUpvoted(post, user) {
    return post.upvotes.includes(user);
}

export function hasDownvoted(post, user) {
    return post.downvotes.includes(user);
}

export function hasFavorited(post, user) {
    return post.favorites.includes(user);
}