import React, { Component } from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import { Container } from 'reactstrap'
import httpClient from './httpClient.js';
import Home from './views/Home.jsx';
import LogIn from './views/LogIn.jsx';
import SignUp from './views/SignUp.jsx';
import NavBar from './views/NavBar.jsx';
import Questions from './views/Questions.jsx';
import NewQuestion from './views/NewQuestion.jsx';
import Profile from './views/Profile.jsx';
import EditProfile from './views/EditProfile.jsx';
import QuestionDetail from './views/QuestionDetail';
import './App.css'

class App extends Component {

  state = {
    currentUser: httpClient.getCurrentUser() 
  }

  onLoginSuccess(user){
    this.setState({currentUser: user})
  }

  render() {
    const {currentUser} = this.state 
    
    return (

      <Container className="App">
        {/* <div className="current-user">
          {currentUser 
            ? (
              <div>{currentUser.name}</div>
            )
            : null
          }
        </div> */}

          <div className='NavBar'>
            <NavBar currentUser={currentUser} />
          </div>

        <Switch>
            <Route path="/login" render={(routeProps) => {
                return <LogIn {...routeProps} onLoginSuccess={this.onLoginSuccess.bind(this)}/>
            }} />
            
            <Route path="/signup" render={(routeProps) => {
                return <SignUp {...routeProps} onSignUpSuccess={this.onLoginSuccess.bind(this)}/>
            }} />
            
            <Route path="/logout" render={() => {
                httpClient.logOut()
                setTimeout(() => { this.setState({currentUser: null}) })
                return <Redirect to="/login" />
            }} />

            <Route path="/profile" render={() => {
                return currentUser 
                ? <Profile/>
                : <Redirect to="/login" />
            }} />

             <Route path="/editprofile" render={() => {
                return currentUser
                ? <EditProfile currentUser={currentUser} />
                : <Redirect to="/login" />
            }} />

            <Route path="/questions/new" render={(routeProps) => {
                return currentUser 
                ? <NewQuestion {...routeProps} />
                : <Redirect to="/login" />
            }} />

            <Route path="/questions/:id" render={(routeProps) => {
                return currentUser 
                ? <QuestionDetail {...routeProps} />
                : <Redirect to="/login" />
            }} />

            <Route path="/questions" render={(routeProps) => {
                return currentUser 
                ? <Questions {...routeProps}/>
                : <Redirect to="/login" />
            }} />

            <Route path="/" component={Home} />

        </Switch>
      </Container>
    );
  }
}

export default App;
