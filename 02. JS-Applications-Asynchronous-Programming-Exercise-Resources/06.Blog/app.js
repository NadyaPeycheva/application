function attachEvents() {
document.getElementById('btnLoadPosts').addEventListener('click', getAllPosts);
document.getElementById('btnViewPost').addEventListener('click', displayPost);


}

attachEvents();

async function displayPost(){
    let selectedId= document.getElementById('posts').value;

    let post=await getPostById(selectedId);
    let comments = await getCommentsByPostId(selectedId);

    document.getElementById('post-title').textContent=post.title;
    document.getElementById('post-body').textContent=post.body;
    
    let ulElements=document.getElementById('post-comments');
    ulElements.replaceChildren();

    comments.forEach(c=>{
        let liElements=document.createElement('li');
        liElements.textContent = c.text;

        ulElements.appendChild(liElements);
    })

}
async function getAllPosts(){
    let url="http://localhost:3030/jsonstore/blog/posts";

    let response= await fetch(url);
    let date = await response.json();

    let selectElement=document.getElementById('posts');
    selectElement.replaceChildren();
    Object.values(date).forEach(post=>{
        let newOption=document.createElement('option');
        newOption.value=post.id;
        newOption.textContent=post.title;

        selectElement.appendChild(newOption);
    })
}
async function getPostById(postId){
    let url=`http://localhost:3030/jsonstore/blog/posts/${postId}`;

    let response= await fetch(url);
    let date = await response.json();

    return date;

}

async function getCommentsByPostId(postId){
    let url="http://localhost:3030/jsonstore/blog/comments"

    let response= await fetch(url);
    let date = await response.json();

    let comments=Object.values(date).filter(p=>p.postId===postId);
    return comments;
}