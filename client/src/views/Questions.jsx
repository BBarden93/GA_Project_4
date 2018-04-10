import React from 'react'
import {Link} from 'react-router-dom'
import httpClient from '../httpClient'

class Questions extends React.Component {
    state = {
        questions: []
    }
    componentDidMount() {
        httpClient.getAllQuestions().then((serverResponse) => {
            this.setState({
                questions: serverResponse.data 
            })
        }) 
    }

    render(){
        return (
            <div className="Questions">
                <h1>Questions: </h1>
                {/* {questions.map((q) => {
                    return (
                        <Link key={q.id} to={`/questions/${q._id}`}>
                            <img src={} alt="related image" />
                        </Link>
                    )
                })}   */}
            </div>
        )
    }
}
                    

export default Questions 