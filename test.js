var fs = require('fs');
var should = require('should');
var analyzer = require('./analyzer');

describe('analyze', function() {
	describe('analyze', function() {
		it('should correctly analyze sample data', function() {
			analyzer.analyze(fs.readFileSync("intents.json", "utf8"), 
				fs.readFileSync("samples.txt", "utf8"));
		});
	});
});