import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './reducers'

import Home from './components/Home';
import Create from './components/Create';
import NotFound from './components/NotFound';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to={'/'} className="nav-link">Home</Link>
                </li> 
              </ul>
            </div>
          </nav> <br />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/create' component={Create}></Route>
            <Route exact path='/update/:id' component={Create}></Route>
            <Route component={NotFound}></Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
