import { React } from 'react';
import '../../../css/Home.css'
import HeartIcon from '../../../images/heart.svg'
const Menu =()=>{
    return (<header className="header_area">
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
                                    <li className="megamenu-item"><a href="#">Shop</a></li><li className="cn-dropdown-item has-down pr12"><a href="#">Pages</a></li><li><a href="blog.html">Blog</a></li><li><a href="contact.html">Contact</a></li></ul></div></div></nav><div className="header-meta d-flex clearfix justify-content-end"><div className="search-area"><form action="#" method="post"><input type="search" name="search" id="headerSearch" placeholder="Type for search" /><button type="submit"><i className="fa fa-search" aria-hidden="true" /></button></form></div><div className="favourite-area"><a href="#"><img src={HeartIcon} alt="" /></a></div><div className="user-login-info"><a href="#"><img src="img/core-img/user.svg" alt="" /></a></div><div className="cart-area"><a href="#" id="essenceCartBtn"><img src="img/core-img/bag.svg" alt="" /> <span>3</span></a></div></div></div></header>

  )
}
const Navigation=()=>{
    return (<div className="navigation">
    <div className="container">
      <nav className="navbar navbar-default">
        {/* Brand and toggle get grouped for better mobile display */}
       
        <div className="navbar-collapse" id="bs-megadropdown-tabs">
          <ul className="nav navbar-nav">
            <li className="active"><a href="index.html" className="act">Home</a></li>	
            {/* Mega Menu */}
            <li className="dropdown">
              <a href="#" className="dropdown-toggle" data-toggle="dropdown">Products <b className="caret" /></a>
              <ul className="dropdown-menu multi-column columns-3">
                <div className="row">
                  <div className="col-sm-3">
                    <ul className="multi-column-dropdown">
                      <h6>Clothing</h6>
                      <li><a href="dresses.html">Dresses<span>New</span></a></li>
                      <li><a href="sweaters.html">Sweaters</a></li>
                      <li><a href="skirts.html">Shorts &amp; Skirts</a></li>
                      <li><a href="jeans.html">Jeans</a></li>
                      <li><a href="shirts.html">Shirts &amp; Tops<span>New</span></a></li>
                    </ul>
                  </div>
                  <div className="col-sm-3">
                    <ul className="multi-column-dropdown">
                      <h6>Ethnic Wear</h6>
                      <li><a href="salwars.html">Salwars</a></li>
                      <li><a href="sarees.html">Sarees<span>New</span></a></li>
                      <li><a href="products.html"><i>Summer Store</i></a></li>
                    </ul>
                  </div>
                  <div className="col-sm-2">
                    <ul className="multi-column-dropdown">
                      <h6>Foot Wear</h6>
                      <li><a href="sandals.html">Flats</a></li>
                      <li><a href="sandals.html">Sandals</a></li>
                      <li><a href="sandals.html">Boots</a></li>
                      <li><a href="sandals.html">Heels</a></li>
                    </ul>
                  </div>
                  <div className="col-sm-4">
                    <div className="w3ls_products_pos">
                      <h4>50%<i>Off/-</i></h4>
                      <img src="images/1.jpg" alt=" " className="img-responsive" />
                    </div>
                  </div>
                  <div className="clearfix" />
                </div>
              </ul>
            </li>
            <li><a href="about.html">About Us</a></li>
            <li><a href="short-codes.html">Short Codes</a></li>
            <li><a href="mail.html">Mail Us</a></li>
          </ul>
        </div>
      </nav>
    </div>
  </div>
  )
}
const Home =()=>{
    return (
        <>
        <Menu/>
       </>
    )
}
export default Home