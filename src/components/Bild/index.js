import React, { Component } from 'react';
import './index.css';

import bern from './bern.js'
import spiez from './spiez.js'
import langenthal from './langenthal.js'
import lenk from './lenk.js'
import riggisberg from './riggisberg.js'


class Bild extends Component {

// searchPicture = () => {
// let bild = ''
// bild = this.props.route + this.props.punkt
// console.log(bild)
// return {bild}

// }


showPicture = () => {
    const punkt = "punkt"+ this.props.punkt
    console.log(punkt)

    if (this.props.route === 'bern'){
    const ausgabe = <><img src={bern[punkt]} className="bild" alt="Bild" /></>
    return ausgabe
    }

    if (this.props.route === 'spiez'){
        const ausgabe = <><img src={spiez[punkt]} className="bild" alt="Bild" /></>
        return ausgabe
        }

    if (this.props.route === 'lenk'){
        const ausgabe = <><img src={lenk[punkt]} className="bild" alt="Bild" /></>
        return ausgabe
            }

    if (this.props.route === 'riggisberg'){
        const ausgabe = <><img src={riggisberg[punkt]} className="bild" alt="Bild" /></>
        return ausgabe
            }

    if (this.props.route === 'langenthal'){
        const ausgabe = <><img src={langenthal[punkt]} className="bild" alt="Bild" /></>
        return ausgabe
            }

}


render() {
    console.log('render in the build', this.props.punkt)
    return (
        <div className="all">
            <div className="dot">
            <h1>{this.props.punkt}</h1>         
            </div>
            <div className="showroom" >
            {this.showPicture()}
        </div>   
        </div> 
    )

}

}


export default Bild;




// function importAll(r) {
//     let images = {};
//     r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
//     return images;
//   }
  
//   const images = importAll(require.context('./images', false, /\.(png|jpe?g|svg)$/));
  
//   <img src={images['doggy.png']} />