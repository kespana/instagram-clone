import { posts } from "./data.js"

document.addEventListener("click", function(e) {
    if (e.target.dataset.like) {
        handleLikeClick(e.target.dataset.like)
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

function renderPost(post) {

    let likeIconClass = ''
    let likeStateClass = 'fa-regular'

    if (post.isLiked) {
        likeIconClass = 'liked'
        likeStateClass = 'fa-solid'
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
                        <i class="fa-regular fa-paper-plane" data-share="${post.uuid}"></i>
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