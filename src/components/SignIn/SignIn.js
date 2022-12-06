import './SignIn.css'
import { Fragment, Component } from 'react';
import { Link, Redirect } from "react-router-dom";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailInput: '',
      password: '',
      authorized: false
    }
  }

  redirect = (authorized) => {
    if(authorized) {
      return <Redirect to='/' />
    }
  }

  onEmailChange = (event) => {
    this.setState({ emailInput: event.target.value })
  }

  onPasswordChange = (event) => {
    this.setState({ password: event.target.value })
  }

  onSignInSubmit = () => {
    console.log('data', this.state)
    fetch('https://face-recogintion-server.onrender.com/signin/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
              "email": this.state.emailInput,
              "password": this.state.password
            }) 
    })
      .then(response => response.json())
      .then(user => {
        if(user.id) {
          this.props.loadUser(user);
          this.setState({ authorized: true })
        }
      })
  }

  render() { 
    return(
    	<>
      	<nav className='navBar z-depth-0 valign-wrapper'>
          <Link to='/Register' style={{paddingRight: '3rem'}}>Register</Link>
        </nav>
        <div className="register-display z-depth-5">
          <div className="col s12 form-box register-box z-depth-5">
          	<div className="row col s12">
          	  <h3>Sign In</h3>
          	</div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  onChange={this.onEmailChange} 
                  id="email" 
                  type="email" 
                  className="validate" 
                />
                <label htmlFor="email">Email</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  onChange={this.onPasswordChange} 
                  id="password" 
                  type="password" 
                  className="validate" />
                <label htmlFor="password">Password</label>
              </div>
            </div>
            <button
              onClick={this.onSignInSubmit} 
              className="btn waves-effect waves-light z-depth-1 sign-in-btn" 
              type="submit" 
              name="action"
            >
              Submit	  
      		  </button>
            {
              this.redirect(this.state.authorized) 
            } 
            <p>
              <Link to='/Register'>Register</Link>
            </p>
          </div>
        </div>	  
    	</>
    )
  }
}

export default SignIn;