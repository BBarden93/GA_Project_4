import React from 'react'
import httpClient from '../httpClient'

class QuestionDetail extends React.Component {

    state = {
        question: null
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
            <div className="QuestionDetail">
                <h1>{question.question}</h1>
                {/* <ul> 
                {questions.map((q) => {
                    return (
                        <p>{}</p>
                    )
                })}  
                    </ul> */}
            </div>
        )
    }
}

export default QuestionDetail