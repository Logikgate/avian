"use strict";

exports.__esModule = true;

describe("Avian Distribution Files", function() {
    var avian;
    beforeEach(function() {
        avian.cli("./dist/avian.cli.js");
        avian.lib("./dist/avian.lib.js");
    });
    it("Checks to see if all distribution files have been built.", function() {});
});