# grunt-ask-analyze

A grunt task that validates an Alexa Skills Kit interaction model. It currently implements these validations:
1. not more than 250 intents
1. all intents in the intent schema have sample utterances
1. all sample utterances have an intent in the intent schema
1. no sample utterance is repeated in 2 different intents

# Using it

First, load it in your Gruntfile:
<code>grunt.loadNpmTasks('grunt-ask-analyze');</code>

Next, configure it:
<code>
    ask_validate: {
      default: {
        schema: 'dist/intents.json',
        utterances: 'model/samples.txt'
      }
    }
</code>

Finally, use it as part of some other task, like your default task:
<code>
  grunt.registerTask('default', ['ask_validate']);
</code>