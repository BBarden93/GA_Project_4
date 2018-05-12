import React from 'react';
import { Link } from 'react-router-dom';
import httpClient from '../httpClient.js';
import {Button} from 'reactstrap';

class Profile extends React.Component {
    state = {
        questions: [],
        currentUser: httpClient.getCurrentUser(), 
    }
    componentDidMount() {
        httpClient.getAllQuestions().then((serverResponse) => {
            console.log(serverResponse)
            this.setState({
                questions: serverResponse.data 
            })
        }) 
    }
    handleDeleteUserClick() {
        const userId = this.state.currentUser._id
        httpClient.deleteUser(userId).then((serverResponse) => {
            console.log(serverResponse)
            // httpClient.logOut()
            // this.props.history.push('/questions')
        })
    }
    render (){
        const {currentUser} = this.state 
        console.log(this.state.questions)
        return (
            <div className="editProfile">
                <header>
                    <h2>{currentUser.name}</h2>
                    <h4>{currentUser.email}</h4>
                </header>
                {/* <ul> 
                    {questions.map((q) => {
                        return (
                            <div key={q._id}  >
                                <Link className="link"to={`/questions/${q._id}`}> {q.body} </Link><br />
                            </div>
                        )
                    })}  
                </ul> */}
                <div className= "profileBtns">
                    <Button color="secondary" size="sm" className="link" to="/editprofile">Edit Profile</Button><br />
                    <Button color="secondary" size="sm" onClick={this.handleDeleteUserClick.bind(this)}>Delete Profile</Button> 
                </div>
            </div>
        )
    }
}

export default Profile 
