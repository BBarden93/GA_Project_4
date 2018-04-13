import React from 'react'
import httpClient from '../httpClient'

// sign up form behaves almost identically to log in form. We could create a flexible Form component to use for both actions, but for now we'll separate the two:
class NewQuestion extends React.Component {
	state = {
		fields: { body: ''}
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
		console.log(this.state.fields)
		httpClient.newQuestion(this.state.fields).then(serverResponse => {
			console.log(serverResponse)
			this.setState({ fields: {  body: "" } })
			if(serverResponse) this.props.history.push('/questions')
		})	
		
	}
	
	render() {
		const {question} = this.state.fields
		return (
			<div className='NewQuestion'>
				<div className='row'>
					<div className='column column-33 column-offset-33'>
						<h1>Ask a Question</h1>
						<form onChange={this.onInputChange.bind(this)} onSubmit={this.onFormSubmit.bind(this)}>
							<input type="text" placeholder="Question" name="body" value={question} />
							<button>Submit Question</button>
						</form>
					</div>
				</div>
			</div>
		)
	}
}

export default NewQuestion 