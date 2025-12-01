import { posts } from "./data.js"

document.addEventListener("click", function(e) {
    if (e.target.dataset.like) {
        handleLikeClick(e.target.dataset.like)
    }

    if (e.target.dataset.share) {
        handleShareClick(e.target.dataset.share)
    }
})

function handleLikeClick(postId) {
    const targetPostObj = posts.filter(function(post) {
        return post.uuid === postId
    })[0]

    if (targetPostObj.isLiked) {
        targetPostObj.likes--
    }
    else {
        targetPostObj.likes++
    }
    
    targetPostObj.isLiked = !targetPostObj.isLiked

    // renderPosts()
    const postElement = document.querySelector(`[data-post-id="${postId}"]`)
    if (!postElement) return

    const likesEl = postElement.querySelector(".likes-count")
    if (likesEl) {
        likesEl.textContent = `${targetPostObj.likes} likes`
    }

    const heartIcon = postElement.querySelector("[data-like]")
    if (heartIcon) {
        if (targetPostObj.isLiked) {
            heartIcon.classList.remove("fa-regular")
            heartIcon.classList.add("fa-solid", "liked")
        } else {
            heartIcon.classList.remove("fa-solid", "liked")
            heartIcon.classList.add("fa-regular")
        }
    }
}

function handleShareClick(postId) {
    const targetPostObj = posts.filter(function(post) {
        return post.uuid === postId
    })[0]

    targetPostObj.isShared = !targetPostObj.isShared

    const postElement = document.querySelector(`[data-post-id="${postId}"]`)
    if (!postElement) return

    const shareIcon = postElement.querySelector("[data-share]")
    if (shareIcon) {
        if (targetPostObj.isShared) {
            shareIcon.classList.add("shared")
        }
        else {
            shareIcon.classList.remove("shared")
        }
    }

}

function renderPost(post) {

    let likeIconClass = ''
    let likeStateClass = 'fa-regular'
    let shareIconClass = ''

    if (post.isLiked) {
        likeIconClass = 'liked'
        likeStateClass = 'fa-solid'
    }

    if (post.isShared) {
        shareIconClass = 'shared'
    }

    return `
        <article class="post" data-post-id="${post.uuid}">
                <header class="post-header">
                    <img class="avatar" alt="user avatar" src="${post.avatar}">
                    <div class="user-info">
                        <p class="user-full-name">${post.name}</p>
                        <p class="user-location">${post.location}</p>
                    </div>
                </header>

                <figure class="post-media">    
                    <img alt="post image" src="${post.post}">
                </figure>

                <section class="post-actions">
                    <button class="like-button">
                        <i class="${likeStateClass} fa-heart ${likeIconClass}" data-like="${post.uuid}"></i>
                    </button>
                    <button class="comment-button">
                        <i class="fa-regular fa-comment" data-comment="${post.uuid}"></i>
                    </button>
                    <button class="dm-button">
                        <i class="fa-solid fa-retweet ${shareIconClass}" data-share="${post.uuid}"></i>
                    </button>
                </section>

                <section class="post-likes">
                    <p class="likes-count">${post.likes} likes</p>
                </section>

                <section class="post-caption">
                    <p><span class="user-handle">${post.username}</span> <span class="post-caption-text">${post.comment}</span></p>
                </section>
            </article>
        `;
}

const postsContainer = document.querySelector(".app-main");

function renderPosts() {

    let allPosts = "";

    for (let post of posts) {
        allPosts += renderPost(post);
    }

    postsContainer.innerHTML = allPosts;
}

renderPosts()