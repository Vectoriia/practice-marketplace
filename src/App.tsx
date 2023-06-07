import React from 'react';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import LoginPage from './pages/Login';
function App() {
  return (
    <div className="min-h-full h-screen flex items-center justify-center py-2 px-4 sm:px-6 lg:px-8">
      <div className="w-full">
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage/>} />
            </Routes>
          </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
