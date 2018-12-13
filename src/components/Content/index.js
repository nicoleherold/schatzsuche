import React, { Component } from 'react';
import './index.css';
import Bild from '../Bild'
import Text from '../Text'
import Arrows from '../Arrows'
import {baseUrl} from '../../constants.js'




class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            answer: '',
        }
    }

    componentDidUpdate = () => {
        console.log('in da did update')
        localStorage.setItem('lastRoute', `/routes/${this.props.city}/${this.props.punkt}`)
    }


//-----------------------------------------------
   changeBack = () => {
        if (this.props.punkt>0){
            this.props.history.push(`/routes/${this.props.city}/${parseInt(this.props.punkt) - 1}`)
        }
    }
      
//-----------------------------------------------
    changeForward = () => {
          
        let high = 0;

        if(this.props.city === 'bern'){
            high = 19;
        }
        if(this.props.city === 'lenk'){
             high = 18;
        }
        if(this.props.city === 'riggisberg'){
            high = 16;
        }
        if(this.props.city === 'langenthal'){
            high = 18;
        }    
        if(this.props.city === 'spiez'){
            high = 16;
        }  
        if (this.props.punkt < high) {
            this.props.history.push(`/routes/${this.props.city}/${parseInt(this.props.punkt) + 1}`)
        }
    }


//------------------------------------------------


 saveAnswer = async (answerFromInput) => {
    // const answerAsString = '' + answerFromInput;
    await this.setState({ answer: answerFromInput});
    console.log('now saved in Content state.answer: ' + this.state.answer)

    //Answer is now in state gespeichert!

    // const answerForLocalSorage = {
    //     route: this.state.route, 
    //     point: this.state.punkt,
    //     answer: this.state.answer
    // }



    //im localstorage speichern:
    // localStorage.setItem('answer', answerForLocalSorage );

    // noch in state oder localStorage speichern!


    /// WICHTIG: JETZT MèSSEN DATEN IRGENDWO GESPEICHERT WERDEN!!!! werden nämlich nach Pfeildrücken gelöscht.
    //fetch post zu answer!!!!!!

this.fetchAnswerToDB ();

}

//------------------------------------------------------
//POST Speichert answer in DB

fetchAnswerToDB = async() => {

    try{
        let punkt = this.props.punkt + '';

      const token = localStorage.getItem('x-access-token');           
      
      const data = {
        "route": this.props.city,
        "point": punkt,
        "answer": this.state.answer
      }

      
    const options = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json',
        'x-access-token': `${token}`
      }),
    };
    const url = `${baseUrl}answer`;

    const response = await fetch(url, options);
    const answer = await response.json();
    
    // await(this.setState({token: tokenFromFetch}));
  
  
  
  }catch(e){
    console.error(`Error in fetch new Feed post 😱😱😱😱: ${e}`);
    }      
}


// ----------------------------------------------------

killAnswer =async() => {
await this.setState ({answer: ''})
await console.log('i killed the answer' + this.state.answer)
}

//--------------------------------------------


    render() {
        return (

<div className="Content" id={this.props.city}> 
    <p className="routeAnschreiben">{this.props.city}</p>


    <Bild route={this.props.city} punkt={this.props.punkt} />
    <Text route={this.props.city} punkt={this.props.punkt} saveAnswer={this.saveAnswer} killAnswer={this.state.answer} />
    <Arrows route={this.props.city} punkt={this.props.punkt} changeBack={this.changeBack} changeForward={this.changeForward} killAnswer={this.killAnswer}/>

</div>


        )
    }
}

export default Content;