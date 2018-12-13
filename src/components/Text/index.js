// Backend auf https://bzschatzsuche.herokuapp.com/


import React, { Component } from 'react';
import './index.css';
import bern from '../../routen/bern.json'
import lenk from '../../routen/lenk.json'
import riggisberg from '../../routen/riggisberg.json'
import spiez from '../../routen/spiez.json'
import langenthal from '../../routen/langenthal.json'
import hakengruen from './hakengruen.svg'
import hakenrot from './hakenrot.svg'
import {baseUrl} from '../../constants.js'


const content = {
    bern,
    lenk,
    riggisberg,
    spiez,
    langenthal,
}



class Text extends Component {
    constructor(props) {
        super(props);
        this.state = {
            answer: '',
            showButtonInput: true,
            allAnswers: [],
            numberToShow: '',
            key1:'',
            key2: '',
            key3: '',
        };
    }


    handleInputChangeAnswer = (e) => {
        const answerInput = e.currentTarget.value;
        this.setState({ answer: answerInput });

    }

    //-----------------------------------------------------------------

    componentDidMount = () => {
        this.fetchReadAnswers();

    }
    //---------------------------------------------------
    fetchReadAnswers = async () => {

        try {

            const token = localStorage.getItem('x-access-token');
            console.log(token)


            const options = {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'x-access-token': `${token}`

                }),
            };
            const url = `${baseUrl}read`;

            const response = await fetch(url, options);
            const answer = await response.json();
            console.log(answer);
            console.log(answer.answers)

            //speichert array mit allen Antworten (die objekte sind) in state.
            this.setState({ allAnswers: answer.answers });

            //       const answerForThisPoint = await this.state.allAnswers.filter((answer, index) => {
            //           return (answer.route === this.props.route && answer.point === this.props.punkt)

            //       })

            // console.log (answerForThisPoint)

