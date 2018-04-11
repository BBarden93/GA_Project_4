import React from 'react'

class QuestionDetail extends React.Component {

    state = {
        question: null
    }

    componentDidMount() {
        const questionId = this.props.match.params.id
        console.log(questionId)

        // httpClient.getQuestion(questionId).then(set that state here)
        // you might need to write that method...
    }

    render() {
        const { question } = this.state
        console.log(question)
        if(!question) return <h1>Loading...</h1>
        return (
            <div className="QuestionDetail">
                {/* <h1>{question}}</h1>
                <ul> 
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