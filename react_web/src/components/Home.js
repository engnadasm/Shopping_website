import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import ShoppingList from './ShoppingList';
import ItemModal from './ItemModal';
import Header from './Header';
import Contact from './Contact';
import Footer from './Footer';
import { Container } from 'reactstrap';

import { Scrollspy } from 'reactstrap-scrollspy'


function Home() {
  return (
<div>
    <Scrollspy
     names={['navbar','header', 'shoppingList', 'contact', null]}
     homeIndex={1}
   >
        <Header />
        <Container>
          <ItemModal />
          <ShoppingList />
        </Container>
        <Contact />
     </Scrollspy>
     </div>

   )
 }

 export default Home
