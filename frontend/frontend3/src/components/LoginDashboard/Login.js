import axios from 'axios';
import { React, useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux'
import {useAlert} from 'react-alert'
import {login,clearErrors} from '../../actions/userActions'
import { NotificationContainer } from 'react-notifications';

const Menu =()=>{
    return (<nav className="navbar navbar-expand-lg  blur blur-rounded top-0  z-index-3 shadow position-absolute my-3 py-2 start-0 end-0 mx-4">
    <div className="container-fluid">
      <a className="navbar-brand font-weight-bolder ms-lg-0 ms-3 " href="../pages/dashboard.html">
        Soft UI Dashboard
      </a>
      <button className="navbar-toggler shadow-none ms-2" type="button" data-bs-toggle="collapse" data-bs-target="#navigation" aria-controls="navigation" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon mt-2">
          <span className="navbar-toggler-bar bar1" />
          <span className="navbar-toggler-bar bar2" />
          <span className="navbar-toggler-bar bar3" />
        </span>
      </button>
      <div className="collapse navbar-collapse" id="navigation">
        <ul className="navbar-nav mx-auto">
          <li className="nav-item">
            <Link className="nav-link d-flex align-items-center me-2 active" aria-current="page" to="/admin/dashboard">
              <i className="fa fa-chart-pie opacity-6 text-dark me-1" aria-hidden="true" />
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <a className="nav-link me-2" href="../pages/profile.html">
              <i className="fa fa-user opacity-6 text-dark me-1" aria-hidden="true" />
              Profile
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link me-2" href="../pages/sign-up.html">
              <i className="fas fa-user-circle opacity-6 text-dark me-1" aria-hidden="true" />
              Sign Up
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link me-2" href="../pages/sign-in.html">
              <i className="fas fa-key opacity-6 text-dark me-1" aria-hidden="true" />
              Sign In
            </a>
          </li>
        </ul>
        <ul className="navbar-nav d-lg-block d-none">
          <li className="nav-item">
            <a href="https://www.creative-tim.com/product/soft-ui-dashboard" className="btn btn-sm btn-round mb-0 me-1 bg-gradient-dark">Free download</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  )
}
const Form=({history})=>{
    const [stEmail,setStEmail]=useState('')
    const [stPassword,setStPassword]=useState('')
    const alert=useAlert()
    const dispatch=useDispatch()
    const {isAuthenticated,error,loading}=useSelector(state=>state.auth)
    useEffect(()=>{
      
      if(error){
        console.log(error)
        alert.show(error)
        // dispatch(clearErrors())
      }
    },[dispatch,
      alert,
      isAuthenticated,error,history])
    
    const submitHandler=(e)=>{
      e.preventDefault();
      dispatch(login(stEmail,stPassword))
    }
    return(<div className="card card-plain mt-8">
    <div className="card-header pb-0 text-left bg-transparent">
      <h3 className="font-weight-bolder text-info text-gradient">Welcome back</h3>
      <p className="mb-0">Enter your email and password to sign in</p>
    </div>
    <div className="card-body">
      <form role="form text-left" onSubmit={submitHandler}>
        <label>Email</label>
        <div className="mb-3">
          <input type="email"onChange={(event)=>setStEmail(event.currentTarget.value)} className="form-control" placeholder="Email" aria-label="Email" aria-describedby="email-addon" />
        </div>
        <label>Password</label>
        <div className="mb-3">
          <input type="password" onChange={(event)=>setStPassword(event.currentTarget.value)} className="form-control" placeholder="Password" aria-label="Password" aria-describedby="password-addon" />
        </div>
        <div className="form-check form-switch">
          <input className="form-check-input" type="checkbox" id="rememberMe" defaultChecked />
          <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
        </div>
        <div className="text-center">
          <button type="submit"  className="btn bg-gradient-info w-100 mt-4 mb-0">Sign in</button>

        </div>
      </form>
    </div>
    <div className="card-footer text-center pt-0 px-lg-2 px-1">
      <p className="mb-4 text-sm mx-auto">
        Don't have an account?
        <Link to="/create-account" className="text-info text-gradient font-weight-bold">Sign up</Link>
      </p>
    </div>
  </div>
  )
}
const Thumbnail=()=>{
    return (<div className="oblique position-absolute top-0 h-100 d-md-block d-none me-n8">
    <div className="oblique-image bg-cover position-absolute fixed-top ms-auto h-100 z-index-0 ms-n6" style={{backgroundImage: 'url("https://static.zara.net/photos///contents/2021/V/L/L21012-V2021//w/1280/Look6_1.jpg?ts=1615979341884")'}} />
  </div>
  )
}
const Login =()=>{
    return(
        <div className={'g-sidenav-show  bg-white'}>
            <div className={'container position-sticky z-index-sticky top-0'}>
                <div className={'row'}>
                    <div className={'col-12'}>
        <Menu/>
        </div>
        </div>
        </div>
        <section>
            <div className={'page-header section-height-75'}>
                <div className={'container'}>
                    <div className={'row'}>
                        <div className={'col-xl-4 col-lg-5 col-md-6 d-flex flex-column mx-auto'}>   
                            <Form/>
                        </div>
                        <div className={'col-md-6'}>
                            <Thumbnail/>    
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <NotificationContainer/>

        </div>
    )
}
export default Login