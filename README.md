# REST API

## API Routes

### User
* POST `api/user` -> Create a new user
* GET `api/user/:userId` -> Get a user by id (**Auth**, only get self)
* PUT `api/user/:userId` -> Update a user by id (**Auth**, only update self)

### Scores
* POST `api/scores/:userId` -> Create a new score for user (**Auth**, JSON required: questionId, score, gameCode)
* * GET `api/scores` -> Get 10 best scores
* GET `api/scores/:userId` -> Get user scores by id (**Auth**)

### Questions
* POST `api/questions` -> Add a new questions and it's responses
* GET `api/questions/:ageRange` -> Get a random question by age range (if ageRange is "all", get all questions)
* GET `api/questions` -> Get a random question

### Authentication
* POST `api/login` -> Authenticate a user (JSON required: username, password)

### Game
* POST `api/games` -> Add a new game (JSON required: code, id)
* GET `/api/games/:gameCode` -> Get a user from a game code

### ist
* GET `/api/ist` -> Get all ist with all information
* POST `/api/ist` -> Add a new IST
