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
			roundOf32: teamData[4].replace('%', ''),
			sweet16: teamData[5].replace('%', ''),
			elite8: teamData[6].replace('%', ''),
			final4: teamData[7].replace('%', ''),
			championship: teamData[8].replace('%', ''),
			winner: teamData[9].replace('%', '')
		};
	}

	fs.writeFile('./teams.json', JSON.stringify(teams), { encoding: 'utf8', flag: 'w' }, function (err) {
		console.log(err);
	});

});