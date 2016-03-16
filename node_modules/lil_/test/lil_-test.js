/*jshint curly:true, eqeqeq:true, immed:true, latedef:true,
  newcap:true, noarg:true, sub:true, undef:true, boss:true,
  strict:false, eqnull:true, browser:true, node:true */
/*global assert, refute */

var buster = typeof buster !== 'undefined' ? buster : require("buster");
var _ = typeof module !== 'undefined' ? require('../lib/lil_') : require('lil_');

buster.testCase("lil_", {

  "should return type as a string": function () {

    assert.equals(_.typeOf(''), 'string');
    assert.equals(_.typeOf(false), 'boolean');
    assert.equals(_.typeOf(0), 'number');
    assert.equals(_.typeOf([]), 'array');
    assert.equals(_.typeOf({}), 'object');
    assert.equals(_.typeOf(null), 'null');
    assert.equals(_.typeOf(undefined), 'undefined');

  },

  "should iterate each array element": function () {

    var cbSpy = this.spy();
    var testArray = [1, 2, 3, 4, 5];

    _.each(testArray, cbSpy);

    assert.equals(cbSpy.callCount, 5);
    assert.calledWith(cbSpy, 1);
    assert.calledWith(cbSpy, 2);
    assert.calledWith(cbSpy, 3);
    assert.calledWith(cbSpy, 4);
    assert.calledWith(cbSpy, 5);

  },

  "should iterate array until false is returned": function () {

    var testArray = [true, true, false, true, true];
    var testArray2 = [true, true, true, true];
    var cbStub = this.stub();
    cbStub.returnsArg(0);

    refute(_.every(testArray, cbStub));
    assert.equals(cbStub.callCount, 3);

    assert(_.every(testArray2, cbStub));
    assert.equals(cbStub.callCount, 7);

  },

  "should iterate object until false is returned": function () {

    var testObj = { a: true, b: true, c: false, d: true, e: true };
    var testObj2 = { a: true, b: true, c: true, d: true };
    var cbStub = this.stub();
    cbStub.returnsArg(1);

    refute(_.every(testObj, cbStub));
    assert.equals(cbStub.callCount, 3);

    assert(_.every(testObj2, cbStub));
    assert.equals(cbStub.callCount, 7);

  },

  "should iterate array until true is returned": function () {

    var testArray = [false, false, false, true, false];
    var testArray2 = [false, false, false, false];
    var cbStub = this.stub();
    cbStub.returnsArg(0);

    assert(_.some(testArray, cbStub));
    assert.equals(cbStub.callCount, 4);

    refute(_.some(testArray2, cbStub));
    assert.equals(cbStub.callCount, 8);

  },

  "should iterate object until true is returned": function () {

    var testObj = { a: false, b: false, c: false, d: true, e: false };
    var testObj2 = { a: false, b: false, c: false, d: false };
    var cbStub = this.stub();
    cbStub.returnsArg(1);

    assert(_.some(testObj, cbStub));
    assert.equals(cbStub.callCount, 4);

    refute(_.some(testObj2, cbStub));
    assert.equals(cbStub.callCount, 8);

  },
  "should map the given array": function () {

    var testArray = [1, 2, 3];
    var cbStub = this.stub();
    cbStub.returnsArg(0);

    assert.equals(_.map(testArray, cbStub), [1, 2, 3]);
    assert.calledThrice(cbStub);
    assert.calledWith(cbStub, 1);
    assert.calledWith(cbStub, 2);
    assert.calledWith(cbStub, 3);

  },

  "should interate each object property": function () {

    var cbSpy = this.spy();
    var testObj = {
      'butter': 1,
      'milk': 2,
      'cheese': 3
    };
    var ctx = {};

    _.each(testObj, cbSpy, ctx);

    assert.equals(cbSpy.callCount, 3);
    assert.calledWith(cbSpy, 'butter', 1, 0);
    assert.calledWith(cbSpy, 'milk', 2, 1);
    assert.calledWith(cbSpy, 'cheese', 3, 2);
    assert.equals(cbSpy.thisValues[0], ctx);

  },

  "should map the given object": function () {

    var testObj = {
      a:1,
      b:2,
      c:3
    };

    var cbStub = this.stub();
    cbStub.returnsArg(1);

    assert.equals(_.map(testObj, cbStub), { 'a':1, 'b':2, 'c':3 });
    assert.calledThrice(cbStub);
    assert.calledWith(cbStub, 'a');
    assert.calledWith(cbStub, 'b');
    assert.calledWith(cbStub, 'c');

  },


  "should return array withOut given values": function () {

    var testArray = [1, 1, 3, 4, 1, 5, 6, 1, 7, 1, 1];
    assert.equals(_.withOut(testArray, 1), [3, 4, 5, 6, 7]);

  },

  "should extend the values of an object": function () {

    var obj = {
      a: 'a',
      isTrue: true,
      str: 'what',
      def: 'def'
    };

    var src1 = {
      isTrue: false,
      num: 0,
      arr: [1, 2, 3],
      str: 'hello',
      sub: { yo: { its: "me" } },
      def: 'def1'
    };

    var src2 = {
      def: 'def2'

    };

    var src3 = {
      def: 'def3'
    };

    _.extend(obj, src1, src2, src3);
    assert.equals(obj, {
      a: 'a',
      isTrue: false,
      num: 0,
      arr: [1, 2, 3],
      str: 'hello',
      sub: { yo: { its: "me" } },
      def: 'def3'
    });

  },

  "should provide default values": function () {

    var recipe = {
      clams: 2,
      shrimps: 4,
      salt: '2tsp'
    };

    var defaults = {
      butter: '1tsp',
      salt: '1tsp',
      whiteWine: '1/2cup'
    };

    var r = _.defaults(recipe, defaults);
    assert.same(r, recipe);
    assert.equals(r.clams, 2);
    assert.equals(r.shrimps, 4);
    assert.equals(r.butter, '1tsp');
    assert.equals(r.salt, '2tsp');
    assert.equals(r.whiteWine, '1/2cup');

  },

  "should return only selected array keys": function () {

    var obj = {
      x: 'x',
      b: 'b',
      z: 'z',
      c: 'c',
      d: 'd'
    };
    var keys = ['a', 'b', 'c'];
    var result = _.pick(obj, keys);

    assert.equals(Object.keys(result).length, 3);
    refute.defined(result.a);
    assert.equals(result.b, 'b');
    assert.equals(result.c, 'c');

  },

  "should return only selected object keys": function () {

    var obj = {
      x: 'x',
      b: 'b',
      z: 'z',
      c: 'c',
      d: 'd'
    };

    var keys = {
      'a': null,
      'b': undefined,
      'c': false
    };

    var result = _.pick(obj, keys);

    assert.equals(Object.keys(result).length, 3);
    refute.defined(result.a);
    assert.equals(result.b, 'b');
    assert.equals(result.c, 'c');

  },

  "should walk objects properties": function () {

    var cbSpy = this.spy();

    var target = {
      a: 1,
      b: {
        b1: 'b1'
      },
      e: [1, 2]
    };

    var source = {
      a: 1,
      b: {
        b1: 'b1',
        b2: 'b2'
      },
      d: {
        d1: 'd1'
      },
      e: [1, 2]
    };

    _.walk(target, source, cbSpy, true);

    assert.equals(cbSpy.callCount, 5);
    assert(cbSpy.getCall(0).calledWith(1, 1, 'a'));
    assert(cbSpy.getCall(0).calledOn(target));
    assert(cbSpy.getCall(1).calledWith('b1', 'b1', 'b1'));
    assert(cbSpy.getCall(1).calledOn(target.b));
    assert(cbSpy.getCall(2).calledWith(undefined, 'b2', 'b2'));
    assert(cbSpy.getCall(2).calledOn(target.b));
    assert(cbSpy.getCall(3).calledWith(undefined, 'd1', 'd1'));
    assert(cbSpy.getCall(3).calledOn(target.d));
    assert(cbSpy.getCall(4).calledWith([1, 2], [1, 2], 'e'));
    assert(cbSpy.getCall(4).calledOn(target));

  },

  "should return true of test matches object": function () {

    var a1 = { a: 1 };
    var b1 = {};

    var a2 = { a: { b: { c: 1 } } };
    var b2 = { a: { b: { c: 1 } } };

    refute(_.match(b1, a1));
    assert(_.match(b2, a2));

  }

});
