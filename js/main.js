

    const elInput =document.querySelector(".js-input")
const elList = document.querySelector(".js-list")
const elForm = document.querySelector(".js-form");


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

elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  if (elInput.value !== "") {
    fetch(`http://www.omdbapi.com/?apikey=${key}&s=${elInput.value}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.Search) {
        //   console.log(data.Search);
          renderFilms(data.Search, elList);
          elInput.value = "";
        } else {
          elList.innerHTML = `<h4 class="my-5 text-center text-danger">Film toplmadi ☹🧐</h4>`;
          elInput.value = "";
        }
      });
  }
});


