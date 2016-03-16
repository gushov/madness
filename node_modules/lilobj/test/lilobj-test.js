/*jshint curly:true, eqeqeq:true, immed:true, latedef:true,
  newcap:true, noarg:true, sub:true, undef:true, boss:true,
  strict:false, eqnull:true, browser:true, node:true */
/*global assert, refute */

var buster = typeof buster !== 'undefined' ? buster : require("buster");
var LilObj = typeof module !== 'undefined' ? require('../lib/lilobj') : require('lilobj');

buster.testCase("LilObj", {

    "should extend and create objects": function () {

      var Parent = LilObj.obj.extend({
        type: null,
        construct: function (name) {
          this.name = name;
        },
        hey: function () {
          return this.type + ' here';
        }
      });

      var Dad = Parent.extend({
        type: 'Dad'
      });

      var Mom = Parent.extend({
        type: 'Mom'
      });

      var jayz = Dad.create('jay-z');
      var gus = Dad.create('gus');
      var gaga = Mom.create('gaga');

      assert.equals(jayz.type, 'Dad');
      assert.equals(jayz.name, 'jay-z');
      assert.equals(jayz.hey(), 'Dad here');
      assert(jayz.isA(Dad));
      refute(jayz.isA(Mom));
      assert.equals(gus.type, 'Dad');
      assert.equals(gus.name, 'gus');
      assert.equals(gus.hey(), 'Dad here');
      assert(gus.isA(Dad));
      refute(gus.isA(Mom));
      assert.equals(gaga.type, 'Mom');
      assert.equals(gaga.name, 'gaga');
      assert.equals(gaga.hey(), 'Mom here');
      assert(gaga.isA(Mom));
      refute(gaga.isA(Dad));

    },

    "should extend and create arrays": function () {

      var Parents = LilObj.arr.extend({

        young: false,
        construct: function (rents) {

          rents.forEach(function (rent) {
            this.push(rent);
          }, this);

        }
      });

      var parents = Parents.create([
        'azure',
        'gus'
      ]);

      assert.equals(parents.length, 2);
      assert(parents instanceof Array);
      assert(parents.isA(Parents));

      parents.push('martina');
      var azure = parents.shift();

      assert.equals(parents.length, 2);
      assert.equals(azure, 'azure');
      assert.equals(parents[1], 'martina');

    }

});