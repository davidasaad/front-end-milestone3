import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Film from './Film';
import Customer from './Customer';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/films" element={<Film />} />
      <Route path="/customers" element={<Customer />} />
    </Routes>
  </Router>
);


reportWebVitals();
