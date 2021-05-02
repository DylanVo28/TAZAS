import React, { Fragment, useReducer,useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import '../../css/Admin.css'
import Menu from "./Menu";
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import ProductsList from "./ProductsList";
const ProtectedRoute = ({ component: Component, ...rest }) => {
    return (
      <Route {...rest} render={
        props => <Component {...rest} {...props} />
      } />
    )
  }
const Admin=()=>{
    return (
        <Fragment>
        <ProtectedRoute exact  path='/admin/*' component={Sidebar}/>
       
        <main className='main-content mt-1 border-radius-lg'>
        <ProtectedRoute exact  path='/admin/*' component={Menu}/>
          {/* <Menu/> */}
          <ProtectedRoute exact path='/admin/dashboard' component={Dashboard} />
        <ProtectedRoute exact path='/admin/products' component={ProductsList}/>
        </main>
        
        </Fragment>
    )
}
export default Admin
