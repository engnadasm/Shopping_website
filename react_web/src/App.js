import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import AppNavbar from './components/AppNavbar'
import Footer from './components/Footer';
import { Scrollspy } from 'reactstrap-scrollspy'
import { Provider } from 'react-redux';
import store from './store';
import Routes from './Routes'

class App extends Component {
  constructor(props) {
        super()
        this.state = {
            showLogin: false
        };
    }
    onCloseModal = () => {
      this.setState({ showLogin: false });
  };

   onOpenModalLogin = () => {
      this.setState({ showLogin: true });
  };
  render() {
    return (
    <Provider store={store}>
    <div className="App" style={{ overflow: 'hidden' }}>
    <Scrollspy
     names={['navbar', 'header', 'shoppingList', 'contact', null]}
     homeIndex={1}
   >
     <AppNavbar isLogIn={false} />
     <Routes />
     <Footer />

     </Scrollspy>
      </div>
    </Provider>
    );
  }
}

export default App;
