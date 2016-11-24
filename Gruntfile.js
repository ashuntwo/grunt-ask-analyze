module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    ask_validate: {
      interactionModel: {
        options: {
          bucket: 'magicdoor-ops.huntwork.net',
          access: 'private'
        },
        files: [
          { dest: 'model/samples.txt', src: ['model/samples.txt']},
          { dest: 'model/intents.json', src: ['dist/intents.json']}
        ]
      }
    }
  });
  grunt.loadTasks('tasks');

  // Default task(s).
  grunt.registerTask('validate', ['ask_validate']);
};
