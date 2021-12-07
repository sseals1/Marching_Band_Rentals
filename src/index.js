import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { MarchingBandRentals } from "./components/MarchingBandRentals"
import reportWebVitals from './reportWebVitals';
import { InstrumentFamily } from './components/InstrumentFamily'
import { BrowserRouter } from "react-router-dom"

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <MarchingBandRentals />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);


