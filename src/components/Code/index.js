import React, { Component } from 'react';
import './index.css';
import Header from '../Header';

import info from './info_b.svg'
import karte from './karte_b.svg'
import truhe from './truhe_b.svg'
import menu from './menu_b.svg'
import { Link} from "react-router-dom";


class Code extends Component {

//------------------------------------

// toRoute = (route) =>{
//   this.props.history.push(`/routes/${route}/`)
// }
toLastRoute = () => {
  const lastRoute = localStorage.getItem('lastRoute')
  if (lastRoute) {
    this.props.history.push(lastRoute)
  } else {
    //do nothing. Bleibe bei der Auswahl!!!
    console.log('Last route not found!')
  }
}

//------------------------------------




  render() {
    return (
      <div className="code">
      <Header />
      <div className="centro">
        <h2>Wir hoffen dir hat die BZ Schatzsuche Spass gemacht. </h2>
        <div> <p> Jetzt hast du noch die Chance an unserem Wettbewerb teilzunehmen.......</p> </div>
 

      </div>

         {/* Footer Beginn */}

            <footer className="Footer">
                <div className="link"><Link to="/"><img src={menu} className="icon" alt="logo" /></Link></div>
                <div className="link"><Link to="/infos"><img src={info} className="icon" alt="info" /></Link></div>
                <div className="link" onClick={this.toLastRoute}><img src={karte} className="icon" alt="karte" /></div>
                <div className="activeLink"><img src={truhe} className="icon" alt="truhe" /></div>

            </footer>

        {/* Footer End */}

      </div>
    );
  }
}

export default Code;