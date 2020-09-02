function nodySuccess(data){
    new Noty({
        theme: 'relax',
        text:  data.message,
        type: 'success',
        layout: 'topRight',
        timeout: 1500
    }).show();
}
function nodyError(data){
    new Noty({
        theme: 'relax',
        text: data.ErrorMessage,
        type: 'error',
        layout: 'topRight',
        timeout: 1500
    }).show();
}
{
    let postForm = $('#newPostForm');
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
                    postForm[0][0].value = ''
                    // Including noty
                    nodySuccess(data);
                    destroyPost($(' .delete-post-button', newPost));//Delete the post created using ajax
                    createComment(data.data.post._id);
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
            <br>
            <span>0 Likes</span>
            <a href="/likes/toggle/?id=${post._id}&type=Post">Like</a>
        </p>
        <div class="post-comments">
            <form id="comment-${post._id}" action="/comments/create" method="POST">
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
                    nodySuccess(data);
                }, error: function(err){
                    console.log("Error Occured while deleting the post", err);
                }
            })
        })
    }
    destroy();
};


    /* Comment creating section using AJAX and JQUERY */
{
    let allPosts = $('.postDescriber');
    for(let i of allPosts){
        createComment($(i).prop('value'))
    }

    function createComment(postID){
        let commentForms = $(`#comment-${postID}`);
        commentForms.submit(function(e){
            e.preventDefault();
            $.ajax({
                type: "POST",
                url: '/comments/create',
                data: commentForms.serialize(),
                success: function(data){
                    let newComment = showComment(data.data.comment);
                    $(`#post-comment-${postID}`).prepend(newComment);
                    nodySuccess(data);
                },
                error: function(err){
                    console.log('Error occured while creating the comment')
                }
            })
        })
    }

    let showComment = function(comment){
        return $(`<li>
        <p> 
            <small>
                <a href="/comments/destroy/?id=${comment._id}&userID=${comment.post}">X</a>
            </small>
            ${comment.content}
            <br>
            <small>
                ${comment.user.name}
            </small>
            <br>
            <span>0 Likes</span>
            <a href="/likes/toggle/?id=${comment._id}&type=Post">Like</a>
        </p>
    </li>`)
    }
}