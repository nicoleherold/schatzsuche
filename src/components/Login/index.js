import React, { Component } from 'react';
// import { Button, Form } from 'semantic-ui-react';
import Popup from "reactjs-popup";
// import { Link, Redirect } from "react-router-dom";
import './index.css';


class Login extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          email: '',
          password: '',
    
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
    
    
    
    
    
    render() {
      
      return (
        <div className="login">
            <p>Schon registriert? Dann bitte einloggen um auf Schatzsuche zu gehen.</p>
            <div>



<Popup trigger={<button className="button" id="blue" > Einloggen </button>} modal>
    {close => (
      <div className="modal">
        <button className="close" onClick={close}>
          &times;
        </button>
        <div className="header"> Einloggen </div>
        <div className="content">
          {' '}
          

          <form onSubmit={this.handleSubmit}>
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
                    <button className="loginSubmit"  onClick={()=>{this.props.login(this.state.email, this.state.password); close()}} >Einloggen</button>
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
  
  export default Login;
  