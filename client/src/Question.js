import React from "react";
import { Link } from "@reach/router";
import PostAnswer from "./PostAnswer";

class Question extends React.Component {
  vote(answerID, isUpvote) {
    this.props.vote(this.props.id, answerID, isUpvote);
  }

  render() {
    const id = this.props.id;
    let question = this.props.getQuestion(id);
    let answersList;

    if (question.answers.length === 0) {
      answersList = <p>No answers yet. Be the first one to reply!</p>;
    } else {
      answersList = (
        <ul className="answers">
          {question.answers.map((answer) => (
            <li key={answer._id} className="answer">
              <div className="votes">
                <button onClick={() => this.vote(answer._id, true)}>
                  &#8679;
                </button>
                <span>{answer.votes}</span>
                <button onClick={() => this.vote(answer._id, false)}>
                  &#8681;
                </button>
              </div>
              <p>{answer.text}</p>
            </li>
          ))}
        </ul>
      );
    }

    return (
      <>
        <Link to={"/"} className="backlink">
          Back to questions list
        </Link>
        <h1>{question.text}</h1>
        <PostAnswer
          id={id}
          postAnswer={(id, text, votes) =>
            this.props.postAnswer(id, text, votes)
          }
        />
        <h3>Answers:</h3>
        {answersList}
      </>
    );
  }
}

export default Question;
