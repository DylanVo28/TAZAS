import React, { Fragment, useReducer } from "react";
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
const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={
      props => <Component {...rest} {...props} />
    } />
  )
}
function App() {
  // const [data, dispatch] = useReducer(layoutReducer, layoutState);
  return (
    <Fragment>
      {/* <LayoutContext.Provider value={{ data, dispatch }} >
        <Routes />
      </LayoutContext.Provider> */}
      <Router>
        <Fragment>
          <ProtectedRoute exact path='/home' component={Home}/>
        </Fragment>
      <Fragment>
        <ProtectedRoute exact  path='/admin/*' component={Sidebar}/>
       
        <main className='main-content mt-1 border-radius-lg'>
        <ProtectedRoute exact  path='/admin/*' component={Menu}/>
          {/* <Menu/> */}
          <ProtectedRoute exact path='/admin/dashboard' component={Dashboard} />
        <ProtectedRoute exact path='/admin/products' component={ProductsList}/>
        </main>
        
        </Fragment>
        <Fragment>
          <ProtectedRoute exact path='/login' component={Login}/>
          <ProtectedRoute exact path='/create-account' component={SignUp}/>
        </Fragment>
      </Router>
    </Fragment>
  );
}

export default App; 