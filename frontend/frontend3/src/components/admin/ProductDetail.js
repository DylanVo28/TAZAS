
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { Redirect, Switch } from 'react-router-dom';
import clientRequest from '../../APIFeatures/clientRequest';
import imageDefault from '../../images/default.jpg'

const ProductDetail=(props)=>{
  
  const [avatar,setAvatar]=useState('')
  const [avatarPreview,setAvatarPreview]=useState('')
  const [stProduct,setStProduct]=useState({
    name:'',
    price:0,
    description:'',
    images:[{
      public_id:"",
      url:""
    }],
    classify:'',
    category:'',
    stock:0,
  })
  useEffect(()=>{
    if(props.match.path=='/admin/create-product'){
      console.log('CREATE_PRODUCT')
    }
    else if(props.match.path=='/admin/product/:id'){
      clientRequest.getProductDetail(props.match.params.id).then(res=>{
        setStProduct(res.product)
        setAvatarPreview(res.product.images[0].url)
        setAvatar(res.product.images[0].url)
      })
      
    }
  },[])
  const submitHandler=(e)=>{
    e.preventDefault();
    if(props.match.path=='/admin/create-product'){
      const data={
        name:document.getElementsByName('name')[0].value,
        price:Number(document.getElementsByName('price')[0].value),
        description:document.getElementsByName('descriptionInput')[0].value,
        classify:document.getElementsByName('classify')[0].value,
        category:document.getElementsByName('category')[0].value,
        stock:Number(document.getElementsByName('stock')[0].value),
        image:avatar
      }
      const config={
        headers:{
            'Content-Type':'application/json'
        }
    }
    clientRequest.newProduct(data).then(NotificationManager.success('Success', 'Success'))
    
    }
    else{
      
      setStProduct({...stProduct,
      name:document.getElementsByName('name')[0].value,
      price:Number(document.getElementsByName('price')[0].value),
      description:document.getElementsByName('descriptionInput')[0].value,
      classify:document.getElementsByName('classify')[0].value,
      category:document.getElementsByName('category')[0].value,
      stock:Number(document.getElementsByName('stock')[0].value)

      })
      const data={
        name:document.getElementsByName('name')[0].value,
        price:Number(document.getElementsByName('price')[0].value),
        description:document.getElementsByName('descriptionInput')[0].value,
        classify:document.getElementsByName('classify')[0].value,
        category:document.getElementsByName('category')[0].value,
        stock:Number(document.getElementsByName('stock')[0].value),
        image:avatar
      }
    

    //update duoc nhung bao loi
    clientRequest.updateProduct(stProduct._id,data).then(NotificationManager.success('Success', 'Success'))
      
    }
    

  }
  const deleteItem=(id)=>{
    
  clientRequest.deleteProduct(id).then(res=>{NotificationManager.success('Success', 'Success')
    window.history.go(-1)
  }).catch(err=> NotificationManager.error('Error', 'Error'))
     
      
  }
  const Form =()=>{
    return(<form style={{padding:'30px 0'}} onSubmit={submitHandler}>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label>Name</label>
            <input type="text" className="form-control" placeholder="Name product" name="name" defaultValue={stProduct.name} />
          </div>
          <div className="form-group col-md-6">
          <label>Price</label>

            <input type="text" className="form-control" placeholder="Price product" name="price" defaultValue={stProduct.price}/>
          </div>
        </div>
        <div className="form-group">
        <label>Description</label>

          <textarea class="form-control" placeholder="Description" rows="3" name="descriptionInput" defaultValue={stProduct.description}></textarea>
        </div>
        
        <div className="form-row">
          {/* <div className="form-group col-md-6">
            <label htmlFor="inputCity">City</label>
            <input type="text" className="form-control" id="inputCity" />
          </div> */}
          <div className="form-group col-md-4">
            <label>Classify</label>
            <select className="form-control" name='classify' defaultValue={stProduct.classify}>
              <option selected>Men</option>
              <option>Women</option>
              <option>Kid</option>
            </select>
          </div>
          <div className="form-group col-md-4">
            <label>Category</label>
            <select className="form-control" name='category' defaultValue={stProduct.category}>
              <option selected>Jackets & Coats</option>
              <option>Hoodies & Sweatshirts</option>
              <option>Cardigan & Jumpers</option>
              <option>T-shirt & Tanks</option>
              <option>Shoes</option>
              <option>Shirts</option>
              <option>Basics</option>
              <option>Blazers & Suits</option>
              <option>Shorts</option>
              <option>Trousers</option>
              <option>Jeans</option>
              <option>Swimwear</option>
              <option>Underwear</option>
              <option>Socks</option>

              
            </select>
          </div>
          <div className="form-group col-md-4">
            <label>Stock</label>
            <input type="text" className="form-control" placeholder="Stock" name="stock" defaultValue={stProduct.stock}/>
          </div>
        </div>
        
        <button type="submit" className="btn btn-primary">Save</button>
        {props.match.path=='/admin/product/:id' && <button style={{marginLeft:'15px'}} type="submit" className="btn btn-danger" onClick={()=>deleteItem(stProduct._id)}>Delete</button>}
      </form>
      )
}
const onChangeAvatar=(e)=>{
  const reader=new FileReader()
  reader.onload=()=>{
    if(reader.readyState===2){
      setAvatarPreview(reader.result)
      setAvatar(reader.result)
    }
  }
  reader.readAsDataURL(e.target.files[0])
}
const InputImage=()=>{
    return(<div className="custom-file">
      <label > product image</label>
    <input
     type='file'
     name='avatar'
     className='custom-file-input'
     accept='images/*'
     onChange={(e)=>onChangeAvatar(e)}
    required />
    <div className="invalid-feedback">Example invalid custom file feedback</div>
    <img src={(avatar)?(avatar):(imageDefault)} style={{width:'100%'}}/>
  </div>
  )
}
    return(
        <div style={{paddingTop:'30px'}}>
            <h3>{props.match.path=='/admin/create-product'?('Create Product'):('Product Detail')}</h3>
        
       <div className="row">
           <div className="col-md-7 form">
            <Form/>
           </div>
           <div className="col-md-1"></div>
           <div className="col-md-3 form">
           <InputImage/>
           </div>
       </div>
       <NotificationContainer/>

       </div>
    )
}
export default ProductDetail