import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Autorization from '../src/main/login';
import Registration from '../src/main/registration';
import UserInfo from '../src/main/userInfo';
import Redaction from '../src/main/redaction';

export default class App extends React.Component {
  render() {
    return (
      <Switch>
          <Route exact path='/' component={Autorization}/>
          <Route exact path='/registration' component={Registration}/>
          <Route exact path='/userInfo' component={UserInfo}/>
          <Route exact path='/redactionInfo' component={Redaction}/>
      </Switch>
    );
  }
}
