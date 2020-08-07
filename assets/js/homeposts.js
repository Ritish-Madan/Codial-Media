{
    function createPost(){
        let postForm = $('#newPostForm');
        postForm.submit(function(event){
            event.preventDefault();
            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: postForm.serialize(),
                success: function(data){
                    let newPost = showPostDom(data.data.post);
                    console.log(newPost);
                    $('#show-posts>ul').prepend(newPost)
                },error: function(err){
                    console.log("Error occured while sending data", err);
                }
            })
        });
    };

    let showPostDom = function(post){
        return $(`<li id='post-${post._id}'> 
        <p>
            <small>
                 <a class="delete-post-button" href="/posts/destroy/${post._id}">X</a>
            </small>
            ${post.content}
            <br>
            <small>
            ${post.user.name}
            </small>
        </p>
        <div class="post-comments">
            <form action="/comments/create" method="POST">
                <input type="text" name="content" placeholder="Type here to add Comment..." required>
                <input type="hidden" name="post" value="${post._id}">
                <input type="submit" value="Add Comment">
            </form>
            <div class="post-comment-list">
                <ul id="post-comment-${post._id}">
                </ul>
            </div>
        </div>
    </li>`)
    }
    createPost();
}