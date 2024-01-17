let list = document.getElementById("posts");
let loading = document.getElementById("loading")
let input = document.getElementById("filterInput")

let listArray = [];
const limit = 5;
let page = 1;

function updateList(){
    fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`)
    .then((res) => res.json())
    .then((data) => {
        data.map((data) => {
            updateDom(data)
        })
    })
    .catch((error) => console.log(error))
}

function updateDom(data){
    const liTag = document.createElement("li");
    liTag.classList.add("post");
    liTag.innerHTML = `<span>${data.id}</span><h2 class="post-title">${data.title}</h2><p class="post-desc">${data.body}</p>`;
    list.appendChild(liTag)
}

function showLoading(){
    loading.classList.add("show")
    setTimeout(function(){
        loading.classList.remove("show")

        setTimeout(function(){
            updateList();
        }, 300)

    }, 1000)
}

function filter(text){
    let listItem = document.querySelectorAll("li")
    listItem.forEach((item) => {
        if(!item.textContent.includes(text)){
            item.style.display = "none";
        }
        else{
            item.style.display = "block";
        }
    })
}

window.addEventListener('scroll', function(){
    const {scrollHeight, scrollTop, clientHeight} = document.documentElement;
    //console.log(clientHeight, scrollTop, scrollHeight)
    if(clientHeight + scrollTop >= scrollHeight - 1){
        page += 1;
        showLoading();
    }
})

input.addEventListener('change', function(e){
    filter(e.target.value)
})

showLoading();