/* jshint esversion: 6 */

(function () {
    'use strict';

    let h1 = "Intelligenstest",
        pContent = ` Detta är ett test med 3 olika deltester, varje rätt svar ger 3 poäng, varje felaktigt svar ger 0 poäng, när du är redo tryck start.`,
        test = window.Test,
        tools = window.Tools;

    function startTest() {
        tools.cleanContent();
        test.startNextTest();
    }

    tools.createHeader(h1, pContent);

    tools.addButton(startTest, "Starta");
})();
