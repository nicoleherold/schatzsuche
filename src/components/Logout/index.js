import React, { Component } from 'react';
// import { Button, Form } from 'semantic-ui-react';
import Popup from "reactjs-popup";
// import { Link, Redirect } from "react-router-dom";
import './index.css';


class Logout extends Component {




    //-------------------  



    render() {

        return (
            <div className="logout">
                <Popup trigger={<button className="button" id="blue" > Logout </button>} modal>
                    {close => (
                        <div className="modal">
                            <button className="close" onClick={close}>
                                &times;
                            </button>
                            <div className="header"> Logout </div>
                            <div className="content">
                                {' '}

                                <div>
                                    <p> Hallo {localStorage.getItem('username')}, bist du sicher, dass Du dich ausloggen möchtest? Alle Daten gehen dann verloren!</p>
                                    {/* <form onSubmit={this.handleSubmit}> */}
                                    {/* <label>
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
                </label> */}
                                    <div>
                                        <button className="logoutSubmit" onClick={() => { this.props.logout(); close()}} >Logout</button>
                                    </div>
                                    {/* </form> */}

                                </div>
                            </div>



                        </div>
                    )}
                </Popup>

            </div>




            // </div>
        );
    }
}

export default Logout;
