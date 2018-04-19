import React from 'react';
import httpClient from '../httpClient';
import {Button} from 'reactstrap';

class QuestionDetail extends React.Component {

    state = {
        question: '',
        currentUser: httpClient.getCurrentUser() 
    }

    handleAddAnswer(evt){
        evt.preventDefault()
        const questionId = this.props.match.params.id
        const data = { body: this.refs.body.value }
        httpClient.addAnswer(questionId, data).then((serverResponse) => {
            this.setState({
                question: serverResponse.data.question
            })
            this.refs.body.value = ''
        })
    }

    handleDeleteClick() {
        httpClient.deleteAQuestion(this.props.match.params.id).then((serverResponse) => {
            this.props.history.push('/questions')
        })
    }

    handleAnswerDeleteClick(answerId) {
        httpClient.deleteAnswer(answerId).then((serverResponse) => {
            console.log(serverResponse.data)
            this.setState({
                question: serverResponse.data.question
            })
        })
    }

    componentDidMount() {
        const questionId = this.props.match.params.id
        // console.log(questionId)

        httpClient.getAQuestion(questionId).then((serverResponse) => {
            this.setState({
                question: serverResponse.data
            })
        })
    }

    render() {
        const {question, currentUser} = this.state
        console.log(question.user)
        
        if(!question) return <h1>Loading...</h1>
        return (
            <div className="QuestionDetail" style={{textAlign: 'center'}}>
                <header>
                    <h1>{question.body}</h1>
                    <h4>Asked by: {question.user.name}</h4>
                </header>
                
                    {currentUser._id === question.user._id?
                        <Button color="secondary" size="sm" type="button" onClick={this.handleDeleteClick.bind(this)}>Delete Question</Button>
                    :null}
                <h3>{question.answers.length} answers</h3>
                
                <form onSubmit={this.handleAddAnswer.bind(this)}>
                    <input ref="body" type="text" placeholder="Your answer..." />
                    <Button color="secondary" size="sm">Add an Answer</Button>
                </form>
                
                <ul> 
                {question.answers.length
                    ? (
                        question.answers.map((a) => {
                            return (
                                <div key={a._id} className="answer-list">
                                    <p>
                                        {a.body} - {a.user.name} <br /> 
                                        {currentUser._id === a.user._id
                                            ? <Button color="secondary" size="sm" type="button" onClick={this.handleAnswerDeleteClick.bind(this, a._id)}>Delete Answer</Button>
                                            : null
                                        }
                                    </p>
                                </div>
                            )
                        })
                    )
                    : (
                        <h3>No answers yet. Be a first responder.</h3>
                    )
                }  
                    </ul>
            </div>
        )
    }
}

export default QuestionDetail