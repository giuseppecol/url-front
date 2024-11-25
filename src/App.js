import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginForm from './LoginForm';
import UrlsPage from './UrlsPage';
import CreateUrlPage from './CreateUrlPage';
import RedirectPage from './RedirectPage';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/urls" element={<UrlsPage />} />
      <Route path="/create-url" element={<CreateUrlPage />} />
      <Route path="/redirect/:shortCode" element={<RedirectPage />} />
    </Routes>
  );
}

export default App;
