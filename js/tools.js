/* jshint esversion: 6 */

window.Tools = (function () {
  "use strict";

  let header = document.getElementById("header"),
    content = document.getElementById("content"),
    fizzBuzzAnswers = ["fizz", "buzz", "fizz buzz"];

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  function createHeader(h1, content) {
    let headerH1 = document.createElement("h1"),
      headerP = document.createElement("p");

    headerH1.textContent = h1;
    headerP.textContent = content;
    headerH1.classList.add("header-h1");
    headerP.classList.add("header-p");

    header.appendChild(headerH1);
    header.appendChild(headerP);
  }

  function cleanContent() {
    header.innerHTML = "";
    content.innerHTML = "";
  }

  function reset() {
    cleanContent();
  }

  function addButton(eventListnerFunction, buttonText) {
    let button = document.createElement("button"),
      header = document.getElementById("header");

    button.textContent = buttonText;
    button.addEventListener("click", eventListnerFunction);
    header.appendChild(button);
  }

  function getFizzBuzz(number) {
    let fizzBuzz = false,
      answer = "";

    if (number % 3 === 0) {
      answer = "fizz";
      fizzBuzz = true;
    }
    if (number % 5 === 0) {
      if (fizzBuzz) {
        answer += " ";
      }
      answer += "buzz";
      fizzBuzz = true;
    }
    if (!fizzBuzz) {
      answer = number.toString();
    }
    return answer;
  }

  return {
    getRandomInt: getRandomInt,
    createHeader: createHeader,
    cleanContent: cleanContent,
    addButton: addButton,
    fizzBuzzAnswers: fizzBuzzAnswers,
    getFizzBuzz: getFizzBuzz,
    reset: reset,
  };
})();
