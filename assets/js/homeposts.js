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
                    $('#show-posts>ul').prepend(newPost)
                    destroyPost($(' .delete-post-button', newPost));// Delete the post created using ajax
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

    /* The below function deletes the posts using AJAX which are already present in the database.
    but for the new posts created using AJAX won't be included in the below function because the 
    browser is still not aware of that post, so we had explicitly passed those posts through destroyPost
    function to add those function to newly created posts using AJAX */

    function destroy(){
        let allLinks = $('.delete-post-button');
        for(let i of allLinks){
            destroyPost(i);
        }
    }

    let destroyPost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();
        
            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success:function(data){
                    $(`#post-${data.data.post_id}`).remove();
                }, error: function(err){
                    console.log("Error Occured while deleting the post", err);
                }
            })
        })
    }
    destroy();
};