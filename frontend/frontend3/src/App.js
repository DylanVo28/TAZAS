import React, { Fragment, useReducer } from "react";
import Routes from "./components";
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import { LayoutContext, layoutState, layoutReducer } from "./components/shop";
import Dashboard from './components/admin/Dashboard'
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
        <ProtectedRoute exact path='/dashboard' component={Dashboard} />
      </Router>
    </Fragment>
  );
}

export default App; 