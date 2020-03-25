var link = document.querySelector(".letter-link");

var popup = document.querySelector(".modal");

link.addEventListener("click", function (evt) {
  evt.preventDefault();
  popup.classList.add("modal-show");
});
