import React, { Fragment, useReducer,useEffect } from "react";
import Routes from "./components";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import { LayoutContext, layoutState, layoutReducer } from "./components/shop";
import Dashboard from './components/admin/Dashboard'
import Sidebar from './components/admin/Sidebar';
import ProductsList from "./components/admin/ProductsList";
import Menu from './components/admin/Menu';
import Login from './components/LoginDashboard/Login'
import SignUp from "./components/SignUpDashboard/SignUp";
import 'react-notifications/lib/notifications.css';
import Home from './components/shop/home/Home';
import {loadUser} from './actions/userActions'
import store from './store'
import Ads from "./components/shop/ads/Ads";
import Admin from "./components/admin/Admin";
import axios from "axios";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={
      props => <Component {...rest} {...props} />
    } />
  )
}
function getToken() {
  const tokenString = sessionStorage.getItem('token');
  
  return tokenString?true:false
}
function getTheCookie() {
  var cookie_name = "userid_form";
  var return_value = null;

  var pos_start = document.cookie.indexOf(" " + cookie_name + "=");
  if (pos_start == -1) document.cookie.indexOf(cookie_name + "=");

  if (pos_start != -1) { // Cookie already set, read it
      pos_start++; // Start reading 1 character after
      var pos_end = document.cookie.indexOf(";", pos_start); // Find ";" after the start position

      if (pos_end == -1) pos_end = document.cookie.length;
      return_value = unescape( document.cookie.substring(pos_start, pos_end) );
  }

  return return_value; // null if cookie doesn't exist, string otherwise
}
function App() {
  useEffect(()=>{
    // getToken()
    // console.log(getTheCookie())
      store.dispatch(loadUser())
  },[])
  // useEffect(() => {
  //   const loggedInUser = localStorage.getItem("user");
  //   console.log(loggedInUser)

  //   if (loggedInUser) {
  //    axios.get(`http://localhost:4000/api/v1/admin/user/${loggedInUser}`).then(res=>console.log(res.data.user))
  //   }
  // }, []);
  // const [data, dispatch] = useReducer(layoutReducer, layoutState);
  return (
    <Fragment>
      {/* <LayoutContext.Provider value={{ data, dispatch }} >
        <Routes />
      </LayoutContext.Provider> */}
      <Router>
        <Fragment>
          <ProtectedRoute exact path='/' component={Ads}/>
        </Fragment>
        <Fragment>
          <ProtectedRoute exact path='/home' component={Home}/>
        </Fragment>
      {/* <Fragment>
        <ProtectedRoute exact  path='/admin/*' component={Sidebar}/>
       
        <main className='main-content mt-1 border-radius-lg'>
        <ProtectedRoute exact  path='/admin/*' component={Menu}/>
          <ProtectedRoute exact path='/admin/dashboard' component={Dashboard} />
        <ProtectedRoute exact path='/admin/products' component={ProductsList}/>
        </main>
        
        </Fragment> */}
        <Admin/>
        
        <Fragment>
          <ProtectedRoute exact path='/login' component={Login}/>
          <ProtectedRoute exact path='/create-account' component={SignUp}/>
        </Fragment>
      </Router>
    </Fragment>
  );
}

export default App; 