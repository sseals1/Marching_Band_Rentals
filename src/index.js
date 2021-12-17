import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { MarchingBandRentals } from "./components/MarchingBandRentals"
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom"
import { NavBar } from './components/nav/NavBar';

ReactDOM.render(  
  <React.StrictMode>
    <BrowserRouter>
      <MarchingBandRentals />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);


