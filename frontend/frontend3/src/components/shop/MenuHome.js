import { Link } from 'react-router-dom'
import HeartIcon from '../../images/heart.svg'
import UserIcon from '../../images/user.svg'
import CartIcon from '../../images/cart.svg'
const MenuHome =()=>{
    return (<header className="header_area menu-home">
        <div className="classy-nav-container breakpoint-off d-flex align-items-center justify-content-between light left">
            <nav className="classy-navbar" id="essenceNav">
                <a className="nav-brand" href="index.html">
                    <img src="img/core-img/logo.png" alt="" />
                </a>
            <div className="classy-navbar-toggler">
                <span className="navbarToggler"><span />
                <span /><span /></span></div>
                
                <div className="classy-menu">
                    <div className="classycloseIcon">
                        <div className="cross-wrap">
                            <span className="top" />
                            <span className="bottom" />
                            </div></div>
                            <div className="classynav">
                                <ul className="menu-list">
                                    <li className="megamenu-item">
                                        <a href="#">Shop</a>
                                        </li><li className="cn-dropdown-item has-down pr12">
                                            <a href="#">Pages</a></li><li><a href="blog.html">Blog</a></li><li><a href="contact.html">Contact</a></li></ul></div></div></nav><div className="header-meta d-flex clearfix justify-content-end"><div className="search-area"><form action="#" method="post"><input type="search" name="search" id="headerSearch" placeholder="Type for search" /><button type="submit"><i className="fa fa-search" aria-hidden="true" /></button></form></div><div className="favourite-area"><a href="#">
                                                <img src={HeartIcon} alt="" /></a></div><div className="user-login-info"><Link to="/login">
                                                    <img src={UserIcon} alt="" /></Link></div><div className="cart-area"><a href="#" id="essenceCartBtn">
                                                        <img src={CartIcon} alt="" /> <span>3</span></a></div></div></div></header>

  )
}
export default MenuHome