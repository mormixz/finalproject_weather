import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'semantic-ui-css/semantic.min.css'

const initialDB = {
    "ListID" :[
        {
            "id":1609350,
            "lng": 100.51667,
            "lat": 13.75
        }
    ]
}
const DB = localStorage.getItem('ListID')

if(DB){
    localStorage.setItem('ListID',DB)
}else{
    localStorage.setItem('ListID',JSON.stringify(initialDB.ListID))
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
