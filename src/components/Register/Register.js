import './Register.css'
import { Fragment, Component } from 'react';
import { Link, Redirect } from "react-router-dom";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      nameInput: '',
      emailInput: '',
      passwordInput: '',
      authorized: false
    }
  }

  redirectFromRegister = (authorized) => {
    if(authorized) {
      return <Redirect to='/' />
    }
  }

  onRegisterEmailChange = (event) => {
    this.setState({ emailInput: event.target.value })
  }

  onRegisterPasswordChange = (event) => {
    this.setState({ passwordInput: event.target.value })
  }

  onRegisterNameChange = (event) => {
    this.setState({ nameInput: event.target.value })
  }

  onRegisterSubmit = () => {
    fetch('/register/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
              "email": this.state.emailInput,
              "password": this.state.passwordInput,
              "name": this.state.nameInput
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
      	  <Link to='/SignIn' style={{paddingRight: '3rem'}}>Sign In</Link>
        </nav>
        <div className="register-display z-depth-5">
          <div className="col s12 form-box register-box z-depth-5">
          	<div className="row col s12">
          	  <h3>Register</h3>
          	</div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  onChange={this.onRegisterNameChange} 
                  id="last_name" 
                  type="text" 
                  className="validate" 
                />
                <label htmlFor="last_name">Name</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  onChange={this.onRegisterEmailChange} 
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
                  onChange={this.onRegisterPasswordChange}  
                  id="password" 
                  type="password" 
                  className="validate" 
                />
                <label htmlFor="password">Password</label>
              </div>
            </div>
            <button 
              onClick={this.onRegisterSubmit}
              className="btn waves-effect waves-light z-depth-1 register-btn" 
              type="submit" 
              name="action"
            >
              Submit	  
      		  </button>
            {
              this.redirectFromRegister(this.state.authorized) 
            }  
          </div>
        </div>	  
    	</>
    )
  }
}

export default Register;