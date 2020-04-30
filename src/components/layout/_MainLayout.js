import React from 'react';
import Navbar from './Navbar/Navbar';
//import Footer from './Footer/Footer';

const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="full-height">{children}</div>
     
    </>
  );
};

export default MainLayout;
