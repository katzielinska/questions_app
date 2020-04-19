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
        <h2> Ask a question </h2>{" "}
        <label htmlFor="title"> What do you want to ask ? </label>{" "}
        <input
          name="title"
          onChange={(event) => this.onChange(event)}
          type="text"
          placeholder="e.g Is there life out there in the universe?"
        />
        <button onClick={(_) => this.onSubmit()}> Ask a question </button>{" "}
        <Link to={"/"}> Back to questions list </Link>{" "}
      </>
    );
  }
}

export default AskQuestion;
