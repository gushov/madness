var fs = require("fs");

fs.readFile('./teams.csv', { encoding: 'utf8', flag: 'r' }, function (err, data) {

	if (err) return console.log(err);

	var lines = data.split('\r\n');
	console.log(lines[0]);

	var teamData;
	var teams = {
		East: {},
		South: {},
		Midwest: {},
		West: {}
	};

	for (var i = 1; i < lines.length; i++) {

		teamData = lines[i].split(',');
		// console.log(teamData[0]);

		teams[teamData[0]][teamData[1]] = {
			name: teamData[2],
			roundOf32: Math.ceil(teamData[4] * 100),
			sweet16: Math.ceil(teamData[5] * 100),
			elite8: Math.ceil(teamData[6] * 100),
			final4: Math.ceil(teamData[7] * 100),
			championship: Math.ceil(teamData[8] * 100),
			winner: Math.ceil(teamData[9] * 100)
		};
	}

	fs.writeFile('./teams.json', JSON.stringify(teams), { encoding: 'utf8', flag: 'w' }, function (err) {
		console.log(err);
	});

});