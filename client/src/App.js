import React, { Component } from "react";
import Questions from "./Questions";
import Question from "./Question";
import { Router } from "@reach/router";
import AskQuestion from "./AskQuestion";

class App extends Component {
  API_URL = process.env.REACT_APP_API_URL;

  constructor(props) {
    super(props);

    this.state = {
      questions: [],
    };
  }

  componentDidMount() {
    this.getData();
  }

  async getData() {
    let url = `${this.API_URL}/questions`; // URL of the API.
    let result = await fetch(url); // Get the data
    let json = await result.json(); // Turn it into json
    return this.setState({
      // Set it in the state
      questions: json,
    });
  }

  async postData(input) {
    console.log(input);
    let url = `${this.API_URL}/questions`;
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        text: input,
        answers: [],
      }),
    });
    const data = await response.json();
    this.getData();
  }

  async postAnswer(id, text) {
    let url = `${this.API_URL}/questions/${id}/answers`;
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        text: text,
        votes: [],
      }),
    });
    const data = await response.json();
    console.log("Printing the response:", data);
    this.getData();
  }

  // async changeVote(id, answerID, vote) {
  //   let url = `${this.API_URL}/questions/${id}/answers/${answerID}`;
  //   const response = await fetch(url, {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     method: "PUT",
  //     body: JSON.stringify({
  //       votes: vote,
  //     }),
  //   });
  //   const data = await response.json();
  //   console.log("Printing the response:", data);
  //   this.getData();
  // }

  getQuestion(id) {
    let question = this.state.questions.find((question) => question._id === id);
    return question;
  }

  vote(questionID, answerID, isUpvote) {
    let stateCopy = this.state.questions;
    let targetQuestion = this.state.questions.find(
      (question) => question._id === questionID
    );
    let targetAnswer = targetQuestion.answers.find(
      (answer) => answer._id === answerID
    );
    console.log(targetAnswer);
    if (isUpvote) {
      targetAnswer.votes++;
    } else {
      targetAnswer.votes--;
    }
    this.setState({
      questions: stateCopy,
    });
  }

  render() {
    return (
      <>
        <Router>
          <Questions path="/" data={this.state.questions}></Questions>
          <Question
            path="/question/:id"
            getQuestion={(id) => this.getQuestion(id)}
            postAnswer={(id, text, votes) => this.postAnswer(id, text, votes)}
            vote={(id, answerID, isUpvote) => this.vote(id, answerID, isUpvote)}
          ></Question>
          <AskQuestion
            path="/ask"
            postData={(question) => this.postData(question)}
          />
        </Router>
      </>
    );
  }
}

export default App;
