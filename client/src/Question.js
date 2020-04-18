import React from 'react';
import {Link} from "@reach/router";
import PostAnswer from './PostAnswer';

class Question extends React.Component{
    render(){
        let question = this.props.getQuestion(this.props.id);
        return(
            <>
                <Link to={"/"}>Back to questions list</Link>
                <h1>{question.title}</h1>
                <h3>Answers:</h3>
                <PostAnswer sumbit={(text) => this.submit(text)}/>

            </>

        )
    }

}

export default Question;