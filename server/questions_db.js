class Db {
    /**
     * Constructors an object for accessing kittens in the database
     * @param mongoose the mongoose object used to create schema objects for the database
     */
    constructor(mongoose) {
        // This is the schema we need to store kittens in MongoDB
        const questionSchema = new mongoose.Schema({
            text: String,
            answers: [{
                text: String,
                votes: Number
            }]
        });

        // This model is used in the methods of this class to access kittens
        this.questionModel = mongoose.model('question', questionSchema);
    }

    async getQuestions() {
        try {
            return await this.questionModel.find({});
        } catch (error) {
            console.error("getQuestions:", error.message);
            return {};
        }
    }

    async getQuestion(id) {
        try {
            return await this.questionModel.findById(id);
        } catch (error) {
            console.error("getQuestion:", error.message);
            return {};
        }
    }

    async createQuestion(newQuestion) {
        let question = new this.questionModel(newQuestion);
        return await question.save();
    }

    // async addHobby(kittenId, hobby) {
    //     // TODO: Error handling
    //     const kitten = await this.getKitten(kittenId);
    //     kitten.hobbies.push(hobby);
    //     return await kitten.save();
    // }

    /**
     * This method adds a bunch of test data if the database is empty.
     * @param count The amount of kittens to add.
     * @returns {Promise} Resolves when everything has been saved.
     */
    async addQuestions() {

        let l = (await this.getQuestions()).length;
        console.log("Question collection size:", l);

        if (l === 0) {
            console.log("Adding data because database was empty!")
            let promises = [];
            let question1 = new this.questionModel({
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

            promises.push(question1.save());

            let question2 = new this.questionModel({
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

            promises.push(question2.save());

            let question3 = new this.questionModel({
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

            promises.push(question3.save());

            return Promise.all(promises);
        }

    }
}

// We export the object used to access the kittens in the database
module.exports = mongoose => new Db(mongoose);