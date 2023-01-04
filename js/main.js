    const elInput =document.querySelector(".js-input")
const elList = document.querySelector(".js-list")
const elForm = document.querySelector(".js-form");
const elBtns = document.querySelector(".js-btns");
const elBtnPrav = document.querySelector(".btn-prev");
const elBtnNext = document.querySelector(".btn-next");


const key = "14605c6a";

const renderFilms = (array, node) => {
  node.innerHTML = "";

  array.forEach((film) => {
    const newItem = document.createElement("li");
    const newImg = document.createElement("img");
    const newTitle = document.createElement("h4");

    newItem.setAttribute(
      "class",
      "col-12 col-md-4 col-lg-2 rounded m-0 p-0 "
    );

    newImg.setAttribute("class", "rounded-top img-fluid");
    newTitle.setAttribute("class", "h4 my-3 ms-3 text-dark");

    newImg.src = film.Poster;
    newImg.setAttribute("width", "100%");
    newTitle.textContent = film.Title;

    newItem.appendChild(newImg);
    newItem.appendChild(newTitle);
    node.appendChild(newItem);
  });
};
let activePage =1

elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  if (elInput.value !== "") {
 fetchFunc()
  }
});

elBtns.addEventListener("click",(evt)=>{
if(evt.target.matches(".btn-prev")){
  if (activePage > 1) {
    
    activePage --
    console.log(activePage);
    fetchFunc()
  }
}
if(evt.target.matches(".btn-next")){
  activePage ++
  console.log(activePage);
  fetchFunc()      
}
})
function fetchFunc() {
  if (activePage == 1) {
    elBtnPrav.setAttribute("disabled","true")
  }else{
    elBtnPrav.removeAttribute("disabled")
  }

  fetch(`https://www.omdbapi.com/?apikey=${key}&s=${elInput.value}&page=${activePage}`)
  .then((response) => response.json())
  .then((data) => {
    if (data.Search) {
      console.log(data.Search);
      renderFilms(data.Search, elList);
      // elInput.value = "";
    } else {
      elList.innerHTML = `<h4 class="my-5 text-center text-danger">Film toplmadi ☹🧐</h4>`;
      // elInput.value = "";
    }
    if(activePage == Math.ceil(data.totalResults / 10)){
elBtnNext.setAttribute("disabled",true)
    }else{
      elBtnNext.removeAttribute("disabled")
    }
  });
}





  

