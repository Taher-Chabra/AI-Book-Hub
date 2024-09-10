import { runPrompt } from "../utils/google-ai.js";

const book = document.querySelector(".book");
const flipCover = document.querySelector(".front-cover");
const pages = document.querySelectorAll(".page");
const cover = document.getElementById('cover');
const next = document.querySelector('.nxt-pg');
let promptResult = '';
let openCover = false;

//Moving the book and opening the fornt cover

function animate(element, duration) {
  document.querySelector(element).style.setProperty('animation', `animate 1s linear ${duration} forwards`);
}


function handleBook() {
  if (!openCover) {
    book.classList.add('move-book');
    flipCover.classList.add('flipped');
    pages[0].classList.add('flipped');
  }
  openCover = true;

  setTimeout(function() {
    pages[0].style.zIndex = "2";
    cover.style.display = "none";
    animate('#intro > h3', '0.8s')
    animate('#intro > #p1', '1.8s')
    animate('#intro > #p2', '2.3s')
    animate('#intro2 > #p1', '2.8s')
    animate('#intro2 > #p2', '3.3s')
    // animate('.nxt-pg', '3.8s')
  }, 450);
}

book.addEventListener('click', handleBook);

//Flipping the first page when 'Next' button is clicked

next.addEventListener('click', function(){
  book.removeEventListener('click', handleBook)
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

// Validating all User Inputs

const inputs = Array.from(document.querySelectorAll('form .form-control'));

function validateInputs() {
  inputs.forEach(input => {
    if (input.value) {
      input.classList.add("is-valid");
      input.classList.remove("is-invalid");
    } else {
      input.classList.remove("is-valid");
      input.classList.add("is-invalid");
    }
  });
}

//Flipping to result page after validating inputs

function validate() {
  validateInputs()
  const allInputsAreValid = true
  inputs.every(input => input.classList.contains('is-valid'))

  if (allInputsAreValid) {
    fetchResult()
    setTimeout(() => {
      pages[3].style.zIndex = '2';
      pages[4].style.zIndex = '2';
      pages[3].classList.add('flipped');
      pages[4].classList.add('flipped');
      pages[3].classList.remove('piled');
      pages[5].style.display = "block";

      setTimeout(() => {
        pages[3].innerHTML = " ";
      }, 470);
      setTimeout(() => {
        pages[4].style.display = "block";
      }, 1000);
    }, 500);
  } 
  else return 
}

async function fetchResult() {
  promptResult = await runPrompt(inputs)
  const cleanedResult = promptResult.replace(/\*\*/gm, '');
  
  setTimeout(() => {
    document.getElementById('search-result').innerHTML = cleanedResult;
    pages[3].innerHTML = pages[4].innerHTML;
  }, 450);

  console.log(cleanedResult)
}

const pageNext = document.getElementById('submit-inputs');
pageNext.addEventListener('click', validate);

// Re-starting the page at the end

const reloadBtn = document.getElementById('reload');

reloadBtn.addEventListener('click', function() {
  location.reload();
});