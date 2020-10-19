import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';


window.onload = function () {
   document.getElementById('Container').style.zIndex = '-999'
    setTimeout(function (){
        document.getElementById('Loader').style.zIndex = '-999'
        document.getElementById('Container').style.zIndex = '0'
    }, 2000)

}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
