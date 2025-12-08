import { posts } from "./data.js"

document.addEventListener("click", function(e) {
    if (e.target.dataset.like) {
        handleLikeClick(e.target.dataset.like)
    }

    if (e.target.dataset.share) {
        handleShareClick(e.target.dataset.share)
    }

    const commentBtn = e.target.closest(".comment-button")
    if (commentBtn && commentBtn.querySelector("[data-comment]")) {
        const postId = commentBtn.querySelector("[data-comment]").dataset.comment
        handleCommentClick(postId)
    }

    if (e.target.closest(".comment-submit")) {
        e.preventDefault()

        const form = e.target.closest("[data-comment-form]")
        if (!form) return

        const postId = form.dataset.commentForm
        handleCommentSubmit(postId, form)
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

function handleCommentClick(postId) {
    const targetPostObj = posts.filter(function(post) {
        return postId === post.uuid
    })[0]
    if (!targetPostObj) return

    targetPostObj.isCommenting = !targetPostObj.isCommenting

    const postElement = document.querySelector(`[data-post-id="${postId}"]`)
    if (!postElement) return

    const captionElement = postElement.querySelector(".post-caption")
    if (!captionElement) return

    const newCaptionHtml = renderCaptionSection(targetPostObj)
    captionElement.outerHTML = newCaptionHtml
}

function handleCommentSubmit(postId, form) {
    const commentInputEl = form.querySelector(".comment-input")
    if (!commentInputEl) return
    
    const commentText = commentInputEl.value.trim()
    if (!commentText) return

    const targetPostObj = posts.filter(function(post) {
        return post.uuid === postId
    })[0]
    if (!targetPostObj) return

    targetPostObj.comments.push({
        username: "kmntest",
        text: commentText
    })

    commentInputEl.value = ''

    targetPostObj.isCommenting = false

    const postElement = document.querySelector(`[data-post-id="${postId}"]`)
    if (!postElement) return

    postElement.outerHTML = renderPost(targetPostObj)

}

function renderPost(post) {

    let likeIconClass = ''
    let likeStateClass = 'fa-regular'
    let shareIconClass = ''
    let commentInputHtml = ''

    if (post.isLiked) {
        likeIconClass = 'liked'
        likeStateClass = 'fa-solid'
    }

    if (post.isShared) {
        shareIconClass = 'shared'
    }

    if (post.isCommenting) {
        commentInputHtml = `
            <form class="comment-form" data-comment-form="${post.uuid}">
                <input class="comment-input" name="comment" placeholder="Add a comment...">
                <button class="comment-submit">
                    <i class="fa-solid fa-arrow-up"></i>    
                </button>
            </form>
        `
    }

    let commentsHtml = ''

    if (post.comments && post.comments.length > 0) {
        for (const comment of post.comments) {
            commentsHtml += `
                <p class="post-comment">
                    <span class="user-handle">${comment.username}</span>
                    ${comment.text}
                </p>
            `
        }
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

                ${renderCaptionSection(post)}
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

function renderCaptionSection(post) {
    let commentsHtml = ''
    if (post.comments && post.comments.length > 0) {
        for (const comment of post.comments) {
            commentsHtml += `
                <p class="post-comment">
                    <span class="user-handle">${comment.username}</span>
                    ${comment.text}
                </p>
            `
        }
    }

    let commentInputHtml = ''
    if (post.isCommenting) {
        commentInputHtml = `
            <form class="comment-form" data-comment-form="${post.uuid}">
                <input class="comment-input" name="comment" placeholder="Add a comment...">
                <button class="comment-submit">
                    <i class="fa-solid fa-arrow-up"></i>
                </button>
            </form>
        `
    }

    return `
        <section class="post-caption">
            <p>
                <span class="user-handle">${post.username}</span>
                <span class="post-caption-text">${post.caption}</span>
            </p>
            ${commentsHtml}
            ${commentInputHtml}
        </section>
    `
}

renderPosts()