import React from 'react'
import httpClient from '../httpClient'

class QuestionDetail extends React.Component {

    state = {
        question: null
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
                <h1>{question.question}</h1>
                <button type="button" onClick={this.handleDeleteClick.bind(this)}>Delete Question</button>
                <ul> 
                {question.answers.map((q) => {
                    return (
                        <div className="answer-list">
                            <p>{q.answers.answers}</p>
                        </div>
                    )
                })}  
                    </ul>
            </div>
        )
    }
}

export default QuestionDetail