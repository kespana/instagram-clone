import { posts } from "./data.js"

function renderPost(post) {
    return `
        <article class="post">
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
                    <button class="like-button" data-like="${post.id}">
                        <i class="fa-regular fa-heart"></i>
                    </button>
                    <button class="comment-button" data-comment="${post.id}">
                        <i class="fa-regular fa-comment"></i>
                    </button>
                    <button class="dm-button" data-share="${post.id}">
                        <i class="fa-regular fa-paper-plane"></i>
                    </button>
                </section>

                <section class="post-likes">
                    <p class="likes-count">${post.likes} likes</p>
                <section class="post-caption">
                    <p><span class="user-handle">${post.username}</span> <span class="post-caption-text">${post.comment}</span></p>
                </section>
            </article>
        `;
}

const postsContainer = document.querySelector(".app-main");

let allPosts = "";

for (let post of posts) {
    allPosts += renderPost(post);
}

postsContainer.innerHTML = allPosts;