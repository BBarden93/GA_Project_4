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
            <div className="Questions" style={{textAlign: 'center'}}>
                <h1>Questions: </h1>
                <Link to="/questions/new">Ask a Question</Link>
                <ul> 
                {questions.map((q) => {
                    return (
                        <div key={q._id}  className="questionLink">
                            <Link to={`/questions/${q._id}`}>{q.body}</Link><br />
                        </div>
                    )
                })}  
                    </ul>
            </div>
        )
    }
}
                    

export default Questions 