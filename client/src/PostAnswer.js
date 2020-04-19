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
    this.props.PostAnswer(this.state.text);
  }

  render() {
    return (
      <>
        <label htmlFor="text"> Your answer </label>{" "}
        <textarea
          name="text"
          onChange={(event) => this.onChange(event)}
          type="text"
        />
        <button onClick={(_) => this.onSubmit()}> Post your answer </button>{" "}
        <Link to={"/"}> Back to questions list </Link>{" "}
      </>
    );
  }
}

export default PostAnswer;
