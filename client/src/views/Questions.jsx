import React from 'react'
import {Link} from 'react-router-dom'
import httpClient from '../httpClient'

class Questions extends React.Component {
    state = {
        questions: []
    }
    componentDidMount() {
        httpClient.getAllQuestions().then((serverResponse) => {
            console.log(serverResponse)
            this.setState({
                questions: serverResponse.data 
            })
        }) 
    }

    render(){
        const {questions} = this.state 
        return (
            <div className="Questions">
                <h1>Questions: </h1>
                <Link to="/questions/new">Ask a Question</Link>
                <ul> 
                {questions.map((q) => {
                    return (
                        <Link key={q._id} to={`/questions/${q._id}`}>{q.question}</Link>
                    )
                })}  
                    </ul>
            </div>
        )
    }
}
                    

export default Questions 