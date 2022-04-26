/* jshint esversion: 6 */
window.Result = (function () {
  "use strict";
  function showResult() {
    let pContent,
      h1 = "Sammanfattning av resultaten",
      tools = window.Tools;

    window.Test.totalScore += window.Test.partialScore;
    pContent =
      "Dina poäng: " + window.Test.totalScore + " av maximalt 47 poäng";

    tools.cleanContent();
    tools.createHeader(h1, pContent);
    tools.addButton(restart, "start om");

    function restart() {
      location.reload();
    }
  }

  return {
    showResult: showResult,
  };
})();
