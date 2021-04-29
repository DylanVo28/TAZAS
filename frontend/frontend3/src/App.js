import React, { Fragment, useReducer } from "react";
import Routes from "./components";
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import { LayoutContext, layoutState, layoutReducer } from "./components/shop";
import Dashboard from './components/admin/Dashboard'
import Sidebar from './components/admin/Sidebar';
import ProductsList from "./components/admin/ProductsList";
import Menu from './components/admin/Menu';
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
        
        <ProtectedRoute exact  component={Sidebar}/>
       
        <main className='main-content mt-1 border-radius-lg'>
         
          <Menu/>
          <ProtectedRoute exact path='/admin/dashboard' component={Dashboard} />
        <ProtectedRoute exact path='/admin/products' component={ProductsList}/>
        </main>
        
        
        </Fragment>
      </Router>
    </Fragment>
  );
}

export default App; 