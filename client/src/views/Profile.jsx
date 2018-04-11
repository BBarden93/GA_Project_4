import React from 'react'
import { Link } from 'react-router-dom'

class Profile extends React.Component {
    render (){
        return (
            <div className="editProfile">
                <h1>Profile</h1>
                <Link to="/editprofile">Edit Profile</Link>
            </div>
        )
    }
}

export default Profile 