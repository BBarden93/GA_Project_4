import React from 'react'
import httpClient from "../httpClient";
import {Form, Button} from 'reactstrap'

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
							<Button color="secondary" size="sm">Update Profile</Button>
						</form>
						{/* <Form inline>
							<FormGroup>
							<Label for="exampleEmail" hidden>Email</Label>
							<Input type="text" name="email" id="exampleEmail" placeholder="Email" value={email} />
							</FormGroup>
							{' '}
							<FormGroup>
							<Label for="examplePassword" hidden>Password</Label>
							<Input type="password" name="password" id="examplePassword" placeholder="Password" />
							</FormGroup>
							{' '}
							<Button>Submit</Button>
						</Form> */}
					</div>
				</div>
            </div>
        )
    }
}

export default EditProfile 