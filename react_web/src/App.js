import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import AppNavbar from './components/AppNavbar'
import Footer from './components/Footer';
import { Scrollspy } from 'reactstrap-scrollspy'

import { Provider } from 'react-redux';
import store from './store';
import Routes from './Routes'

import { loadUser } from './actions/authActions';
import { Container } from 'reactstrap';

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  constructor(props) {
        super(props)
        this.state = {
        };
    }
  render() {
    return (
    <Provider store={store}>
    <div className="App" >
    <Scrollspy
     names={['navbar', 'header', 'shoppingList', 'contact', null]}
     homeIndex={1}
   >
     <AppNavbar  />
     <Routes/>
     <Footer />

     </Scrollspy>
      </div>
    </Provider>
    );
  }
}

export default App;
