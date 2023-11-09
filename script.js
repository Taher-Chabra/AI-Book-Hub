const moveBook = document.querySelector(".book");
const flipCover = document.querySelector(".front-cover");
const pages = document.querySelectorAll(".page");
const cover = document.getElementById('cover');
const next = document.querySelector('.nxt-pg')
let openCover = 0;

//Moving the book and opening the fornt cover

moveBook.addEventListener('click', function(){
  if (!openCover) {
    moveBook.classList.add('move-book');
    flipCover.classList.add('flipped');
    pages[0].classList.add('flipped');
  }
  openCover = 1;

  setTimeout(function() {
    pages[0].style.zIndex = "2";
    cover.style.display = "none";
  }, 340);
});

//Flipping the first page when 'Next' button is clicked

next.addEventListener('click', function(){
  pages[0].style.zIndex--;
  pages[1].style.zIndex = '2';
  pages[2].style.zIndex = '2';
  pages[1].classList.add('flipped');
  pages[2].classList.add('flipped');
  pages[1].classList.remove('piled');
  pages[3].style.display = "block";

  setTimeout(function() {
    pages[1].innerHTML = pages[2].innerHTML;
  }, 450);

  setTimeout(function() {
    pages[1].style.display = "none";
    pages[2].style.display = "block";
  }, 1000);
});

//Custom validation of input fields

const validInputs = document.querySelectorAll('form .form-control');
console.log(validInputs)

function validate() {
  validInputs.forEach(input => {
    if (input.value) {
      input.classList.add("is-valid");
      input.classList.remove("is-invalid");
    } else {
      input.classList.remove("is-valid");
      input.classList.add("is-invalid");
    }
  });
}

//Flipping to result page only after receiving inputs

const pageNext = document.getElementById('submit-inputs');

pageNext.addEventListener('click', function() {
  setTimeout(() => {
    if (Array.from(validInputs).every(input => input.classList.contains('is-valid'))) {
      pages[3].style.zIndex = '2';
      pages[4].style.zIndex = '2';
      pages[3].classList.add('flipped');
      pages[4].classList.add('flipped');
      pages[3].classList.remove('piled');
      pages[5].style.display = "block";

      setTimeout(function() {
        pages[3].innerHTML = pages[4].innerHTML;
      }, 450);

      setTimeout(function() {
        pages[3].style.display = "none";
        pages[4].style.display = "block";
      }, 1000);
    }
  }, 1000);
});

// Re-starting the page at the end

const reloadBtn = document.getElementById('reload');

reloadBtn.addEventListener('click', function() {
  location.reload();
});












