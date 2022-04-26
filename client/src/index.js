import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import { AuthProvider } from './context/AuthContext'
import {  QueryClientProvider, QueryClient } from "react-query"
import { BrowserRouter } from 'react-router-dom';

const queryClient = new QueryClient();


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
