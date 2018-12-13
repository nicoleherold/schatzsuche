import React, { Component } from 'react';
import './index.css';

import Header from '../Header';
import info from './info_b.svg'
import karte from './karte_b.svg'
import fred from './fred.png'
import baum from './baum.png'
import truhe from './truhe_b.svg'
// import pfeili from './pfeili.svg'
import menu from './menu_b.svg'
import { Link} from "react-router-dom";
import text from './text.json'


// import App from '../App';


class Infos extends Component {

//----------------------------------
toRoute = (route) =>{
  this.props.history.push(`/routes/${route}`)
}
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
      <div className="allInfo">
      <div className="infoseite">
      <Header />
        <p className="headInfo">Geht mit Fred auf Schatzsuche. Hier noch ein paar Infos.</p>

      <img src={fred} className="fred" alt="fred" />

{text.map((info, index) => 
  <div key={index} className="infoside">
  <details className="headline">
        <summary className="inhalt">
          {text[index].head}
        </summary>
        <p>
          {text[index].inhalt}
        </p>
  </details>
  </div>
)}





        {/* Footer Beginn */}

            <footer className="Footer">
                <div className="link"><Link to="/"><img src={menu} className="icon" alt="logo" /></Link></div>
                <div className="activeLink"><img src={info} className="icon" alt="info" /></div>
                <div className="link" onClick={this.toLastRoute}><img src={karte} className="icon" alt="karte" /></div>
                <div className="link"><Link to="/code"><img src={truhe} className="icon" alt="truhe" /></Link></div>

            </footer>

        {/* Footer End */}

      </div>
      </div>
    );
  }
}

export default Infos;