import React, { Component } from 'react';
import Header from './Header';
import Contact from './Contact';
import Service from './Service'

import { Scrollspy } from 'reactstrap-scrollspy'

class Home extends Component {

  render(){
  return (
    <Scrollspy
     names={['navbar','header', 'shoppingList', 'contact', null]}
     homeIndex={1}
   >
        <Header />
        <Service/>
        <Contact />
     </Scrollspy>

   )
 }
}

 export default Home
