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
import ProductHome from "./components/shop/product/ProductHome";
import NewPassword from "./components/LoginDashboard/NewPassword";
import OrderHome from './components/shop/order/OrderHome';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={
      props => <Component {...rest} {...props} />
    } />
  )
}

function App() {
  useEffect(()=>{
      store.dispatch(loadUser())
  },[])
  
  return (
    <Fragment>

      <Router>
        <Fragment>
          <ProtectedRoute exact path='/' component={Ads}/>
        </Fragment>
        <Fragment>
          <ProtectedRoute exact path='/home' component={Home}/>
         

        </Fragment>
        <Fragment>
          <ProtectedRoute exact path="/product/:id" component={ProductHome}/>
          <ProtectedRoute exact path="/order/create-new" component={OrderHome}/>
    </Fragment>
        <Admin/>
        
        <Fragment>
          <ProtectedRoute exact path='/login' component={Login}/>
          <ProtectedRoute exact path='/create-account' component={SignUp}/>
          <ProtectedRoute exact path='/password/reset/:token' component={NewPassword}/>
        </Fragment>
      </Router>
    </Fragment>
  );
}

export default App; 