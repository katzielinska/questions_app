/**** External libraries ****/
const express = require('express'); // The express.js library for implementing the API
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

/**** Configuration ****/
const appName = "Express API Template"; // Change the name of your server app!
const port = process.env.PORT || 8000; // Pick port 8080 if the PORT env variable is empty.
const app = express(); // Get the express app object.

app.use(bodyParser.json()); // Add middleware that parses JSON from the request body.
app.use(morgan('combined')); // Add middleware that logs all http requests to the console.
app.use(cors()); // Avoid CORS errors. https://en.wikipedia.org/wiki/Cross-origin_resource_sharing

/**** Some test data ****/
const data = [{
        title: "What is the meaning of life?",
        id: 0,
        answers: []
    },
    {
        title: "Do you ever doubt the existence of others than you?",
        id: 1,
        answers: []
    },
    {
        title: "What part of the human face is your favorite?",
        id: 2,
        answers: []
    },
    {
        title: "What is 1 plus 1?",
        id: 3,
        answers: []
    }
];

/**** Routes ****/

// Return all recipes in data
app.get('/api/questions', (req, res) => res.json(data));


app.post('/api/questions', (req, res) => {
    const title = req.body.title;
    const answers = req.body.answers;
    const id = Math.random();
    const newQuestion = {
        title: title,
        id: id,
        answers: answers
    };
    data.push(newQuestion);
    res.json({
        msg: "Question added",
        newQuestion: newQuestion
    });
});

app.post('/api/questions/:id/answers', (req, res) => {
    const id = parseInt(req.params.id);
    const text = req.body.text;
    const question = questions.find(q => q.id === id);
    question.answers.push(text);
    console.log(question);
    res.json({
        msg: "Answer added",
        question: question
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



/**** Start! ****/
app.listen(port, () => console.log(`${appName} API running on port ${port}!`));