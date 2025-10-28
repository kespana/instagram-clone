const posts = [
    {
        name: "Vincent van Gogh",
        username: "vincey1853",
        location: "Zundert, Netherlands",
        avatar: "images/avatar-vangogh.jpg",
        post: "images/post-vangogh.jpg",
        comment: "just took a few mushrooms lol",
        likes: 21
    },
    {
        name: "Gustave Courbet",
        username: "gus1819",
        location: "Ornans, France",
        avatar: "images/avatar-courbet.jpg",
        post: "images/post-courbet.jpg",
        comment: "i'm feelin a bit stressed tbh",
        likes: 4
    },
        {
        name: "Joseph Ducreux",
        username: "jd1735",
        location: "Paris, France",
        avatar: "images/avatar-ducreux.jpg",
        post: "images/post-ducreux.jpg",
        comment: "gm friends! which coin are YOU stacking up today?? post below and WAGMI!",
        likes: 152
    }
]

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
                    <button class="like-button">
                        <img alt="heart icon" src="images/icon-heart.png">
                    </button>
                    <button class="comment-button">
                        <img alt="comment icon" src="images/icon-comment.png">
                    </button>
                    <button class="dm-button">
                        <img alt="dm icon" src="images/icon-dm.png">
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