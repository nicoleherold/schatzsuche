import React, { Component } from 'react';
import './index.css';
// import Header from '../Header';
import Register from '../Register';
import Login from '../Login';
import Logout from '../Logout';
import info from './info_b.svg'
import karte from './karte_b.svg'
import truhe from './truhe_b.svg'
import menu from './menu_b.svg'
import { Link } from "react-router-dom";
import bzss from './bzss.png';
import {baseUrl} from '../../constants.js'

// import App from '../App';


class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      emailApp: 'You are logged OUT!',
      passwordApp: 'Password',
      usernameApp: 'Username',
      token: '',
      userId: '',


    };
  }

  //_------------------------------------------------
  saveLogin = async (username, email, password) => {
    const AppUsername = username;
    console.log('username in HomeState: ' + AppUsername)

    const AppMail = email;
    console.log('email in HomeState: ' + AppMail)

    const AppPassword = password;
    console.log('password in HomeState: ' + AppPassword);

    await (this.setState({ usernameApp: AppUsername }));

    await (this.setState({ emailApp: AppMail }));

    await (this.setState({ passwordApp: AppPassword }));




    // Email und Password sind im State gespeichert!!!

    //Jetzt werden Daten per POST Request an API übergeben, sollte token zurückkommmen

    this.fetchRegistration();
  }

  //---------------------------------------------------
  login = (email, password) => {
    const AppMail = email;
    console.log('email in app: ' + AppMail)
    const AppPassword = password;
    console.log('password in app: ' + AppPassword);

    this.setState({ passwordApp: AppPassword, emailApp: AppMail }, this.fetchLogin);
    // this.setState({ passwordApp: AppPassword, emailApp: AppMail }, () => { this.fetchLogin(); });

    // Email und Password sind im State gespeichert!!!

    //Jetzt werden Daten per POST Request an API übergeben, sollte token zurückkommmen



  }

  //--------------------------------------------------------------------
  // Mima token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pbWFAZ21haWwuY29tIiwiaWF0IjoxNTQ0MTc0ODA1fQ.lOlBIx4zm8mERWFCkoePEE63HeJqS__Sb_S8Z9DmiMU"
  // Tomi token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRvbWlAZ21haWwuY29tIiwiaWF0IjoxNTQ0MTc2MDAyfQ.SBJwN_GxDHyIFwylS_l2IEQ5XQq55TdraJ2Bw9IvxLg"
  // lola token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImxvbGFAZ21haWwuY29tIiwiaWF0IjoxNTQ0MTc3MDI2fQ.rnOnVlAZOS66yLrvQ1Koob7Mn90DkMtR4q7Yf7FR8zo"
  // Aila token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFpbGFAZ21haWwuY29tIiwiaWF0IjoxNTQ0MTc3MzQ3fQ.Frz9IY_lBeT7zdVffgx6f7lnZf8aliSHpQhKo8htjFE"
  // Luna token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imx1bmFAZ21haWwuY29tIiwiaWF0IjoxNTQ0MTc3NjMwfQ.wjPslT_w2HUADE5d39zxdY8H6vEbkRv2yYwppJP5_P4"
  // Tedd token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlZGRAZ21haWwuY29tIiwiaWF0IjoxNTQ0MTkwODM1fQ.BGPp1ZQcV5ud5I3V5B5VKYEpq4iz8bZoBBEnyyWnPLM"




  fetchRegistration = async () => {
    try {

      const data = {
        "username": this.state.usernameApp,
        "email": this.state.emailApp,
        "password": this.state.passwordApp
      }
      const options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
      };
      const url = `${baseUrl}signup`;
      const response = await fetch(url, options);
      const answer = await response.json();
      console.log(answer);

      // return should have the token!!!!

      const tokenFromFetch = answer.token
      const usernameFromFetch = answer.username

      console.log('Aus answer token: ' + tokenFromFetch)
      // console.log ('UserName from fetch: ' + answer.dataToSend.username)

      // await (this.setState({ token: tokenFromFetch }));
      // await (this.setState({ usernameFetch: usernameFromFetch }));

      // // I have to save the token in localSorage!
      localStorage.clear();
      localStorage.setItem('x-access-token', tokenFromFetch);
      localStorage.setItem('username', usernameFromFetch);
      this.setState({ username: usernameFromFetch, token: tokenFromFetch });


      // const tokenFromFetch = answer.token
      // const usernameFetch = answer.username


      // localStorage.clear();
      // localStorage.setItem('x-access-token', tokenFromFetch);
      // localStorage.setItem('username', usernameFetch);
      // this.setState({ username: usernameFetch, token: tokenFromFetch });




    } catch (e) {
      console.error(`Error in login fetch post 😱😱😱😱: ${e}`);
    }
  }


  //--------------------------------------------------


  fetchLogin = async () => {
    try {
      const data = {
        "email": this.state.emailApp,
        "password": this.state.passwordApp
      }
      const options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
          'Content-Type': 'application/json',
          // 'email': this.state.emailApp,
          // 'password': this.state.passwordApp
        }),
      };
      const url = `${baseUrl}login`; 
      const response = await fetch(url, options);
      const answer = await response.json();
      console.log(answer);

      // return should have the token!!!!

      const tokenFromFetch = answer.token
      const usernameFetch = answer.username
      // console.log('token: ' + tokenFromFetch)

      localStorage.clear();
      localStorage.setItem('x-access-token', tokenFromFetch);
      localStorage.setItem('username', usernameFetch);
      this.setState({ username: usernameFetch, token: tokenFromFetch });

      // const emailFromFetch = answer.email;
      // console.log('E-Mail: ' + emailFromFetch)
      // await(this.setState({emailApp: emailFromFetch}));

      // console.log('userId: ' + userIdFromFetch)


      // // I have to save the token in localSorage!
      // localStorage.setItem('email', this.state.emailApp);

    } catch (e) {
      console.error(`Error in login fetch post 😱😱😱😱: ${e}`);
    }
  }


  //--------------------------------------------------

  showRegLog = () => {
    const usernameInLS = localStorage.getItem('username');
    const tokenInLS = localStorage.getItem('x-access-token')
// debugger;
    if (!usernameInLS && !tokenInLS) {
      return (
        <>
          <h2>Hallo lieber Schatzsucher. Melde dich an oder logge dich ein und wähle dann deine Route!</h2>
          <Register save={this.saveLogin} />
          <Login login={this.login} />
        </>
      )
    }
    else {
      return (
        <>
          <h2>Du bist angemeldet zur BZ Schatzsuche als {usernameInLS}.</h2>
          <Logout logout={this.logout}/>
          {this.selectRoute()}
        </>
      )
    }


  }

  //-----------------------------------------------



  logout = () => {

    localStorage.clear();
    const userFromLS = localStorage.getItem('username');
    const tokenFromLS = localStorage.getItem('x-access-token');

    this.setState({ usernameApp: userFromLS, token: tokenFromLS });
}



