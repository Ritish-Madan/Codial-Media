function nodySuccess(e){new Noty({theme:"relax",text:e.message,type:"success",layout:"topRight",timeout:1500}).show()}function nodyError(e){new Noty({theme:"relax",text:e.ErrorMessage,type:"error",layout:"topRight",timeout:1500}).show()}{$("#newPostForm");function createPost(){let n=$("#newPostForm");n.submit((function(o){o.preventDefault(),$.ajax({type:"post",url:"/posts/create",data:n.serialize(),success:function(o){let s=e(o.data.post);$("#show-posts>ul").prepend(s),n[0][0].value="",nodySuccess(o),t($(" .delete-post-button",s)),createComment(o.data.post._id)},error:function(e){console.log("Error occured while sending data",e)}})}))}let e=function(e){return $(`<li id='post-${e._id}'> \n        <p>\n            <small>\n                 <a class="delete-post-button" href="/posts/destroy/${e._id}">X</a>\n            </small>\n            ${e.content}\n            <br>\n            <small>\n            ${e.user.name}\n            </small>\n            <br>\n            <span>0 Likes</span>\n            <a href="/likes/toggle/?id=${e._id}&type=Post">Like</a>\n        </p>\n        <div class="post-comments">\n            <form id="comment-${e._id}" action="/comments/create" method="POST">\n                <input type="text" name="content" placeholder="Type here to add Comment..." required>\n                <input type="hidden" name="post" value="${e._id}">\n                <input type="submit" value="Add Comment">\n            </form>\n            <div class="post-comment-list">\n                <ul id="post-comment-${e._id}">\n                </ul>\n            </div>\n        </div>\n    </li>`)};function destroy(){let e=$(".delete-post-button");for(let n of e)t(n)}createPost();let t=function(e){$(e).click((function(t){t.preventDefault(),$.ajax({type:"get",url:$(e).prop("href"),success:function(e){$("#post-"+e.data.post_id).remove(),nodySuccess(e)},error:function(e){console.log("Error Occured while deleting the post",e)}})}))};destroy()}{let e=$(".postDescriber");for(let t of e)createComment($(t).prop("value"));function createComment(e){let n=$("#comment-"+e);n.submit((function(o){o.preventDefault(),$.ajax({type:"POST",url:"/comments/create",data:n.serialize(),success:function(n){let o=t(n.data.comment);$("#post-comment-"+e).prepend(o),nodySuccess(n)},error:function(e){console.log("Error occured while creating the comment")}})}))}let t=function(e){return $(`<li>\n        <p> \n            <small>\n                <a href="/comments/destroy/?id=${e._id}&userID=${e.post}">X</a>\n            </small>\n            ${e.content}\n            <br>\n            <small>\n                ${e.user.name}\n            </small>\n            <br>\n            <span>0 Likes</span>\n            <a href="/likes/toggle/?id=${e._id}&type=Post">Like</a>\n        </p>\n    </li>`)}}