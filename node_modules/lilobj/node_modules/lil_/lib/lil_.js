/*jshint curly:true, eqeqeq:true, immed:true, latedef:true,
  newcap:true, noarg:true, sub:true, undef:true, boss:true,
  strict:false, eqnull:true, browser:true, node:true */

module.exports = {

  typeOf: function (x) {

    var type = typeof x;

    if (type === 'object') {
      type = Array.isArray(x) ? 'array' : type;
      type = x === null ? 'null' : type;
    }

    return type;

  },

  each: function (thing, func, ctx) {

    var type = this.typeOf(thing);
    var keys;

    if (type === 'array' && thing.length) {

      thing.forEach(func, ctx);

    } else if (type === 'object') {

      keys = thing ? Object.keys(thing) : [];

      keys.forEach(function (name, i) {
        func.call(ctx, name, thing[name], i);
      });

    }

  },

  every: function (thing, func, ctx) {

    var type = this.typeOf(thing);
    var keys;

    if (type === 'array' && thing.length) {

      return thing.every(func, ctx);

    } else if (type === 'object') {

      keys = thing ? Object.keys(thing) : [];

      return keys.every(function (name, i) {
        return func.call(ctx, name, thing[name], i);
      });

    }

    return false;

  },

  some: function (thing, func, ctx) {

    var type = this.typeOf(thing);
    var keys;

    if (type === 'array' && thing.length) {

      return thing.some(func, ctx);

    } else if (type === 'object') {

      keys = thing ? Object.keys(thing) : [];

      return keys.some(function (name, i) {
        return func.call(ctx, name, thing[name], i);
      });

    }

    return false;

  },

  map: function (thing, func, ctx) {

    var type = this.typeOf(thing);
    var result = [];

    if (type === 'array' && thing.length) {

      return thing.map(func, ctx);

    } else if (type === 'object') {

      result = {};

      this.each(thing, function (name, obj, i) {
        result[name] = func.call(this, name, obj, i);
      }, ctx);

    }

    return result;

  },

  withOut: function (arr, value) {

    var result = [];

    this.each(arr, function (element) {

      if (element !== value) {
        result.push(element);
      }

    });

    return result;

  },

  walk: function (target, source, func, fill) {
 
    var self = this;
 
    var walkObj = function (target, source) {
 
      self.each(source, function (name, obj) {
        step(target[name], obj, name, target);
      });
 
    };
 
    var step = function (target, source, name, parent) {
 
      var type = self.typeOf(source);
 
      if (type === 'object') {
 
        if (!target && parent && fill) {
          target = parent[name] = {};
        }
        
        walkObj(target, source);
 
      } else {
        func.call(parent, target, source, name);
      }
 
    };
 
    step(target, source);
 
  },

  extend: function () {

    var args = Array.prototype.slice.call(arguments);
    var target = args.shift();

    this.each(args, function (src) {

      this.each(src, function (name, value) {
        target[name] = value;
      });

    }, this);

    return target;

  },

  defaults: function (target, defaults) {

    this.each(defaults, function (name, value) {

      var type = this.typeOf(target[name]);
      if (type === 'undefined' || type === 'null') {
        target[name] = value;
      }

    }, this);

    return target;

  },

  match: function (obj, test) {

    var isMatch = true;

    this.walk(obj, test, function (target, src) {
      isMatch = (target === src);
    });

    return isMatch;

  },

  pick: function(obj, keys) {

    var picked = {};
    keys = this.typeOf(keys) === 'array' ? keys : Object.keys(keys);

    this.each(keys, function (key) {
      picked[key] = obj && obj[key];
    });

    return picked;

  }

};