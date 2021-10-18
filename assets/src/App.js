import React, {useState} from 'react';
import Header from './components/Header/Header';
import LoginForm from './components/LoginForm/LoginForm';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import Home from './components/Home/Home';
import PrivateRoute from './utils/PrivateRoute';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Alert from './components/Alert/Alert';
import FactuurForm from './components/Factuur/FactuurForm';

function App() {
  
  const [errorMessage, updateErrorMessage] = useState(null);
  return (
    <Router>
    <div className="App">
      <Header />
      <div className="container d-flex align-items-center flex-column">
        <Switch>
          <Route path="/" exact={true}>
            <RegistrationForm showError={updateErrorMessage} />
          </Route>
          <Route path="/register">
            <RegistrationForm showError={updateErrorMessage} />
          </Route>
          <Route path="/login">
            <LoginForm showError={updateErrorMessage} />
          </Route>
          <PrivateRoute path="/home">
            <Home/>
          </PrivateRoute>
          <PrivateRoute path="/voegfactuurtoe">
            <FactuurForm showError={updateErrorMessage} />
          </PrivateRoute>
        </Switch>
        <Alert errorMessage={errorMessage} hideError={updateErrorMessage}/>
      </div>
    </div>
    </Router>
  );
}

export default App;
