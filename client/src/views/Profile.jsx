import React from 'react';
import { Link } from 'react-router-dom';
import httpClient from '../httpClient.js';
import {Button} from 'reactstrap';

class Profile extends React.Component {
    state = {
        currentUser: httpClient.getCurrentUser() 
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
        console.log(currentUser)
        return (
            <div className="editProfile">
                <h2>{currentUser.name}</h2>
                <h4>{currentUser.email}</h4>
                <Button color="secondary" size="sm" className="link" to="/editprofile">Edit Profile</Button><br />
                <Button color="secondary" size="sm" onClick={this.handleDeleteUserClick.bind(this)}>Delete Profile</Button> 
            </div>
        )
    }
}

export default Profile 
