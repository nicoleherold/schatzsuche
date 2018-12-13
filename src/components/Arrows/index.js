import React, { Component } from 'react';
import './index.css';
import pfeilLinks from './pfeil-links.svg';
import pfeilRechts from './pfeil-rechts.svg';



class Arrows extends Component {

render(){
    return(

<header className="Header">
<img src={pfeilLinks} className="pfeil" alt="pfeil" onClick={() => { this.props.changeBack(this.props.punkt); this.props.killAnswer() }}/>
<div className="nameInArrows">{this.props.route}</div>
{/* <img src={windrose} className="Logo" alt="windrose" /> */}
<img src={pfeilRechts} className="pfeil" alt="pfeil" onClick={() => { this.props.changeForward(this.props.punkt); this.props.killAnswer() }}/>


</header>

    )
}}

export default Arrows;

