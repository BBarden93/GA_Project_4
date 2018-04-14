import React from 'react'
import httpClient from "../httpClient";
import {Form} from 'reactstrap'

class EditProfile extends React.Component {
    
    state = {
		fields: { name: '', email: '', password: ''}
    }
    
    componentDidMount() {
        const { name, email } = this.props.currentUser
        this.setState({
            fields: {
                name, email, password: ''
            }
        })
    }

	onInputChange(evt) {
		this.setState({
			fields: {
				...this.state.fields,
				[evt.target.name]: evt.target.value
			}
		})
	}

	onFormSubmit(evt) {
		evt.preventDefault()
		httpClient.signUp(this.state.fields).then(user => {
			this.setState({ fields: { name: '', email: '', password: '' } })
			if(user) {
				this.props.onSignUpSuccess(user)
				this.props.history.push('/')
			}
		})
	}
    render (){
        const { name, email, password } = this.state.fields
        return (
            <div className="EditProfile">
                <div className='row'>
					<div className='column column-33 column-offset-33'>
						<h1>Edit Profile</h1>
						<form onChange={this.onInputChange.bind(this)} onSubmit={this.onFormSubmit.bind(this)}>
							<input type="text" placeholder="Name" name="name" value={name} />
							<input type="text" placeholder="Email" name="email" value={email} />
							<input type="password" placeholder="Password" name="password" value={password} />
							<button>Update Profile</button>
						</form>
					</div>
				</div>
            </div>
        )
    }
}

export default EditProfile 