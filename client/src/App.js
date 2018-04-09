import React, { Component } from 'react';
import {Link, Route, Switch, Redirect} from 'react-router-dom';
import httpClient from './httpClient.js';
import Home from './views/Home.jsx';
import LogIn from './views/LogIn.jsx';
import LogOut from './views/LogOut'
import SignUp from './views/SignUp.jsx';
import NavBar from './views/NavBar.jsx'


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

      <div className="App">

          {currentUser 
            ? (
              <div>{currentUser.name}</div>
            )
            : null
          }

          <NavBar currentUser={currentUser} />

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

            {/* <Route path="/vip" render={() => {
                return currentUser 
                ? <h1>VIP, Welcome</h1>
                : <Redirect to="/login" />
            }} /> */}

            <Route path="/" component={Home} />
        </Switch>
      </div>
    );
  }
}

export default App;
