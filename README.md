# grunt-ask-analyze

A grunt task that validates an Alexa Skills Kit interaction model. It currently implements these validations:
1. not more than 250 intents
1. all intents in the intent schema have sample utterances
1. all sample utterances have an intent in the intent schema
1. no sample utterance is repeated in 2 different intents

# Using it

<code>require('alexa-debug-mode').slotTypes</code>