//-----------------------------------------------


//-----------------------------------------------

selectRoute = () => {
  return(
    <div>
    <h2>Wähle nun deine Route:</h2>
    <button className="route" id="buttonbern" onClick={() => { this.toRoute('bern', 0) }}>Bern</button>
    <button className="route" id="buttonriggisberg" onClick={() => { this.toRoute('riggisberg', 0) }}>Riggisbern</button>
    <button className="route" id="buttonlangenthal" onClick={() => { this.toRoute('langenthal', 0) }}>Langenthal</button>
    <button className="route" id="buttonspiez" onClick={() => { this.toRoute('spiez', 0) }}>Spiez</button>
    <button className="route" id="buttonlenk"onClick={() => { this.toRoute('lenk', 0) }}>Lenk</button>
    </div>
  );
}


//------------------------------------------------
toRoute = (route, punkt) =>{
  this.props.history.push(`/routes/${route}/${punkt}/`)
}
toLastRoute = () => {
  const lastRoute = localStorage.getItem('lastRoute')
  if (lastRoute) {
    this.props.history.push(lastRoute)
  } else {
    console.log('Last route not found!')
  }
}



//---------------------------------------------



  render() {
    return (
      <div className="Home">
        {/* <Header /> */}
        <>
        <img src={bzss} className="bild" alt="Bild" />
        </>
        <div className="hallo">{this.showRegLog()}</div>





        {/*         
        <Register save={this.saveLogin}/>
        <Login login={this.login}/> */}





        {/* Footer Beginn */}

        <footer className="Footer">
          <div className="activeLink">
            <img src={menu} className="icon" alt="logo" />
          </div>
          <div className="link">
            <Link to="/infos"><img src={info} className="icon" alt="info" /></Link></div>
            <div className="link"onClick={this.toLastRoute}><img src={karte} className="icon" alt="karte" /></div>
          <div className="link"><Link to="/code"><img src={truhe} className="icon" alt="truhe" /></Link></div>

        </footer>

        {/* Footer End */}



      </div>
    );
  }
}

export default Home;