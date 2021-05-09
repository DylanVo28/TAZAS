import { React } from 'react';
import '../../../css/Home.css'
import HeartIcon from '../../../images/heart.svg'
import  {Carousel}  from 'react-bootstrap';
import { useEffect } from 'react';
import clientRequest from '../../../APIFeatures/clientRequest';
import { useState } from 'react';
import logo from '../../../images/tazas.png'
import { Link } from 'react-router-dom';
import Pagination from 'react-js-pagination';
const Menu =()=>{
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
                                    <li className="megamenu-item"><a href="#">Shop</a></li><li className="cn-dropdown-item has-down pr12"><a href="#">Pages</a></li><li><a href="blog.html">Blog</a></li><li><a href="contact.html">Contact</a></li></ul></div></div></nav><div className="header-meta d-flex clearfix justify-content-end"><div className="search-area"><form action="#" method="post"><input type="search" name="search" id="headerSearch" placeholder="Type for search" /><button type="submit"><i className="fa fa-search" aria-hidden="true" /></button></form></div><div className="favourite-area"><a href="#"><img src={HeartIcon} alt="" /></a></div><div className="user-login-info"><a href="#"><img src="img/core-img/user.svg" alt="" /></a></div><div className="cart-area"><a href="#" id="essenceCartBtn"><img src="img/core-img/bag.svg" alt="" /> <span>3</span></a></div></div></div></header>

  )
}

const CaroselHome=()=>{
  return <div className='container' style={{marginTop:'87px'}}><Carousel className='carousel-home'>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://static.remove.bg/remove-bg-web/2a274ebbb5879d870a69caae33d94388a88e0e35/assets/start_remove-79a4598a05a77ca999df1dcb434160994b6fde2c3e9101984fb1be0f16d0a74e.png"
      alt="First slide"
    />
    <Carousel.Caption>
      <h3>First slide label</h3>
      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg"
      alt="Second slide"
    />

    <Carousel.Caption>
      <h3>Second slide label</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://www.w3schools.com/w3css/img_lights.jpg"
      alt="Third slide"
    />

    <Carousel.Caption>
      <h3>Third slide label</h3>
      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel></div>
}
const Home =()=>{
  const [sizePage,setSizePage]=useState({
    current:1,
    count:6,
    total:0,
  })
  const [products,setProducts]=useState([]);
  const [search,setSearch]=useState('')
  useEffect(()=>{
    clientRequest.getLengthAllProductsHome().then(res=>setSizePage({...sizePage,total:res.lengthProducts}))
    clientRequest.getSearchProductsHome('',sizePage.current).then(res=>setProducts(res.products))
  },[])
  useEffect(()=>{
    clientRequest.getSearchProductsHome(search,sizePage.current).then(res=>setProducts(res.products))
  },[sizePage.current,search])
  const handlePageChange=(e)=>{
    setSizePage({...sizePage,current:e})
  }
    return (
        <>
        <Menu/>
        <CaroselHome/>
        <br></br>
        <div className='container product-list'>
        <input placeholder='Search product' onChange={(e)=>setSearch(e.currentTarget.value)}/>
        <div className='row'>

          {products.map(item=><div className='col-md-4' style={{marginBottom:'15px'}}>
            <Link to={`/product/${item._id}`}>
              <div style={{padding:'15px',border:'1px solid #d2d2d2'}}>
        <div className='avatar-home'>
          <img src={item.images[0].url}/>
          <div className='avatar-home_thumbnail'>
          <img src={logo}/>
          </div>
         
        </div>
        <br></br>
        <br></br>

        <div style={{display:'flex',justifyContent:'space-between'}}>
            <span>{item.name}</span>
            <span>{item.price}$</span>
          </div>
          </div>
        </Link>
</div>)}
          
        </div>
        <Pagination
         activePage={sizePage.current}
         itemsCountPerPage={sizePage.count}
         totalItemsCount={sizePage.total}
         itemClass="page-item"
         linkClass="page-link"
         onChange={(e)=>handlePageChange(e)}/>
        </div>

       </>
    )
}
export default Home