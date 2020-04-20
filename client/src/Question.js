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

    return (
      <>
        <Link to={"/"}>Back to questions list</Link>
        <h1>{question.text}</h1>
        <h3>Answers:</h3>
        <ul>
          {question.answers.map((answer) => (
            <li key={answer._id}>
              {answer.text}
              <div className="votes">
                <span>Vote count: </span>
                {answer.votes}
                <button onClick={() => this.vote(answer._id, true)}>
                  Upvote
                </button>
                <button onClick={() => this.vote(answer._id, false)}>
                  Downvote
                </button>
              </div>
            </li>
          ))}
        </ul>

        <PostAnswer
          id={id}
          postAnswer={(id, text, votes) =>
            this.props.postAnswer(id, text, votes)
          }
        />
      </>
    );
  }
}

export default Question;
