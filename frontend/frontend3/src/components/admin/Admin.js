import React, { Fragment, useReducer,useEffect } from "react";
import { BrowserRouterasRouter, Route, Switch, Redirect } from 'react-router-dom';
import '../../css/Admin.css'
import Menu from "./Menu";
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import ProductsList from "./ProductsList";
import ProductDetail from "./ProductDetail";
const ProtectedRoute = ({ component: Component, ...rest }) => {
    return (
      <Route {...rest} render={
        props => <Component {...rest} {...props} />
      } />
    )
  }
  const PrivateRoute = ({ component: Component, handleLogout, isAuthenticated, ...rest }) => (
    <Route {...rest} render={(props) => (
        isAuthenticated === true
        ? <Component {...props} handleLogout={handleLogout} />
        : <Redirect to="/Login"/>
    )} />
);
const Admin=()=>{
    return (
        <Fragment>
        <ProtectedRoute exact  path='/admin/*' component={Sidebar}/>
       
        <main className='main-content mt-1 border-radius-lg'>
        <ProtectedRoute exact  path='/admin/*' component={Menu}/>
          {/* <Menu/> */}
          <ProtectedRoute exact path='/admin/dashboard' component={Dashboard} />
        <ProtectedRoute exact path='/admin/products' component={ProductsList}/>
        <PrivateRoute exact path='/admin/create-product' component={ProductDetail} isAuthenticated={true} />
        <PrivateRoute exact path='/admin/product/:id' component={ProductDetail} isAuthenticated={true}/>
        </main>
        
        </Fragment>
    )
}
export default Admin
