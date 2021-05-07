import './ProductHome.css'
import { useEffect } from 'react';
import clientRequest from '../../../APIFeatures/clientRequest';
import { useState } from 'react';
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
    useEffect(()=>{
        clientRequest.getProductDetail(props.match.params.id).then(res=>setProduct(res.product))
    },[])
    return (<div className="row product-home" style={{position:'relative'}}>
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
            <div style={{display:'flex',justifyContent:'space-between'}}> <button className='btn-product-home'>Mua ngay</button>
            <button className='btn-product-home'>Thêm vào giỏ</button></div>
           

        </div>
    </div>)
}
export default ProductHome