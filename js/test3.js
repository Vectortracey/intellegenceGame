/* jshint esversion: 6 */
/*tslint:disabled*/

window.Test3 = (function () {
  "use strict";

  let tools = window.Tools,
    content = document.getElementById("content"),
    flagCounter = 0,
    firstRun = true,
    timeouts = [],
    guessOrder = [
      "Denmark",
      "Finland",
      "Russia",
      "Sweden",
      "Russia",
      "Finland",
      "Denmark",
      "Russia",
      "Sweden",
    ],
    uniqueCountryNames = ["Sweden", "Denmark", "Finland", "Russia"],
    nineFlagNames = [
      "Russia",
      "Sweden",
      "Sweden",
      "Denmark",
      "Russia",
      "Finland",
      "Finland",
      "Denmark",
      "Russia",
    ],
    flagDivs = [
      '<div class="swe-horizontal" ></div><div class="swe-vertical"></div>',
      '<div class="den-horizontal" ></div><div class="den-vertical"></div>',
      `<div class="fin-horizontal" ></div><div class="fin-vertical"></div>`,
      `<div class="russia-midle-stripe"></div><div class="russia-bottom-stripe"></div>`,
    ];

  let flagObj = {
    country: NaN,
    id: NaN,
    flagHtml: NaN,
    flagDiv: NaN,
    hiddenDiv: '<div class="hidden-flag"></div>',
    flagDivHandle: NaN,

    countryFlagHtmlToElement: function (flagHtml) {
      let div = document.createElement("div");

      div.id = "flag-" + this.id;
      div.className = "flag-75x50 " + this.country.toLowerCase();
      div.innerHTML = flagHtml;
      return div;
    },

    init: function (country, flagDiv, id) {
      this.country = country;
      this.flagDiv = flagDiv;
      this.id = id;
      this.flagHtml = this.countryFlagHtmlToElement(flagDiv);
    },

    drawFlag: function (rootDivHandle) {
      rootDivHandle.appendChild(this.flagHtml);
      this.addDelayedEventListener();
    },

    resetFlag: function () {
      this.flagHtml = this.countryFlagHtmlToElement(this.flagDiv);
    },

    hideFlag: function () {
      this.flagHandle = document.getElementById("flag-" + this.id);

      this.flagHandle.innerHTML = this.hiddenDiv;
    },

    addDelayedEventListener: function () {
      let thatId = this.id,
        thatFlagDiv = this.flagDiv,
        thatCountry = this.country,
        timerId;

      timerId = setTimeout(function () {
        let flagHandle = document.getElementById("flag-" + thatId);

        flagHandle.addEventListener("click", function () {
          flagHandle.innerHTML = thatFlagDiv;
          checkOrder(thatCountry);
        });
      }, 5000);
      timeouts.push(timerId);
    },
  };

  let flagObjects = [];

  for (let ix = 0; ix < nineFlagNames.length; ix += 1) {
    let flagIx = uniqueCountryNames.indexOf(nineFlagNames[ix]);

    flagObjects[ix] = Object.create(flagObj);
    flagObjects[ix].init(uniqueCountryNames[flagIx], flagDivs[flagIx], ix);
  }

  function showResult(isLast) {
    let pContent = "",
      h1 = "Minnestestet är slut!";

    if (isLast) {
      h1 = "Grattis till samtliga rätt!";
    }
    tools.cleanContent();
    pContent = "Antal poäng: " + window.Test.partialScore;
    tools.createHeader(h1, pContent);
    tools.addButton(window.Result.showResult, "Visa resultat");
  }

  function checkOrder(country) {
    if (country === guessOrder[flagCounter]) {
      flagCounter += 1;
      window.Test.partialScore += 1;
      if (flagCounter === guessOrder.length) {
        showResult(true);
      }
    } else {
      showResult(false);
    }
  }

  function drawAllFlags() {
    let flagsContainerDiv = document.createElement("div");

    flagsContainerDiv.className = "flags-container ";
    content.appendChild(flagsContainerDiv);
    flagObjects.forEach((flag) => {
      flag.drawFlag(flagsContainerDiv);
    });
  }

  function hideFlags() {
    let timerId;

    timerId = setTimeout(function () {
      flagObjects.forEach((flag) => {
        flag.hideFlag();
      });
    }, 5000);
    timeouts.push(timerId);
  }

  function showGuessOrder() {
    let timerId;

    timerId = setTimeout(function () {
      let ol = document.createElement("div");
      ol.className = "flaglist";

      ol.innerText = "Klickorder:";
      guessOrder.forEach(function (element, ix) {
        let li = document.createElement("li");

        li.innerText = guessOrder[ix];
        ol.appendChild(li);
      });
      content.appendChild(ol);
    }, 5000);
    timeouts.push(timerId);
  }

  function memoryTest() {
    tools.cleanContent();
    tools.createHeader("Gissa flaggornas ordning", " ");
    drawAllFlags();
    hideFlags();
    showGuessOrder();
  }

  function startTest() {
    let h1 = "Minne",
      pContent = `Detta är ett minnestest som kommer att presentera olika flaggor, ditt uppdrag är att komma ihåg sekvensen av dessa flaggor och välja rätt ordning, tryck på start när du är redo.`;

    tools.cleanContent();
    flagCounter = 0;

    if (firstRun) {
      window.Test.totalScore += window.Test.partialScore;
      window.Test.currentTest = 3;
      firstRun = false;
    } else {
      for (let i = 0; i < timeouts.length; i++) {
        clearTimeout(timeouts[i]);
      }
      timeouts = [];
      flagObjects.forEach((flag) => {
        flag.resetFlag();
      });
    }
    console.log("score: " + window.Test.totalScore);
    window.Test.partialScore = 0;
    tools.createHeader(h1, pContent);

    tools.addButton(memoryTest, "Starta");
  }

  return {
    startTest: startTest,
  };
})();
