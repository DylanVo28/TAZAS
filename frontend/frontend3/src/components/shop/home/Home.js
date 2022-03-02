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
import { Popup } from 'reactjs-popup';
import ModalPopup from '../../shared/ModalPopup';
import { set } from 'mongoose';


const CaroselHome=()=>{
  return <div className='container' style={{marginTop:'87px'}}><Carousel className='carousel-home'>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="/images/banner_tazas_1.png"
      alt="First slide"
    />
    
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="/images/banner_tazas_2.png"
      alt="Second slide"
    />

  
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="/images/banner_tazas_3.png"
      alt="Third slide"
    />

    
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
  const [category,setCategory]=useState('')
  const [classify,setClassify]=useState('')
  // useEffect(()=>{

  // },[sizePage.current,search,category,classify])
  useEffect(()=>{
    // clientRequest.getLengthAllProductsHome().then(res=>setSizePage({...sizePage,total:res.lengthProducts}))
    if(search===''&& category===''&&classify==''){
      clientRequest.getRandomProduct().then(res=>setProducts(res.products))
    }
    else{
   clientRequest.getSearchProductsHome(search,sizePage.current,category,classify).then(res=>{setProducts(res.products)})
    }
  },[search,category,classify])

   
  const loadMoreItem=()=>{
    if(search===''&& category===''&&classify==''){
    clientRequest.getRandomProduct().then(res=>{
      setProducts(oldArray => [...oldArray, ...res.products])
     })
    }
  }
  const handlePageChange=(e)=>{
    setSizePage({...sizePage,current:e})
  }
    return (
        <>
        
        <CaroselHome/>
        <br></br>
        <div className='container product-list'>
          <input className='search-input-home' placeholder='Search product' onChange={(e)=>setSearch(e.currentTarget.value)}/>
          <button  type="submit">
              <i className="fa fa-search"></i>
          </button>
          <div style={{display:'inline-block',float:'right'}}>
          <span>Filter Product</span>
          <span>
          <select className="form-select" aria-label="Default select example" onChange={(e)=>setClassify(e.target.value)}>
          <option selected value='' >All</option>
          <option  value={'Men'} >Men</option>
          <option  value={'Women'} >Women</option>
          <option  value={'Kid'} >Kid</option>

</select>
          </span>
          <span>

          <select className="form-select" aria-label="Default select example" onChange={(e)=>setCategory(e.target.value)}>
        
        <option selected value='' >All</option>

        <option value={'jacketsCoats'}>Jackets & Coats</option>
              <option  value={'hoodiesSweatshirts'}>Hoodies & Sweatshirts</option>
              <option value={'cardiganJumpers'}>Cardigan & Jumpers</option>
              <option value={'tshirtTanks'}>T-shirt & Tanks</option>
              <option value={'shoes'}>Shoes</option>
              <option value={'shirts'}>Shirts</option>
              <option value={'basics'}>Basics</option>
              <option value={'blazersSuits'}>Blazers & Suits</option>
              <option value={'shorts'}>Shorts</option>
              <option value={'trousers'}>Trousers</option>
              <option value={'jeans'}>Jeans</option>
              <option value={'swimwear'}>Swimwear</option>
              <option value={'underwear'}>Underwear</option>
              <option value={'socks'}>Socks</option>
      </select>
          </span>
          </div>
          
         
        <div className='row'>

          {products.map(item=><div className='col-md-4' style={{marginBottom:'15px'}}>
            <Link to={`/product/${item._id}`}>
              <div className="element-product" style={{padding:'15px'}}>
        <div className='avatar-home'>
          <div className='line'>
          <img src={item.images[0].url}/>
          <div className='avatar-home_thumbnail'>
          <img src={logo}/>
          
          </div>

          </div>
          
         
        </div>
        <br></br>
        <br></br>

        <div className="product-info" style={{display:'flex',justifyContent:'space-between'}}>
            <span>{item.name}</span>
            <span>{item.price}$</span>
          </div>
          </div>
        </Link>
</div>)}
          
        </div>
        {/* <Pagination
         activePage={sizePage.current}
         itemsCountPerPage={sizePage.count}
         totalItemsCount={sizePage.total}
         itemClass="page-item"
         linkClass="page-link"
         onChange={(e)=>handlePageChange(e)}/> */}
        

        </div>
        <div style={{textAlign:'center'}}><button name="" id="" class="btn create-button" role="button" onClick={()=>loadMoreItem()}>Load More</button></div>
       </>
       
    )
}
export default Home