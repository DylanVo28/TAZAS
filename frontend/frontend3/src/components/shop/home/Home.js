import { React } from 'react';
import '../../../css/Home.css'
import  {Carousel}  from 'react-bootstrap';
import { useEffect } from 'react';
import clientRequest from '../../../APIFeatures/clientRequest';
import { useState } from 'react';
import logo from '../../../images/tazas.png'
import { Link } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import MenuHome from '../MenuHome';


const CaroselHome=()=>{
  return <div className='container' style={{marginTop:'87px'}}><Carousel className='carousel-home'>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="/images/banner_tazas_1.png"
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
      src="/images/banner_tazas_2.png"
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
      src="/images/banner_tazas_3.png"
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
        <MenuHome/>
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