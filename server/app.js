/**** External libraries ****/
const express = require('express'); // The express.js library for implementing the API
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

/**** Configuration ****/
const port = process.env.PORT || 8000; // Pick port 8080 if the PORT env variable is empty.
const app = express(); // Get the express app object.

app.use(bodyParser.json()); // Add middleware that parses JSON from the request body.
app.use(morgan('combined')); // Add middleware that logs all http requests to the console.
app.use(cors()); // Avoid CORS errors.
app.use(express.static('../client/build'));

/**** Database ****/
const questionsDB = require('./questions_db')(mongoose);

/**** Routes ****/

// Return all recipes in data

app.get('/api/questions', async (req, res) => {
    const questions = await questionsDB.getQuestions();
    res.json(questions);
});

app.post('/api/questions', async (req, res) => {
    let question = {
        text: req.body.text,
        answers: []
    };
    const newQuestion = await questionsDB.createQuestion(question);
    res.json({
        msg: "Question added",
        newQuestion: newQuestion
    });
});


app.post('/api/questions/:id/answers', async (req, res) => {
    let answer = {
        text: req.body.text,
    };
    const newAnswer = await questionsDB.addAnswer(req.params.id, answer)
    console.log(newAnswer);
    res.json({
        msg: "Answer added",
        newAnswer: newAnswer
    });
});

// app.put('/api/questions', (req, res) => {
//     const text = req.body.title;
//     const done = req.body.done;
//     const task = data.find(task => task.id === parseInt(id));

//     if (text) {
//         task.text = text
//     };

//     if (done !== undefined) {
//         task.done = done
//     };
//     data.push(task);
//     res.json({
//         msg: "Task updated",
//         newTask: newTask
//     });
// });

app.get('*', (req, res) =>
    res.sendFile(path.resolve('..', 'client', 'build', 'index.html'))
);

/**** Start! ****/
const url = process.env.MONGO_URL || 'mongodb://localhost/questions_db';
mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(async () => {
        await questionsDB.addQuestions(); // Fill in test data if needed.
        await app.listen(port); // Start the API
        console.log(`Questions API running on port ${port}!`);
    })
    .catch(error => console.error(error));