var fs = require('fs');

if(!module.parent) {
	var argv = require('minimist')(process.argv.slice(2));
	var intentFile = argv.intents;
	var sampleFile = argv.samples;

	analyze(intentFile, sampleFile);
}

function analyze(intentFile, sampleFile) {
	var intents = JSON.parse(fs.readFileSync(intentFile, "utf8"));
	var samples = fs.readFileSync(sampleFile, "utf8").split('\n');

	var intentCounts = intents.intents.map(function(intent) { return intent.intent; }).reduce(function(left, right) {
		left[right] = 0;
		return left;
	}, {});

	var unknownIntents = {};
	var repeatedSamples = {};

	samples.forEach(function(sample) {
		var intent, phrase;
		var parts = sample.split('\t');
		intent = parts[0];
		phrase = parts[1];
		
		var count = intentCounts[intent];

		if(count === undefined)
			unknownIntents[intent] = 1;
		else
			intentCounts[intent]++;

		var intents = repeatedSamples[phrase];
		if(!intents)
			repeatedSamples[phrase] = [intent];
		else
			intents.push(intent);
	});

	var sortedIntents = Object.keys(intentCounts).map(function(key) {
		return {
			intent: key,
			count: intentCounts[key]
		};
	}).sort(function(a, b) {
		return a.count - b.count;
	});

	console.log("total intents: " + sortedIntents.length);
	console.log("intent counts");
	console.dir(sortedIntents);

	console.log("unknown intents");
	console.dir(Object.keys(unknownIntents).sort());

	repeatedSamples = Object.keys(repeatedSamples).map(key => {
			return {
				key: key,
				samples: repeatedSamples[key]
			};
		}).filter((key) => key.samples.length > 1);
	console.log("repeated samples");
	console.dir(repeatedSamples);

	var intentsMissingSamples = sortedIntents.filter(intent => 
		intent.count === 0 && !intent.intent.startsWith("AMAZON."));

	if(unknownIntents.length > 0)
		throw new Error("there are samples without matching intents: " + unknownIntents);
	if(sortedIntents.length > 250)
		throw new Error("there are more than 250 intents: " + sortedIntents.length);
	if(repeatedSamples.length > 0)
		throw new Error("there are repeated samples: " + repeatedSamples);
	if(intentsMissingSamples.length > 0)
		throw new Error("some intents are missing samples: " + JSON.stringify(intentsMissingSamples));

}

exports.analyze = analyze;