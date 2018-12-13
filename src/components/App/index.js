import React, { Component } from 'react';
import './index.css';
import Header from '../Header';
import Content from '../Content';
import info from './info_b.svg'
import karte from './karte_b.svg'
import truhe from './truhe_b.svg'
import menu from './menu_b.svg'
import { Link} from "react-router-dom";


class App extends Component {
  componentDidMount () {
    console.log(this.props)
  }
  
  
  
      render() {
      return (
        <div className="App">
          <Header />
          <Content history={this.props.history} city={this.props.match.params.city} punkt={this.props.match.params.punkt}/>
  
          {/* Footer Beginn */}
  
              <footer className="Footer">
                  <div className="link"><Link to="/"><img src={menu} className="icon" alt="logo" /></Link></div>
                  <div className="link"><Link to="/infos"><img src={info} className="icon" alt="info" /></Link></div>
                  <div className="activeLink"><img src={karte} className="icon" alt="karte" /></div>
                  <div className="link"><Link to="/code"><img src={truhe} className="icon" alt="truhe" /></Link></div>
  
              </footer>
  
          {/* Footer End */}
  
  
        </div>
      );
    }
  }

export default App;
