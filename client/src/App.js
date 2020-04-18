import React, {Component} from 'react';
import Questions from './Questions';
import Question from './Question';
import {Router} from '@reach/router';
import AskQuestion from "./AskQuestion";
const fetch = require('node-fetch');


class App extends Component{
    constructor(props){
        super(props);

        this.state = {
            questions: []
        };
    }

    componentDidMount() {
        this.getData();
    }
    async getData(){
        const response = await fetch('http://localhost:8000/api/questions');
        const data = await response.json();
        console.log("Printing the questions:", data);
        this.setState({questions:data})
    }
    async postData(input) {
        const response = await fetch('http://localhost:8000/api/questions', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                "title": input,
                done: false
            })
        });
        const data = await response.json();
        this.getData();
    }

   submit(title) {
        const newQuestion = {
            id: Math.random(),
            title: title
        };
        this.setState({
            questions: [...this.state.questions, newQuestion]
        })
    }

    getQuestion(id){
        return this.state.questions.find(question => question.id === parseInt(id));
    }




    render(){
        return (
            <>
                <Router>
                    <Questions path="/" data={this.state.questions}></Questions>
                    <Question
                        path="/question/:id"
                        getQuestion={(id) => this.getQuestion(id)}></Question>
                    <AskQuestion path="/ask" submit={(title) => this.submit(title)} addQuestion={(question) => this.postData(question)} />
                </Router>

            </>
        );
    }

}

export default App;