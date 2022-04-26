/* jshint esversion: 6 */

window.Test = (function () {
  "use strict";

  let currentTest = 1,
    partialScore = 0,
    totalScore = 0,
    tools = window.Tools;

  function reset() {
    tools.reset();
    partialScore = 0;
    startCurrentTest();
  }

  function startCurrentTest() {
    let test = "Test" + window.Test.currentTest.toString();
    window[test].startTest();
  }

  return {
    partialScore: partialScore,
    totalScore: totalScore,
    currentTest: currentTest,
    reset: reset,
    startNextTest: startCurrentTest,
  };
})();
