import React from 'react';
import Nav from './components/Nav';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <Header>
        <Nav />
      </Header>
      <Main />
      <Footer />
    </>
  );
}

export default App;
