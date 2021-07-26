import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/layout/Dashboard";
import LandingComponent from "./components/layout/LandingComponent";
import NavComponent from "./components/layout/NavComponent";
import { ToastComponent } from "./components/layout/toastComponent";
import "./styles/App.css";
import setAuthToken from "./utils/setAuthToken";

function App() {
  const [user, setUser] = useState({
    isAuthenticated: false,
    userDetail: {},
  });

  useEffect(() => {
    //Loading jwt Token from localStorage
    if (localStorage.getItem("jwtToken")) {
      const token = localStorage.getItem("jwtToken");
      setAuthToken(token);
      const decoded = jwtDecode(token);
      setUser({ ...user, isAuthenticated: true, userDetail: decoded });
    } //eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      <ToastComponent />
      <Router>
        <NavComponent />
        <Route exact path="/">
          {user.isAuthenticated ? (
            <Dashboard user={user.userDetail} setUser={setUser} />
          ) : (
            <LandingComponent />
          )}
        </Route>
        <Route exact path="/register">
          {user.isAuthenticated ? (
            <Dashboard user={user.userDetail} setUser={setUser} />
          ) : (
            <Register />
          )}
        </Route>
        <Route path="/login" exact>
          {user.isAuthenticated ? (
            <Dashboard user={user.userDetail} setUser={setUser} />
          ) : (
            <Login setUser={setUser} user={user} />
          )}
        </Route>
      </Router>
    </div>
  );
}

export default App;
