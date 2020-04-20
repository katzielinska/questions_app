import React, { Component } from "react";
import { Link } from "@reach/router";

class PostAnswer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
    };
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  onSubmit() {
    this.props.postAnswer(this.props.id, this.state.text, this.state.votes);
  }

  render() {
    return (
      <>
        <div className="answer_form">
          <h3>Reply to this question:</h3>
          <textarea
            name="text"
            onChange={(event) => this.onChange(event)}
            type="text"
            placeholder="What are your thoughts?"
          />
          <button className="button" onClick={(_) => this.onSubmit()}>
            Post your answer
          </button>
        </div>
      </>
    );
  }
}

export default PostAnswer;
