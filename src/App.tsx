import React from 'react';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import HomePage from './pages/HomePage';
import store from './redux/store';
import { Provider } from 'react-redux';
import ProductPage from './pages/ProductPage';
function App() {
  return (
    <Provider store = {store}>
      <div className="min-h-full h-screen flex ">
        <div className="w-full">
          <BrowserRouter>
              <Routes>
                  <Route path="/signin" element={<LoginPage/>} />
                  <Route path="/signup" element={<SignupPage/>} />
                  <Route path="/home-page" element={<HomePage/>} />
                  <Route path="/product-page/:id" element={<ProductPage/>}/>
                  <Route path="*" element={<Navigate to="/home-page" replace />} />
              </Routes>
            </BrowserRouter>
        </div>
      </div>
    </Provider>
  );
}

export default App;
