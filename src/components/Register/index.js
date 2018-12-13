import React, { Component } from 'react';
// import { Button, Form } from 'semantic-ui-react';
import Popup from "reactjs-popup";
import './index.css';


class Register extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          email: '',
          password: '',
          username:'',
    
        };
      }
    
    handleSubmit = (e) => {
        e.preventDefault();
        e.target.reset();
    }
    
    
    handleInputChangeEmail = (e) => {
        const emailInput = e.currentTarget.value;
        this.setState({ email: emailInput });
        
    }
    
    
    handleInputChangePassword = (e) => {
        const passwordInput = e.currentTarget.value;
        this.setState({ password: passwordInput });
        
    }  

    handleInputChangeUsername = (e) => {
        const usernameInput = e.currentTarget.value;
        this.setState({ username: usernameInput });
        
    }  
    
    
    
    
    
    render() {
      return (
        
        <div className="signUp">
            <p>Neu hier? Bitte registrieren, um auf Schatzsuche zu gehen!</p>
            <div>

<Popup trigger={<button className="button" id="green"> Registrieren </button>} modal>
    {close => (
      <div className="modal">
        <button  className="close" onClick={close}>
          &times;
        </button>
        <div className="header">Registrieren</div>
        <div className="content">
          {' '}
          

          <form onSubmit={this.handleSubmit}>
                <label>
                    Username:
                    <br></br>
                    <input type="text"
                        value={this.state.username}
                        onChange={this.handleInputChangeUsername}
                    /><br></br>
                </label>
                <label>
                    E-Mail:
                    <br></br>
                    <input type="text"
                        value={this.state.email}
                        onChange={this.handleInputChangeEmail}
                    /><br></br>
                </label>
                <label>
                    Password:
                    <br></br>
                    <input type="password"
                        value={this.state.password}
                        onChange={this.handleInputChangePassword}
                    />
                </label>
                <div>
                    <button className="registerSubmit" onClick={()=>{this.props.save(this.state.username, this.state.email, this.state.password); close()}} >Sign Up</button>
                </div>
        </form>


        </div>
      </div>
    )}
  </Popup>







            </div>

        </div>
      );
    }
  }
  
  export default Register;