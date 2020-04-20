import React, { Component } from "react";
import { Link } from "@reach/router";

class AskQuestion extends Component {
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
    this.props.postData(this.state.text);
  }

  render() {
    return (
      <>
        <div className="ask">
          <div className="ask_heading">
            <Link to={"/"} className="backlink">
              Back to questions list
            </Link>
            <h1> Ask a question </h1>
          </div>
          <div className="ask_form">
            <div>
              <label htmlFor="text"> What do you want to ask? </label>
              <p>
                It can be anything you would like to know. Yes, a n y t h i n g.
              </p>
            </div>
            <input
              name="text"
              onChange={(event) => this.onChange(event)}
              type="text"
              placeholder="e.g Is there life out there in the universe?"
            />
            <button className="button" onClick={(_) => this.onSubmit()}>
              Post your question
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default AskQuestion;
