//Modules
import React from 'react';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import './App.css';
import firebase from 'firebase/app';
//Components
import Header from './components/Header';

//Routes
import Home from './routes/Home';
import Login from './routes/Login';
import Register from './routes/Register';



const firebaseConfig = {
  apiKey: "AIzaSyCr8ldaw6ys8ftgqD3ihGz4M6OkM4GtuxI",
  authDomain: "indic-translator.firebaseapp.com",
  databaseURL: "https://indic-translator.firebaseio.com",
  projectId: "indic-translator",
  storageBucket: "indic-translator.appspot.com",
  messagingSenderId: "936001225751",
  appId: "1:936001225751:web:6cbe05e426ecf695e08852",
  measurementId: "G-0FCEH86345"
};

firebase.initializeApp(firebaseConfig);

function App() {
  return (
      <Router>
      <Header />
        <Switch>
          <Route component={Login} path="/login"/>
          <Route component={Register} path="/register"/>
          <Route component={Home} path="/"/>
        </Switch>
      </Router>
  );
}

export default App;
