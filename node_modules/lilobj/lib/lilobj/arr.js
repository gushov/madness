/*jshint curly:true, eqeqeq:true, immed:true, latedef:true,
  newcap:true, noarg:true, sub:true, undef:true, boss:true,
  strict:false, eqnull:true, browser:true, node:true,
  proto:true */

var _ = require('lil_');

function Arr() {

  var arr = [];
  arr.push.apply(arr, arguments);
  arr.__proto__ = Arr.prototype;

  return arr;

}

Arr.prototype = [];

Arr.prototype.isA = function (prototype) {

  function D() {}
  D.prototype = prototype;
  return this instanceof D;

};

Arr.prototype.extend = function (props) {

    Arr.prototype = this;
    var child = new Arr();

    _.each(props, function (name) {
      child[name] = props[name];
    });

    return child;
};

Arr.prototype.create = function () {

    Arr.prototype = this;
    var child = new Arr();

    if (child.construct !== undefined) {
      child.construct.apply(child, arguments);
    }

    return child;
};

module.exports = new Arr();
