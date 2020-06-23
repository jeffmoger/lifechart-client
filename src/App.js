import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from './components/PrivateRoute';
//import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import Login from './pages/Login'
import { AuthContext } from "./context/auth";
import AppBar from "./components/AppBar"

function App() {
  const existingTokens = JSON.parse(localStorage.getItem("tokens"));
  const [authTokens, setAuthTokens] = useState(existingTokens);

  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  }
  
  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <Router>
        <AppBar />
        <div className="container">
          <div className="row">
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <PrivateRoute path="/settings" component={Settings} />
          </div>
        </div>
        <Footer />
      </Router>
    </AuthContext.Provider>
  );
}

export default App;