import './ProductHome.css'
import { useEffect } from 'react';
import clientRequest from '../../../APIFeatures/clientRequest';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import MenuHome from '../MenuHome';
import Popup from "reactjs-popup";
import Modal from 'react-awesome-modal';
import ModalPopup from '../../shared/ModalPopup';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import ReactStars from "react-rating-stars-component";
import {getFormattedDate} from '../../../HandlerCaculate/formatDate';

const ProductHome=(props)=>{
    const [product,setProduct]=useState({
        name:'',
        price:'',
        description:'',
        images:[{
            public_id:'',
            url:'default'
        },{
            public_id:'',
            url:'default'
        },{
            public_id:'',
            url:'default'
        }],
    })
    const [showModal,setShowModal]=useState(false)
    const [user,setUser]=useState()
    const [rating,setRating]=useState(0)
    const [allReviews,setAllReviews]=useState()
    useEffect(()=>{

        clientRequest.getProductDetail(props.match.params.id).then(res=>setProduct(res.product))
        clientRequest.getProfileMe().then(res=>setUser(res.user))
        clientRequest.getReviewsByProduct(props.match.params.id).then(res=>setAllReviews(res.allReviews))
    },[])
    const orderNow=()=>{
        const cartItem=product;
        localStorage.setItem('cartItem',JSON.stringify(cartItem));

        window.location.href='/order/create-new'
    }
    const addToCart=()=>{
        const data={
            product:product._id,
            name:product.name,
            image:product.images[0].url,
            price:product.price,
            checked:true,
            
        }
        clientRequest.updateCartItem(data).then(res=>NotificationManager.success('Success', 'update cart success')).catch(err=>setShowModal(true))

       
    }
    const ratingChanged = (newRating) => {
        setRating(newRating);
      };
    const reviewProduct=()=>{
        const comment=document.getElementsByName('inputReview')[0].value
        
        clientRequest.updateReviewProduct(rating,comment,product._id,user.avatar.url).then(res=>{NotificationManager.success('Success', 'Review success')
        window.location.reload()
    }).catch(err=>NotificationManager.error('Error', 'Review error'))
    }
    return (
    <>
    <div className="row product-home" style={{position:'relative'}}>
    
        <div className='product-home_left'>
        <h1 className='product-home_title'>{product.name}</h1>
        <br></br>
        <p className='product-home_description'>{product.description}</p>
        </div>
        <div className='product-home_item'
         style={{background:`url(${product.images[0].url})`}}
         >
        </div>
        <div className='product-home_right'>
            <h3>${product.price}</h3>
            <div className='product-home_list'>
                {product.images.map(item =><div className='product-home_image' 
                style={{background:`url(${item.url})`}}
                >

                </div> )}
                
                
            </div>
            <br></br>
            <div style={{display:'flex',justifyContent:'space-between'}}> <button className='btn-product-home' onClick={()=>orderNow()}>Mua ngay</button>
            <button className='btn-product-home' onClick={()=>addToCart()}>Thêm vào giỏ</button></div>
           

        </div>
        
    </div>
    <div className='review-product container'>
        <h3 className='text-center'>Reviews Product</h3>
        {user&&<div className='row' style={{alignItems:'center'}}>
            <div className='col-md-3 text-right'>
                <img src={user.avatar.url}/>
                
            </div>
            <div className='col-md-9'>
            <ReactStars
    count={5}
    onChange={ratingChanged}
    size={35}
    isHalf={true}
    emptyIcon={<i className="far fa-star"></i>}
    halfIcon={<i className="fa fa-star-half-alt"></i>}
    fullIcon={<i className="fa fa-star"></i>}
    activeColor="#ffd700"
  />
  <input className='input-review' placeholder='Enter review product' name='inputReview'/><br></br>
  <br></br>
  <button className='btn btn-primary' onClick={()=>reviewProduct()}>Review</button>
            </div>
        </div>}
        {allReviews&&allReviews.map(item=><><div className='row' style={{alignItems:'center'}}>
            <div className='col-md-3 text-right'>
                <img src={item.avatar}/>
                
            </div>
            <div className='col-md-9'>
            <ReactStars
    count={5}
    size={35}
    isHalf={true}
    emptyIcon={<i className="far fa-star"></i>}
    halfIcon={<i className="fa fa-star-half-alt"></i>}
    fullIcon={<i className="fa fa-star"></i>}
    edit={false}
    value={item.rating}
  />
  <input defaultValue={item.comment} disabled/>
  <br/>
  <span>Created At:  </span>
  <span>{getFormattedDate( item.createdAt)}</span>
            </div>
        </div></>)}
    </div>
    <ModalPopup open={showModal}
        handleChange={()=>setShowModal(!showModal)}
        title={'Ban chua login'}
        linkTo={'/login'}
        titleLinkTo={'Login'}
    />
        <NotificationContainer/>

    </>)
}
export default ProductHome