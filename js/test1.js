/* jshint esversion: 6 */

window.Test1 = (function () {
  "use strict";

  let tools = window.Tools,
    currentQuestion = 0,
    content = document.getElementById("content"),
    test1Questions = [
      "I vilken enhet beräknas bredbandshastighet?",
      "Vart härstammar kaffebönan ifrån?",
      "Hur lång tid tar det för månen att rotera runt jorden?",
      "Hur många ton krill om dagen äter en blåval?",
      "Vilken smältpunkt har järn?",
    ],
    test1Alternativs = [
      ["Mbit/s", "Kbytes/s", "Datagram/s"],
      ["Afrika", "Asien", "Sydamerika"],
      ["27 dagar", "28 dagar", "30 dagar"],
      ["10 ton", "16 ton", "19 ton"],
      ["1238°C", "1445°C", "1538°C"],
    ],
    test1Answers = [0, 0, 0, 1, 2];

  function askNextQuestion() {
    askQuestion(currentQuestion);
  }

  function showResult(isCorrect) {
    let pContent =
        test1Alternativs[currentQuestion][test1Answers[currentQuestion]],
      h1 = " ";

    console.log("CorrectAnswer:" + isCorrect);
    tools.cleanContent();
    if (isCorrect) {
      h1 = "Rätt svar!";
      window.Test.partialScore += 3;
    } else {
      h1 = "Fel svar!";
      pContent = "Det rätta svaret är: " + pContent;
    }
    tools.createHeader(h1, pContent);
    if (currentQuestion < test1Answers.length - 1) {
      currentQuestion += 1;
      tools.addButton(askNextQuestion, "Nästa fråga");
    } else {
      tools.addButton(window.Test2.startTest, "Nästa test");
    }
  }

  function createQuestion(questionNr) {
    let questionDiv = document.createElement("div"),
      altDivContainer = document.createElement("div"),
      title = "Fråga " + (questionNr + 1);

    tools.createHeader(title, " ");

    questionDiv.textContent = test1Questions[questionNr];
    content.appendChild(questionDiv);
    questionDiv.classList.add("question");

    test1Alternativs[questionNr].forEach(function (element, index) {
      let altDiv = document.createElement("div");

      altDiv.classList.add("alternative-answer");
      altDiv.innerText = element;
      altDiv.addEventListener("click", function () {
        if (index === test1Answers[questionNr]) {
          showResult(true);
        } else {
          showResult(false);
        }
      });
      altDivContainer.appendChild(altDiv);
    });
    content.appendChild(altDivContainer);
  }

  function askQuestion(questionNr) {
    tools.cleanContent();
    createQuestion(questionNr);
  }

  function start() {
    askQuestion(0);
  }

  function startTest() {
    let h1 = "Tipspromenad",
      pContent = `Du kommer få svara på 5 frågor med 3 olika svar, endast ett svar är korrekt och ger dig 3 poäng, felaktigt svar ger dig 0 poäng, tryck på start när du är redo.`;

    currentQuestion = 0;
    tools.createHeader(h1, pContent);

    tools.addButton(start, "Starta");
  }

  return {
    startTest: startTest,
  };
})();
