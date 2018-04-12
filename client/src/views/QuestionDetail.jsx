import React from 'react'
import httpClient from '../httpClient'

class QuestionDetail extends React.Component {

    state = {
        question: null
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

    componentDidMount() {
        const questionId = this.props.match.params.id
        console.log(questionId)

        httpClient.getAQuestion(questionId).then((serverResponse) => {
            this.setState({
                question: serverResponse.data
            })
        })
    }

    render() {
        const { question } = this.state
        console.log(question)
        if(!question) return <h1>Loading...</h1>
        return (
            <div className="QuestionDetail" style={{textAlign: 'center'}}>
                <h1>{question.body}</h1>
                <h2>{question.answers.length} answers</h2>
                <button type="button" onClick={this.handleDeleteClick.bind(this)}>Delete Question</button>
                
                <form onSubmit={this.handleAddAnswer.bind(this)}>
                    <input ref="body" type="text" placeholder="Your answer..." />
                    <button>Add an Answer</button>
                </form>
                
                <ul> 
                {question.answers.length
                    ? (
                        question.answers.map((a) => {
                            return (
                                <div key={a._id} className="answer-list">
                                    <p>{a.body} - {a.user.name}</p>
                                    {/* <button type="button" onClick={this.handleAnswerDeleteClick.bind(this)}>Delete Answer</button> */}
                                </div>
                            )
                        })
                    )
                    : (
                        <h2>No answers yet. Be a first responder.</h2>
                    )
                }  
                    </ul>
            </div>
        )
    }
}

export default QuestionDetail