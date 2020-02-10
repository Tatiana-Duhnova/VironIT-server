import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Autorization from './main/login';
import Registration from './main/registration';
import UserInfo from './main/userinfo';
import Redaction from './main/redaction';

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
