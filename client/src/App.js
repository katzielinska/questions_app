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
    // const response = await fetch("http://localhost:8000/api/questions");
    // const data = await response.json();
    // console.log("Printing the questions:", data);
    // this.setState({
    //   questions: data,
    // });
    let url = `${this.API_URL}/questions`; // URL of the API.
    let result = await fetch(url); // Get the data
    let json = await result.json(); // Turn it into json
    return this.setState({
      // Set it in the state
      questions: json,
    });
  }

  async postData(input) {
    const response = await fetch("http://localhost:8000/api/questions", {
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

  //   submit(text) {
  //     const newQuestion = {
  //       id: Math.random(),
  //       text: text,
  //     };
  //     this.setState({
  //       questions: [...this.state.questions, newQuestion],
  //     });
  //   }

  getQuestion(id) {
    return this.state.questions.find((question) => question._id === id);
  }

  render() {
    return (
      <>
        <Router>
          <Questions path="/" data={this.state.questions}></Questions>
          <Question
            path="/question/:id"
            getQuestion={(id) => this.getQuestion(id)}
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
