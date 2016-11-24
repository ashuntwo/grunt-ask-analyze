var fs = require('fs');
var analyzer = require('../src/analyzer');

if(!module.parent) {
	var argv = require('minimist')(process.argv.slice(2));
	var intentFile = argv.intents;
	var sampleFile = argv.samples;

	analyzer.analyze(fs.readFileSync(intentFile, "utf8"), fs.readFileSync(sampleFile, "utf8"));
}

module.exports = function(grunt) {
	grunt.registerMultiTask('ask_validate', 'Validate ASK interaction model.', function() {
		var options = this.options({
			schema: 'intents.json',
			utterances: 'samples.txt'
		});

		var schema = grunt.file.read(options.schema).toString();
		var utterances = grunt.file.read(options.utterances).toString();

		analyzer.analyze(schema, utterances);
	});
};
