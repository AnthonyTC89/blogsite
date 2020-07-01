import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../redux/store';
import Home from './Home';
import SignIn from './SignIn';
import SignUp from './SignUp';

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/signup" component={SignUp} exact />
        <Route path="/login" component={SignIn} exact />
        <Route path="/" component={Home} exact />
      </Switch>
      <Redirect to="/signup" />
    </BrowserRouter>
  </Provider>
);

export default App;
