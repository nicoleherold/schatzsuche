// const baseUrl = 'http://localhost:5000/'
//const baseUrl = 'https://bzschatzsuche.herokuapp.com/'
// const baseUrl = process.env.NODE_ENV === 'production' ? 'https://bzschatzsuche.herokuapp.com/' : 'http://localhost:3000';
const baseUrl = window.location.hostname === 'localhost' ? 'http://localhost:5000/': 'https://bzschatzsuche.herokuapp.com/'

export {baseUrl}