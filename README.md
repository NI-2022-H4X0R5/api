# REST API

## API Routes

### User
* POST `api/login` -> Authenticate a user
* GET `api/user/:userId` -> Get a user by id (**Auth**)
* POST `api/user` -> Create a new user
* PUT `api/user/:userId` -> Update a user by id (**Auth**)

### Scores
* GET `api/scores/:userId` -> Get user scores by id (**Auth**)
* GET `api/scores` -> Get all best scores
* POST `api/scores/:userId` -> Create a new score for user (**Auth**, JSON required: enigmaId, score)

### Enigmas
* GET `api/enigma/:category` -> Get a random enigma by category (age range)
