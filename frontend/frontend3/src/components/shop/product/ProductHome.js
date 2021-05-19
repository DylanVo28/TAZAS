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
    useEffect(()=>{

        clientRequest.getProductDetail(props.match.params.id).then(res=>setProduct(res.product))
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