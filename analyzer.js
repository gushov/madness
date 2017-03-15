var fs = require("fs");
var lilobj = require('lilobj');
var _ = require('lil_');

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var Game = lilobj.obj.extend({

  construct: function (round, team1, team2) {
	this.round = round;
	this.team1 = team1;
	this.team2 = team2;
  },

  play: function () {

	var team1 = this.team1[this.round] * 1;
	var team2 = this.team2[this.round] * 1;
	var range = team1 + team2;
	var dart = getRandomInt(0, range);

	return dart <= team1 ? this.team1 : this.team2;
  }

});

var Tournament = lilobj.obj.extend({

	construct: function () {},
	regions: ['East', 'West', 'Midwest', 'South'],
	rounds: ['roundOf32', 'sweet16', 'elite8', 'final4', 'championship', 'winner'],
	seeds: ['1', '16', '8', '9', '5', '12', '4', '13', '6', '11', '3', '14', '7', '10', '2', '15']

});

var tournament = Tournament.create();

fs.readFile('./teams.json', { encoding: 'utf8', flag: 'r' }, function (err, data) {

	var teams = JSON.parse(data);
	var winners = [];
	var field = [];

	_.each(tournament.rounds, function (round) {

		console.log('======== ' + round + ' ========');

		if (field.length === 0) {
			_.each(teams, function (region, regionTeams) {

				console.log('======== ' + region + ' ========');

				_.each(tournament.seeds, function (seed) {
					console.log('pushing: ', regionTeams[seed].name);
					field.push(regionTeams[seed]);
				});

			});
		}

		var game;
		_.each(field, function (team) {
			if (game) {
				game.team2 = team;
				var winner = game.play();
				winners.push(winner);
				console.log(winner.name);
				game = null;
			} else {
				game = Game.create(round, team);
			}
		});

		field = winners;
		winners = [];
	});
});