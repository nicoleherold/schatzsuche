import React, { Component } from 'react';
import './index.css';

import logos from './schatzsuche.gif'

class Header extends Component {

    render() {
        return <div><img src={logos} className="logos" alt="Logos" /></div>
  }  
}

export default Header;