/*jshint curly:true, eqeqeq:true, immed:true, latedef:true,
  newcap:true, noarg:true, sub:true, undef:true, boss:true,
  strict:false, eqnull:true, browser:true, node:true */
/*global buster, assert, provide, define */

buster.testCase("LilProvider", {

  "should require via provide": function () {

    var testA = { test: 'A' };
    var testB = { test: 'B' };

    provide('testA', testA);
    provide('testB', testB);

    assert.equals(require(null, 'testA'), testA);
    assert.equals(require('testB'), testB);

  },

  "should require via provde definition": function () {

    define('adder', function (require, module, exports) {
      var hat = require('./packTest/packB/packC/packD/modD');
      module.exports = function (a, b) { return a + b + hat.hat; };
    });

    define('packTest/packB/packC/packD/modD', function(require, module, exports) {
      exports.hat = 'hat';
    });

    define('packTest/packB/modB1', function (require, module, exports) {
      module.exports = function () { return 'B'; };
    });

    define('packTest/packB/modB', function (require, module, exports) {
      var b1 = require('./modB1');
      module.exports = { name: b1() };
    });

    define('packTest/packA/modA', function (require, module, exports) {
      var adder = require('../../adder');
      var b = require('../packB/modB');
      var b1 = require('../packB/modB1');
      exports.name = 'A';
      exports.buddy = adder(b.name, b1());
    });

    var a = require('packTest/packA/modA');
    assert.equals(a, { name: 'A', buddy: 'BBhat' });

  }

});