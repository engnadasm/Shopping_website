import React, { Component } from 'react';
import AppNavbar from './components/AppNavbar';
import ShoppingList from './components/ShoppingList';
import RequestModal from './components/RequestModal';
import { Container } from 'reactstrap';

import { Provider } from 'react-redux';
import store from './store';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App2 extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App2">
          <AppNavbar />
          <Container>
            <RequestModal />
            <ShoppingList />
          </Container>
        </div>
      </Provider>
    );
  }
}

export default App2;
