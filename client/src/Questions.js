import React, { Component } from "react";
import { Link } from "@reach/router";

class Questions extends Component {
  render() {
    let list = [];
    this.props.data.forEach((elm) => {
      list.push(
        <li key={this.props._id}>
          <Link to={"/question/" + elm._id}> {elm.text} </Link>
        </li>
      );
    });

    return (
      <>
        <Link to="/ask"> Ask a question </Link> <h1> All questions </h1>
        <ul> {list} </ul>
      </>
    );
  }
}

export default Questions;
