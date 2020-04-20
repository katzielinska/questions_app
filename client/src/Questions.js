import React, { Component } from "react";
import { Link } from "@reach/router";

class Questions extends Component {
  render() {
    let list = [];

    this.props.data.forEach((elm) => {
      let numberOfAnswers = elm.answers.length;
      let grammar;
      if (numberOfAnswers === 1) {
        grammar = "answer";
      } else {
        grammar = "answers";
      }

      list.push(
        <li key={elm._id} className="question_card">
          <Link to={"/question/" + elm._id}> {elm.text} </Link>
          <span>{numberOfAnswers + " " + grammar}</span>
        </li>
      );
    });

    return (
      <>
        <div className="questions_heading">
          <h1> All questions </h1>
          <Link className="button" to="/ask">
            Ask a question
          </Link>
        </div>
        <ul className="questions_list"> {list} </ul>
      </>
    );
  }
}

export default Questions;
