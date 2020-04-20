import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Question from "./Question";

// Some test data for the tests.
const question = {
  id: 42,
  text: "How do I write tests for React Components",
  answers: [
    {
      id: 420,
      text: "Would like to know that too...",
      votes: -1,
    },
    {
      id: 11,
      text: "lol",
      votes: 12,
    },
  ],
};

it("renders the question text", () => {
  const comp = <Question getQuestion={(_) => question} />;
  const { getByText } = render(comp);
  expect(getByText(question.text)).toBeInTheDocument();
});

it("renders answers for the question", () => {
  const comp = <Question getQuestion={(_) => question} />;
  const { getByText } = render(comp);
  question.answers.forEach((a) => expect(getByText(a)).toBeInTheDocument());
});
