import React from "react";
import { Link } from "@reach/router";
import PostAnswer from "./PostAnswer";

class Question extends React.Component {
  render() {
    const id = this.props.id;
    let question = this.props.getQuestion(id);

    console.log(question);

    return (
      <>
        <Link to={"/"}>Back to questions list</Link>
        <h1>{question.text}</h1>
        <h3>Answers:</h3>
        <ul>
          {question.answers.map((answer) => (
            <li key={answer._id}>{answer.text}</li>
          ))}
        </ul>

        <PostAnswer
          id={id}
          postAnswer={(id, text) => this.props.postAnswer(id, text)}
        />
      </>
    );
  }
}

export default Question;
