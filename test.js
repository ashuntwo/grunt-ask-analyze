var fs = require('fs');
var should = require('should');
var analyzer = require('./src/analyzer');

describe('analyze', function() {
	describe('analyze', function() {
		it('should correctly analyze sample data', function() {
			analyzer.analyze(fs.readFileSync("./model/intents.json", "utf8"), 
				fs.readFileSync("./model/samples.txt", "utf8"));
		});
		it('should throw on duplicate intents', function() {
			should.throws(() => analyzer.analyze(fs.readFileSync("./model/intents_invalid.json", "utf8"), 
				fs.readFileSync("./model/samples.txt", "utf8")));
		});
		it('should throw on invalid samples (missing utterance)', function() {
			should.throws(() => analyzer.analyze(fs.readFileSync("./model/intents.json", "utf8"), 
				fs.readFileSync("./model/samples_invalid.txt", "utf8")));
		});
		it('should throw on invalid samples (missing intent)', function() {
			should.throws(() => analyzer.analyze(fs.readFileSync("./model/intents.json", "utf8"), 
				fs.readFileSync("./model/samples_invalid2.txt", "utf8")));
		});
	});
});