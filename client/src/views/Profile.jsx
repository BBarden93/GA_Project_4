import React from 'react';
import { Link } from 'react-router-dom';
import httpClient from '../httpClient.js';

class Profile extends React.Component {
    state = {
        currentUser: httpClient.getCurrentUser() 
    }
    handleDeleteUserClick() {
        const userId = this.state.currentUser._id
        httpClient.deleteUser(userId).then((serverResponse) => {
            console.log(serverResponse)
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
                <Link to="/editprofile">Edit Profile</Link>
                <button onClick={this.handleDeleteUserClick.bind(this)}>Delete Profile</button> 
            </div>
        )
    }
}

export default Profile 