            //   return answer;
            // await(this.setState({token: tokenFromFetch}));



        } catch (e) {
            console.error(`Error in fetch Answers from user GET 😱😱😱😱: ${e}`);
        }
    }


    //---------------------------------------------------





    //------------------------------------------------------------------
    showText = () => {

        const punkt = this.props.punkt
        console.log(punkt)
        console.log(this.props.route)

        if (this.props.route === 'bern') {
            const ausgabe = <div className="text">{bern[punkt].text}</div>
            return ausgabe
        }

        if (this.props.route === 'spiez') {
            const ausgabe = <div className="text">{spiez[punkt].text}</div>
            return ausgabe
        }

        if (this.props.route === 'langenthal') {
            const ausgabe = <div className="text">{langenthal[punkt].text}</div>
            return ausgabe
        }

        if (this.props.route === 'lenk') {
            const ausgabe = <div className="text">{lenk[punkt].text}</div>
            return ausgabe
        }

        if (this.props.route === 'riggisberg') {
            const ausgabe = <div className="text">{riggisberg[punkt].text}</div>
            return ausgabe
        }



    }

    //--------------------------------------------------------

    toggleButton = () => {
        const { showButtonInput } = this.state;

        this.setState({ showButtonInput: !showButtonInput });


    }

    //------------------------------------------------------

    //-------------------------------------------
    saveAnswerinState =  (answer) => {
        console.log('hallo from saveAnserInState', answer)
        console.log('alle Answers', this.state.allAnswers)
        let newPunkt = '' + this.props.punkt ;
        let newAnswer = {
            "route": this.props.route,
            "point": newPunkt,
            "answer": this.state.answer
        }

        let moreAnswers = [...this.state.allAnswers, newAnswer];
        this.setState({ allAnswers: moreAnswers })
        console.log(this.state.allAnswers)
        this.setState({ answer: '' })

    }
    //-------------------------------------------------------
    deleteAnswerInState = () => {
        console.log('hallo from deleteAnswerInState')
        console.log('alle Answers', this.state.allAnswers)
        let newPunkt = this.props.punkt + '';
        // let answerToDelet = {
        //     "route": this.props.route, 
        //     "point": newPunkt,
        //   }

        // const items = ['a', 'b', 'c', 'd', 'e', 'f']
        // const valueToRemove = 'c'
        // const filteredItems = items.filter(item => item !== valueToRemove)
        // // ["a", "b", "d", "e", "f"]
        console.log(newPunkt)

        let newArray = [...this.state.allAnswers];

        let filteredItems = newArray.filter(item => item.point !== newPunkt)
        console.log('filteredItems', filteredItems);

        this.setState({ allAnswers: filteredItems })



    }

    //--------------------------------------------------------
    giveAnswer = () => {
        let numberToShow = ''

        const punkt = this.props.punkt
        console.log(punkt)
        console.log(this.props.route);

        const notes = content[this.props.route][punkt].notes;


        let givenAnswer = this.state.allAnswers.find(answer => {
            return answer.route === this.props.route && parseInt(answer.point) === parseInt(this.props.punkt)
        })
        console.log('Current point', this.props.punkt)
        console.log('Current route', this.props.route)
        console.log('All answers', this.state.allAnswers)
        console.log('Found answer', givenAnswer)

        if (givenAnswer) {
            let number = givenAnswer.answer;
            console.log('eingegebene Number:', number)
            numberToShow = number;
        }

        if (notes === 'true' && !numberToShow) {


            return (
                <>
                    <input type="text" className="answer" value={this.state.answer} route="bern" punkt={this.props.punkt} onChange={this.handleInputChangeAnswer} />
                    <button className="submit" onClick={() => { this.props.saveAnswer(this.state.answer); this.saveAnswerinState(this.state.answer); this.codeQuestion() }}>speichern</button>
                </>
            )
        }
        if (notes === 'true' && numberToShow)
            return (
                <>
                    <p className="givenAnswer">{numberToShow}</p>
                    <button className="change" onClick={() => { this.deleteAnswerInState(); }}>ändern</button>

                </>
            )
    }


    //-----------------------ende giveAnswer-------------------------------------
    //---------------------beginn codeQuestion ----------------------------------

    codeQuestion = () => {
        const punkt = this.props.punkt
        let newPunkt = punkt + '';

        const textcode = content[this.props.route][punkt].textcode;
        const code = content[this.props.route][punkt].code;

        let allAnswersThere = [...this.state.allAnswers];

        let correctCode = content[this.props.route][punkt].answercode
        console.log('das ist der correctCode für den Key: ', correctCode)

        // let filteredItems = allAnswersThere.filter(item => item.point !== newPunkt)
        // console.log('filteredItems', filteredItems);



        if (code === 'true') {

            let key = '';

            //-----------------Beginn Vorgaben -------------------------------------------
            //---------Vorgaben-bern 1--------------


            if
            (this.props.route === 'bern' && newPunkt === '6'
            && ((allAnswersThere.filter(item => item.point === '2' && item.route === 'bern').length) > 0)
            && ((allAnswersThere.filter(item => item.point === '3' && item.route === 'bern').length) > 0)
            && ((allAnswersThere.filter(item => item.point === '4' && item.route === 'bern').length) > 0)
                && ((allAnswersThere.filter(item => item.point === '6').length) > 0)) {
                //----Werte auslesen---------------
                const antwort2 = allAnswersThere.filter(item => item.point === '2' && item.route === 'bern');
                const a2 = parseInt(antwort2[0].answer);
                const antwort3 = allAnswersThere.filter(item => item.point === '3' && item.route === 'bern');
                const a3 = parseInt(antwort3[0].answer);
                const antwort4 = allAnswersThere.filter(item => item.point === '4' && item.route === 'bern');
                const a4 = parseInt(antwort4[0].answer);
                const antwort6 = allAnswersThere.filter(item => item.point === '6' && item.route === 'bern');
                const a6 = parseInt(antwort6[0].answer);
                //-------------Werte auslesen fertig
                const keybern6 = a2 - a3 + a4 - a6;
                localStorage.setItem('bernkey1', keybern6);
                // this.setState({key1: keybern6})
                key = keybern6;

            }

            //---------Vorgaben--bern2-------------
            if (this.props.route === 'bern' && newPunkt === '11'
                && ((allAnswersThere.filter(item => item.point === '7' && item.route === 'bern').length) > 0)
                && ((allAnswersThere.filter(item => item.point === '8' && item.route === 'bern').length) > 0)
                && ((allAnswersThere.filter(item => item.point === '10' && item.route === 'bern').length) > 0)
                && ((allAnswersThere.filter(item => item.point === '11' && item.route === 'bern').length) > 0)) {
                //----Werte auslesen---------------
                const antwort7 = allAnswersThere.filter(item => item.point === '7' && item.route === 'bern');
                const a7 = parseInt(antwort7[0].answer);
                const antwort8 = allAnswersThere.filter(item => item.point === '8' && item.route === 'bern');
                const a8 = parseInt(antwort8[0].answer);
                const antwort10 = allAnswersThere.filter(item => item.point === '10' && item.route === 'bern');
                const a10 = parseInt(antwort10[0].answer);
                const antwort11 = allAnswersThere.filter(item => item.point === '11' && item.route === 'bern');
                const a11 = parseInt(antwort11[0].answer);
                //-------------Werte auslesen fertig
                const keybern11 = a7 + a8 + a10 - a11;
                localStorage.setItem('bernkey2', keybern11);
                // this.setState({key2: keybern11})
                key = keybern11;

            }

            //---------Vorgaben--bern3-------------
            if (this.props.route === 'bern' && newPunkt === '18'
                && ((allAnswersThere.filter(item => item.point === '15' && item.route === 'bern').length) > 0)
                && ((allAnswersThere.filter(item => item.point === '18' && item.route === 'bern').length) > 0)) {
                //----Werte auslesen---------------
                const antwort15 = allAnswersThere.filter(item => item.point === '15' && item.route === 'bern');
                const a15 = parseInt(antwort15[0].answer);
                const antwort18 = allAnswersThere.filter(item => item.point === '18' && item.route === 'bern');
                const a18 = parseInt(antwort18[0].answer);
                //-------------Werte auslesen fertig
                const keybern18 = a15 - a18;
                localStorage.setItem('bernkey3', keybern18);
                // this.setState({key3: keybern18})
                key = keybern18;

            }

            //---------Vorgaben-riggisberg 2--------------
            if (this.props.route === 'riggisberg' && newPunkt === '7'
                && ((allAnswersThere.filter(item => item.point === '6' && item.route === 'riggisberg').length) > 0)
                && ((allAnswersThere.filter(item => item.point === '7' && item.route === 'riggisberg').length) > 0)) {
                //----Werte auslesen---------------
                const antwort6 = allAnswersThere.filter(item => item.point === '6' && item.route === 'riggisberg');
                const a6 = parseInt(antwort6[0].answer);
                const antwort7 = allAnswersThere.filter(item => item.point === '7' && item.route === 'riggisberg');
                const a7 = parseInt(antwort7[0].answer);
                //-------------Werte auslesen fertig
                const keyriggisberg7 = a6 / a7;
                localStorage.setItem('riggisbergkey2', keyriggisberg7);
                // this.setState({key2: keyriggisberg7})
                key = keyriggisberg7;

            }

            //---------Vorgaben-riggisberg 1--------------
            if (this.props.route === 'riggisberg' && newPunkt === '5'
                && ((allAnswersThere.filter(item => item.point === '3' && item.route === 'riggisberg').length) > 0)
                && ((allAnswersThere.filter(item => item.point === '4' && item.route === 'riggisberg').length) > 0)
                && ((allAnswersThere.filter(item => item.point === '5' && item.route === 'riggisberg').length) > 0)) {
                const newAllAnswers = [...this.state.allAnswers]
                console.log("newAllAnswers", newAllAnswers)
                //----Werte auslesen---------------
                const antwort3 = newAllAnswers.filter(item => item.point === '3' && item.route === 'riggisberg' );
                const a3 = parseInt(antwort3[0].answer);
                console.log('antwort a3 riggi:', a3)
                const antwort4 = newAllAnswers.filter(item => item.point === '4' && item.route === 'riggisberg');
                const a4 = parseInt(antwort4[0].answer);
                console.log('antwort a4 riggi:', a4)
                const antwort5 = newAllAnswers.filter(item => item.point === '5' && item.route === 'riggisberg');
                const a5 = parseInt(antwort5[0].answer);
                console.log('antwort a5 riggi:', a5)
                //-------------Werte auslesen fertig
                const keyriggisberg5 = a3 - a4 + a5;
                localStorage.setItem('riggisbergkey1', keyriggisberg5);
                // this.setState({key1: keyriggisberg5})
                key = keyriggisberg5;

            }

            //---------Vorgaben-riggisberg 3--------------
            if (this.props.route === 'riggisberg' && newPunkt === '13'
                && ((allAnswersThere.filter(item => item.point === '11' && item.route === 'riggisberg').length) > 0)
                && ((allAnswersThere.filter(item => item.point === '13' && item.route === 'riggisberg').length) > 0)) {
                //----Werte auslesen---------------
                const antwort11 = allAnswersThere.filter(item => item.point === '11' && item.route === 'riggisberg');
                const a11 = parseInt(antwort11[0].answer);
                console.log('antwort a11 riggi:', a11)
                console.log(this.state.allAnswers)
                const antwort13 = allAnswersThere.filter(item => item.point === '13' && item.route === 'riggisberg');
                const a13 = parseInt(antwort13[0].answer);
                console.log('antwort a13 riggi:', a13)
                //-------------Werte auslesen fertig
                const keyriggisberg13 = a13 - a11;
                localStorage.setItem('riggisbergkey3', keyriggisberg13);
                // this.setState({key3: keyriggisberg13})
                key = keyriggisberg13;

            }

            //---------Vorgaben--spiez 1-------------
            if (this.props.route === 'spiez' && newPunkt === '6'
                && ((allAnswersThere.filter(item => item.point === '3' && item.route === 'spiez').length) > 0)
                && ((allAnswersThere.filter(item => item.point === '5' && item.route === 'spiez').length) > 0)
                && ((allAnswersThere.filter(item => item.point === '6' && item.route === 'spiez').length) > 0)) {
                //----Werte auslesen---------------
                const antwort3 = allAnswersThere.filter(item => item.point === '3' && item.route === 'spiez');
                const a3 = parseInt(antwort3[0].answer);
                const antwort5 = allAnswersThere.filter(item => item.point === '5' && item.route === 'spiez');
                const a5 = parseInt(antwort5[0].answer);
                const antwort6 = allAnswersThere.filter(item => item.point === '6' && item.route === 'spiez');
                const a6 = parseInt(antwort6[0].answer);
                //-------------Werte auslesen fertig
                const keyspiez6 = a3 - a5 - a6;
                localStorage.setItem('spiezkey1', keyspiez6);
                // this.setState({key1: keyspiez6})
                key = keyspiez6;

            }

            //---------Vorgaben--spiez 2-------------
            if (this.props.route === 'spiez' && newPunkt === '11'
                && ((allAnswersThere.filter(item => item.point === '8' && item.route === 'spiez').length) > 0)
                && ((allAnswersThere.filter(item => item.point === '9' && item.route === 'spiez').length) > 0)
                && ((allAnswersThere.filter(item => item.point === '11' && item.route === 'spiez').length) > 0)) {
                //----Werte auslesen---------------
                const antwort8 = allAnswersThere.filter(item => item.point === '8' && item.route === 'spiez');
                const a8 = parseInt(antwort8[0].answer);
                const antwort9 = allAnswersThere.filter(item => item.point === '9' && item.route === 'spiez');
                const a9 = parseInt(antwort9[0].answer);
                const antwort11 = allAnswersThere.filter(item => item.point === '11' && item.route === 'spiez');
                const a11 = parseInt(antwort11[0].answer);
                //-------------Werte auslesen fertig
                const keyspiez11 = a8 + a9 - a11;
                localStorage.setItem('spiezkey2', keyspiez11);
                // this.setState({key2: keyspiez11})
                key = keyspiez11;

            }

            //---------Vorgaben--spiez 3-------------
            if (this.props.route === 'spiez' && newPunkt === '14'
                && ((allAnswersThere.filter(item => item.point === '14' && item.route === 'spiez').length) > 0)) {
                //----Werte auslesen---------------
                const antwort14 = allAnswersThere.filter(item => item.point === '14' && item.route === 'spiez');
                const a14 = parseInt(antwort14[0].answer);
                //-------------Werte auslesen fertig
                const keyspiez14 = a14;
                localStorage.setItem('spiezkey3', keyspiez14);
                // this.setState({key3: keyspiez14})
                key = keyspiez14;

            }

            //---------Vorgaben--lenk 1-------------
            if (this.props.route === 'lenk' && newPunkt === '4'
                && ((allAnswersThere.filter(item => item.point === '4' && item.route === 'lenk').length) > 0)) {
                //----Werte auslesen---------------
                const antwort4 = allAnswersThere.filter(item => item.point === '4' && item.route === 'lenk');
                const a4 = parseInt(antwort4[0].answer);
                //-------------Werte auslesen fertig
                const keylenk6 = a4;
                localStorage.setItem('lenkkey1', keylenk6);
                // this.setState({key1: keylenk6})
                key = keylenk6;

            }

            //---------Vorgaben--lenk 2-------------
            if (this.props.route === 'lenk' && newPunkt === '8'
                && ((allAnswersThere.filter(item => item.point === '6' && item.route === 'lenk').length) > 0)
                && ((allAnswersThere.filter(item => item.point === '8' && item.route === 'lenk').length) > 0)) {
                //----Werte auslesen---------------
                const antwort6 = allAnswersThere.filter(item => item.point === '6' && item.route === 'lenk');
                const a6 = parseInt(antwort6[0].answer);
                const antwort8 = allAnswersThere.filter(item => item.point === '8' && item.route === 'lenk');
                const a8 = parseInt(antwort8[0].answer);
                //-------------Werte auslesen fertig
                const keylenk8 = a6 - a8;
                localStorage.setItem('lenkkey2', keylenk8);
                // this.setState({key2: keylenk8})
                key = keylenk8;

            }

            //---------Vorgaben--lenk 3-------------
            //WICHTIG: ALLE EINSEN ZAEHLEN ______NICHT default!!!!
            if (this.props.route === 'lenk' && newPunkt === '17'
                && ((allAnswersThere.filter(item => item.point === '12' && item.route === 'lenk').length) > 0)
                && ((allAnswersThere.filter(item => item.point === '15' && item.route === 'lenk').length) > 0)
                && ((allAnswersThere.filter(item => item.point === '17' && item.route === 'lenk').length) > 0)) {
                //----Werte auslesen---------------
                const antwort12 = allAnswersThere.filter(item => item.point === '12' && item.route === 'lenk');
                const a12 = antwort12[0].answer;
                const antwort15 = allAnswersThere.filter(item => item.point === '15' && item.route === 'lenk');
                const a15 = antwort15[0].answer;
                const antwort17 = allAnswersThere.filter(item => item.point === '17' && item.route === 'lenk');
                const a17 = antwort17[0].answer;
                //-------------Werte auslesen fertig
                const allStringAnswerCounted = a12 + a15 + a17;
                console.log(allStringAnswerCounted);
                const keylenk17 = a12 + a15 + a17;

                let einser = 0;
                let alleEinser = 0;

                for (let i = 0; i < keylenk17.length; i++) {
                    if (keylenk17[i] === '1') {
                        einser = einser + 1;
                    }
                    alleEinser = einser;
                }

                localStorage.setItem('lenkkey3', alleEinser);
                key = alleEinser;

            }

            //---------Vorgaben--langenthal 1-------------
            if (this.props.route === 'langenthal' && newPunkt === '6'
                && ((allAnswersThere.filter(item => item.point === '3' && item.route === 'langenthal').length) > 0)
                && ((allAnswersThere.filter(item => item.point === '5' && item.route === 'langenthal').length) > 0)
                && ((allAnswersThere.filter(item => item.point === '6' && item.route === 'langenthal').length) > 0)) {
                //----Werte auslesen---------------
                const antwort3 = allAnswersThere.filter(item => item.point === '3' && item.route === 'langenthal');
                const a3 = parseInt(antwort3[0].answer);
                const antwort5 = allAnswersThere.filter(item => item.point === '5' && item.route === 'langenthal');
                const a5 = parseInt(antwort5[0].answer);
                const antwort6 = allAnswersThere.filter(item => item.point === '6' && item.route === 'langenthal');
                const a6 = parseInt(antwort6[0].answer);
                //-------------Werte auslesen fertig
                const keylangenthal6 = a3 - a5 - a6;
                localStorage.setItem('langenthalkey1', keylangenthal6);
                key = keylangenthal6;

            }

            //---------Vorgaben--langenthal 2-------------
            if (this.props.route === 'langenthal' && newPunkt === '11'
                && ((allAnswersThere.filter(item => item.point === '8' && item.route === 'langenthal').length) > 0)
                && ((allAnswersThere.filter(item => item.point === '11' && item.route === 'langenthal').length) > 0)) {
                //----Werte auslesen---------------
                const antwort8 = allAnswersThere.filter(item => item.point === '8' && item.route === 'langenthal');
                const a8 = antwort8[0].answer;
                const antwort11 = allAnswersThere.filter(item => item.point === '11' && item.route === 'langenthal');
                const a11 = antwort11[0].answer;
                //-------------Werte auslesen fertig
                console.log('langenthal punkt8: ', a8)
                console.log('langenthal punkt11: ', a11)
                const allStringAnswerCounted = a8 + a11;
                console.log('im langenthal key 2 : ', allStringAnswerCounted)

                let count = allStringAnswerCounted.split('1').length - 1;

                localStorage.setItem('langenthalkey2', count);
                key = count;

            }

            //---------Vorgaben--langenthal 3-------------
            if (this.props.route === 'langenthal' && newPunkt === '17'
                && ((allAnswersThere.filter(item => item.point === '13' && item.route === 'langenthal').length) > 0)
                && ((allAnswersThere.filter(item => item.point === '17' && item.route === 'langenthal').length) > 0)) {
                //----Werte auslesen---------------
                const antwort13 = allAnswersThere.filter(item => item.point === '13' && item.route === 'langenthal');
                const a13 = parseInt(antwort13[0].answer);
                const antwort17 = allAnswersThere.filter(item => item.point === '17' && item.route === 'langenthal');
                const a17 = parseInt(antwort17[0].answer);
                //-------------Werte auslesen fertig
                const keylangenthal17 = a13 - a17;
                localStorage.setItem('langenthalkey3', keylangenthal17);
                key = keylangenthal17;

            }

            const ausgabe = <>
                <div className="text">
                    {key ? <>{textcode}</> : null}
                </div>
                <div className="textkey">
                <p className="keys">{key}</p>
                    {key && key === parseInt(correctCode) ? <div className="kontrolle" ><img src={hakengruen}  alt="Bild" /></div> : <></>}
                    {key && key !== parseInt(correctCode) ? <div className="kontrolle"><img src={hakenrot}  alt="Bild" /></div> : <></>}
                </div>
            </>
            return ausgabe
        } else {

            return null
        }


        //     //----------------spiez--------------
        //     if ((this.props.route === 'spiez')&&(spiez[punkt].code === 'true')){

        //         const ausgabe = <div className="text">{spiez[punkt].textcode}</div>
        //         return ausgabe 
        // }
        //     //----------------riggisberg--------------
        //     if ((this.props.route === 'riggisberg')&&(riggisberg[punkt].code === 'true')){

        //         const ausgabe = <div className="text">{riggisberg[punkt].textcode}</div>
        //         return ausgabe 
        // }
        //     //----------------langenthal--------------
        //     if ((this.props.route === 'langenthal')&&(langenthal[punkt].code === 'true')){

        //         const ausgabe = <div className="text">{langenthal[punkt].textcode}</div>
        //         return ausgabe 
        // }
        //     //----------------lenk-------------
        //     if ((this.props.route === 'lenk')&&(lenk[punkt].code === 'true')){

        //         const ausgabe = <div className="text">{lenk[punkt].textcode}</div>
        //         return ausgabe 
        // }


    }

    //---------------------------------------------------


    end = () => {

        if((this.props.route === 'bern' && this.props.punkt === '19') || (this.props.route === 'spiez' && this.props.punkt === '16') || (this.props.route === 'lenk' && this.props.punkt === '18') || (this.props.route === 'riggisberg' && this.props.punkt === '16') || (this.props.route === 'langenthal' && this.props.punkt === '18')) {

        const punkt = this.props.punkt;
        const end = content[this.props.route][punkt].end;
        const endtext = content[this.props.route][punkt].endtext;

        let key1 = localStorage.getItem(this.props.route + 'key1');
        console.log('key1 in anzeige: ', key1)

        let key2 = localStorage.getItem(this.props.route + 'key2');
        console.log('key2 in anzeige: ', key2)

        let key3 = localStorage.getItem(this.props.route + 'key3');
        console.log('key3 in anzeige: ', key3)

        console.log('key1 aus Solution: ', content[this.props.route][punkt].key1)
        console.log('key2 aus Solution: ', content[this.props.route][punkt].key2)
        console.log('key3 aus Solution: ', content[this.props.route][punkt].key3)

        if (end === 'true' && key1 && key2 && key3) {
            return <>
                <p className="amZiel">
                    {endtext}
                </p>
                <div className="showHoleCode">
                    <p className="keys" id={ parseInt(key1) === parseInt(content[this.props.route][punkt].key1) ? 'greenSolution' : 'redSolution' }>{key1}</p>
                    <p className="keys" id={parseInt(key2) === parseInt(content[this.props.route][punkt].key2) ? 'greenSolution' : 'redSolution' }>{key2}</p>
                    <p className="keys" id={parseInt(key3) === parseInt(content[this.props.route][punkt].key3) ? 'greenSolution' : 'redSolution' }>{key3}</p>
                </div>
            </>


                }else {
            return null
            }

        } else {
            return null
        } 
        }
    
    
    //-----------------------------------------------------
    
    render() {
        return (
            <>

                    {this.showText()}
                    {this.giveAnswer()}
                    {this.codeQuestion()}
                    {this.end()}

                </>


                )
        
            }
        
        }
        
        
        export default Text;
        
