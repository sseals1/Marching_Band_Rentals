import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { MarchingBandRentals } from "./components/MarchingBandRentals"
import reportWebVitals from './reportWebVitals';
import { InstrumentFamily } from './components/InstrumentFamily'

ReactDOM.render(
  <React.StrictMode>
    <MarchingBandRentals />
    <InstrumentFamily />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();