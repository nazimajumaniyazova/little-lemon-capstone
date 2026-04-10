import React from 'react';

// Header is the top banner of the page; receives the Nav as children
function Header({ children }) {
  return (
    <header className="app-header">
      <div className="container">
        <a href="/" className="logo" aria-label="Little Lemon home">
          Little Lemon
        </a>
        {children}
      </div>
    </header>
  );
}

export default Header;
