import React from 'react';
import { Link } from 'react-router-dom';
import httpClient from '../httpClient.js';

class Profile extends React.Component {
    state = {
        currentUser: httpClient.getCurrentUser() 
    }
    render (){
        const {currentUser} = this.state 
        
        return (
            <div className="editProfile">
                <h2>{currentUser.name}</h2>
                <h4>{currentUser.email}</h4>
                <Link to="/editprofile">Edit Profile</Link>
            </div>
        )
    }
}

export default Profile 
