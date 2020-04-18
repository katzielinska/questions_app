const mongoose = require('mongoose'); // We need the mongoose library

(async _ => {
    // Connection to local database named 'kittens-example'. If it doesn't exists, it will automatically get created.
    try {
        const url = 'mongodb://localhost/questions';
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    } catch (e) {
        console.error(e)
    }
    console.log("Database connected:", mongoose.connection.name);

    // This is the schema for kitten
    const questionSchema = new mongoose.Schema({
        text: String,
        answers: [{
            text: String,
            votes: Number
        }]
    });

    // The 'Kitten' model is used to do CRUD stuff with kittens
    const Question = mongoose.model('Question', questionSchema);

    // Use the model to create a single kitten (named "Garfield")
    let question1 = new Question({
        text: "What is the meaning of life?",
        answers: [{
                text: "Man, that's tough. I don't know lmao.",
                votes: 0
            },
            {
                text: "There is no meaning",
                votes: 69
            },
            {
                text: "I wish I knew",
                votes: 11
            }
        ]
    });

    let question2 = new Question({
        text: "Do you ever doubt the existence of others than you?",
        answers: [{
                text: "All the time. I feel so lonely.",
                votes: 0
            },
            {
                text: "no, wtf is wrong with you dude?",
                votes: 420
            },
            {
                text: "Why are questions on this website always so weird?",
                votes: 33
            }
        ]
    });

    let question3 = new Question({
        text: "What part of the human face is your favorite?",
        answers: [{
                text: "I like eyes. They are the windows of the soul.",
                votes: 5
            },
            {
                text: "Ears are fucking weird and you can't convince me otherwise!!!",
                votes: 2
            },
            {
                text: "Any part, just please someone talk to me",
                votes: -5
            }
        ]
    });

    let randomAnswer = question1.answers[Math.floor(Math.random() * question1.answers.length)];
    let increaseVote = randomAnswer.votes;
    increaseVote++;
    // Let's save it.
    try {
        let savedQuestion = await question1.save();

        console.log(question1); // It is now saved!
    } catch (error) { // Error handling in case it doesn't save
        console.error(error);
    }




    console.log(increaseVote);
    // // Find first kitten with name 'garfield'
    // // You can do try/catch here as well to catch errors.
    // let user = await User.find({});
    // console.log("Found a user:", user); // Print it!

    await mongoose.disconnect(); // It's good practice to disconnect before closing the app.
    console.log("Databased disconnected");
})();