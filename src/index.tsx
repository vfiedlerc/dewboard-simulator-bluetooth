import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter, Switch } from "react-router-dom"
import { SimulatorProvider } from './contexts/SimulatorContext';


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <AuthProvider>
          <SimulatorProvider>
            <App />
          </SimulatorProvider>
        </AuthProvider>
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

