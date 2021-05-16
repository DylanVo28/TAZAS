import { React, useState, useEffect } from 'react';
import {Link} from'react-router-dom'
import logo from '../../images/tazas.png'
const SidebarRow=(props)=>{

  return (
    <li className={'nav-item sidebar'}>
        <Link className="nav-link" to={props.url}>
          <i class={props.icon}></i>
           
          <span className="nav-link-text ms-1">{props.title}</span>
        </Link>
      </li>
  )
}

const Sidebar=()=>{
   
    return (
        <aside className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-left ms-3" id="sidenav-main">
  <div className="sidenav-header">
    <Link className="navbar-brand m-0" to="/admin/dashboard">
      <img src={logo} className="navbar-brand-img" alt="..." />
    </Link>
  </div>
  <hr className="horizontal dark mt-0" />
  <div className="collapse navbar-collapse  w-auto" id="sidenav-collapse-main">
    <ul className="navbar-nav">
    <SidebarRow url={'/home'} icon={"fas fa-store"} title={'Store'}/>
      <SidebarRow url={'/admin/dashboard'} icon={'fas fa-home'} title={'Dashboard'}/>
      <SidebarRow url={'/admin/products'} icon={'fas fa-archive'} title={'Products'}/>
      <SidebarRow url={'/admin/orders'} icon={"fas fa-shipping-fast"} title={'Orders'}/>
      <SidebarRow url={'/admin/users'} icon={"fas fa-users"} title={'Users'}/>
      <SidebarRow url={'/admin/profile'} icon={"fas fa-user"} title={'Profile'}/>
      <SidebarRow url={'/order/me'} icon={"fas fa-shipping-fast"} title={'My orders'}/>
     
     
    </ul>
  </div>
  
</aside>

    )
}
export default Sidebar