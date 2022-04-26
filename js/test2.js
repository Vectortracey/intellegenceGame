/* jshint esversion: 6 */

window.Test2 = (function () {
  "use strict";

  let tools = window.Tools,
    startNumber = 0,
    correctAnswer = "",
    sequence = 10,
    firstRun = true,
    content = document.getElementById("content");

  function showResult(isCorrect) {
    let pContent = correctAnswer,
      h1 = " ";

    tools.cleanContent();
    if (isCorrect) {
      h1 = "Rätt svar!";
      window.partialScore += 3;
    } else {
      h1 = "Fel svar!";
      pContent = "Det rätta svaret är: " + correctAnswer;
    }
    tools.createHeader(h1, pContent);
    tools.addButton(window.Test3.startTest, "Nästa test");
  }

  function generateFizzBuzz() {
    let fizzBuzzSeq = "Fizz-buzz sekvens: ",
      questionDiv = document.createElement("div"),
      altDivContainer = document.createElement("div"),
      title = "Vad är fizz-buzz svaret? ",
      test2Alternatives = [...tools.fizzBuzzAnswers],
      lastSeqNr = 0;

    tools.cleanContent();
    tools.createHeader(title, " ");
    fizzBuzzSeq += tools.getFizzBuzz(startNumber);
    for (let ix = startNumber + 1; ix < startNumber + sequence; ix += 1) {
      fizzBuzzSeq += ", " + tools.getFizzBuzz(ix);
    }
    lastSeqNr = startNumber + sequence;
    correctAnswer = tools.getFizzBuzz(lastSeqNr);

    questionDiv.classList.add("question");
    questionDiv.textContent = fizzBuzzSeq;
    content.appendChild(questionDiv);

    test2Alternatives.unshift(lastSeqNr.toString());
    test2Alternatives.forEach((element) => {
      let altDiv = document.createElement("div");

      altDiv.classList.add("alternative-answer");
      altDiv.innerText = element;
      altDiv.addEventListener("click", function () {
        if (element === correctAnswer) {
          showResult(true);
        } else {
          showResult(false);
        }
      });
      altDivContainer.appendChild(altDiv);
    });
    content.appendChild(altDivContainer);
  }

  function startTest() {
    let h1 = "Fizz Buzz",
      pContent = `Du kommer få en sekvens från spelet Fizz Buzz med 3 olika svarsalternativ.
            När du är redo tryck start.`;

    tools.cleanContent();

    if (firstRun) {
      window.Test.totalScore += window.Test.partialScore;
      window.Test.currentTest = 2;
      firstRun = false;
    }
    console.log("score: " + window.Test.totalScore);
    window.Test.partialScore = 0;
    startNumber = tools.getRandomInt(20, 100);
    tools.createHeader(h1, pContent);

    tools.addButton(generateFizzBuzz, "Starta");
  }

  return {
    startTest: startTest,
  };
})();
