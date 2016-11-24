module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    ask_validate: {
      default: {
        schema: 'model/intents.json',
        utterances: 'model/samples.txt'
      }
    }
  });
  grunt.loadTasks('tasks');

  // Default task(s).
  grunt.registerTask('validate', ['ask_validate']);
};
