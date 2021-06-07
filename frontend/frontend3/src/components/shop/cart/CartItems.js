import { useEffect } from 'react';
import clientRequest from '../../../APIFeatures/clientRequest';
import { useState } from 'react';
import { Table } from 'react-bootstrap';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import '../cart/CartItems.css'
import { compareValidDate } from '../../../HandlerCaculate/formatDate';
import { Link } from 'react-router-dom';
// import Cards from 'react-credit-cards';
// import 'react-credit-cards/es/styles-compiled.css';
// import { useStripe,useElements,CardElement,CardNumberElement} from '@stripe/react-stripe-js';
const CartItems=(props)=>{
    const [cartItems,setCartItems]=useState([])
    const [user,setUser]=useState(null)
    const [itemsPrice,setItemsPrice]=useState(0)
    const  [totalPrice,setTotalPrice]=useState(0)
    const [taxPrice,setTaxPrice]=useState(0)
    const [shippingPrice,setShippingPrice]=useState(2)
    const [creditInput,setCreditInput]=useState({
      cvc: '',
    expiry: '',
    focus: '',
    name: '',
    number: '',
    })
    const [searchDiscount,setSearchDiscount]=useState('');
    const [stDiscount,setStDiscount]=useState();
   
    useEffect(async ()=>{
      fetchMyAPI()
      if(props.match.path=='/order/create-new'){
        var list=[]
        var temp=JSON.parse(localStorage.getItem('cartItem'));
        temp.quantity=1;
        temp.total=temp.price* temp.quantity
        temp.checked=true
        temp.product=temp._id
        list.push(temp)
        setCartItems(list)
   

      }
      else{
        
        const cart=await clientRequest.getCart();
        setCartItems(cart.myCart)
      }
     
    },[])
    useEffect(()=>{
      
     var total = cartItems.reduce(function(acc, item){
       
       if(item.checked) {
         if(stDiscount &&(stDiscount.categoryProduct==item.category)){
           return acc + (item.quantity * item.price-(item.quantity*item.price*stDiscount.value*0.01));
         }
        return acc+ (item.quantity*item.price)
       }
       return acc
  }, 0);
  var tax=total*0.1
  setItemsPrice(total)
  setTaxPrice(tax)
  setTotalPrice(total+tax+shippingPrice)
  
    },[cartItems,stDiscount])
   
    async function fetchMyAPI() {
      const cart=await clientRequest.getProfileMe();
      setUser(cart.user)
    }
      const updateCartChanged=(index)=>e=>{
        let newArr = [...cartItems];
        newArr[index].quantity =Number (e.target.value); 
        newArr[index].total =Number (e.target.value*newArr[index].price); 
        setCartItems(newArr)
      }
      const removeItem=(id)=>{
        const cartFilter=cartItems.filter(item=>item._id!=id)
        clientRequest.updateCartItem(id).then(res=>NotificationManager.success('success','update success'))
        setCartItems(cartFilter)
      }
      const handleChecked=(index)=>e=>{
        let newArr = [...cartItems];
        newArr[index].checked =e.currentTarget.checked; 
        setCartItems(newArr)
      }
      const handleSubmit=()=>{
        const orderItems=cartItems.filter(item=>item.checked)
        const data={
          shippingInfo:{
            address: document.getElementsByName('address')[0].value,
            city: document.getElementsByName('city')[0].value,
            phoneNo: document.getElementsByName('phoneNo')[0].value,
            postalCode:document.getElementsByName('postalCode')[0].value,
            country:document.getElementsByName('country')[0].value,
        },
        user:user._id,
        orderItems,
        itemsPrice:Number (itemsPrice),
                totalPrice:Number (totalPrice),
                shippingPrice: Number(shippingPrice),
                taxPrice:Number(taxPrice),
                orderStatus:'Processing',
                discountId: stDiscount?stDiscount._id:null
        }
        if(!data.shippingInfo.address || !data.shippingInfo.city || !data.shippingInfo.phoneNo || !data.shippingInfo.postalCode || !data.shippingInfo.country){
          NotificationManager.error("Error","Vui lòng nhập thông tin đầy đủ")
          return
        }
        if(data.orderItems.length==0){
          NotificationManager.error("Error","Giỏ hàng rỗng hoặc chưa có chọn sản phẩm nào")
          return
        }
        clientRequest.postOrder(data).then(res=>{console.log(res)
        NotificationManager.success("Success","tao đơn thành công")
        })
      }
     
     const applyCode=async(e)=>{
        const res=await clientRequest.getDiscount(searchDiscount).catch(err=>{ NotificationManager.error('error','Code không tồn tại')
        setStDiscount(null)})
        
        if(res){
          if(res.discount.quantity==0){
            NotificationManager.error('error','Code đã sài hết')
            setStDiscount(null)
            return
          }
          if(!compareValidDate(res.discount.validDate)){
            NotificationManager.error('error','Code đã hết hạn')
          setStDiscount(null)
            return
          }
          NotificationManager.success('success','apply thành công')
          setStDiscount(res.discount)
        }
       
     }
    return <>
    <div style={{height:'80px'}}></div>
    <div className=''>
        <div className='row'>
        <div className='col-md-8'>
          <div>
        <Table striped bordered hover>
  <thead>
    <tr>
      <th></th>
      <th>Name</th>
      <th>Image</th>
      <th>Quantity</th>
      <th>Price</th>
      <th>Total</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    {cartItems && cartItems.map((item,index)=> {
    return <tr >
      <td><input type="checkbox" defaultChecked={item.checked} onChange={handleChecked(index)}/></td>
  <td>{item.name}</td>
  {item.images&&<td><img src={item.images[0].url}/></td> }
  {item.image&&<td><Link to={`/product/${item.product}`}><img src={item.image}/></Link></td>}
  <td> <input defaultValue={item.quantity} type='Number' min={1} onChange={updateCartChanged(index)}/></td>
  <td>{item.price}</td>
  <td>{item.total}</td>

    <td><button className='btn btn-danger fas fa-trash' onClick={()=>removeItem(item._id)}></button></td>
    
</tr>})
}
  </tbody>
</Table>
</div>
        </div>
        <div className="col-md-4">
        {user && <div className='user-cart-items'>
             <img src={user.avatar.url}/>
              <div className='row'>
                <div className="col-md-4">Name</div>
                <div className="col-md-8">{user.name}</div>
                <div className="col-md-4">Email</div>
                <div className="col-md-8">{user.email}</div>
              </div>
             

          </div>
          }
           <form>
                <div className="form-group">
                    <label htmlFor="exampleInputAddress">Address</label>
                    <input type="text" className="form-control" id="exampleInputAddress"  placeholder="Enter address" name='address'/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputCity">City</label>
                    <input type="text" className="form-control" id="exampleInputCity" placeholder="City" name='city'/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPhoneNo">Phone Number</label>
                    <input type="text" className="form-control" id="exampleInputPhoneNo" placeholder="Phone number" name='phoneNo'/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPostal">Postal Code</label>
                    <input type="text" className="form-control" id="exampleInputPostal" placeholder="Postal code" name='postalCode'/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputCountry">Country</label>
                    <input type="text" className="form-control" id="exampleInputCountry" placeholder="Country" name='country'/>
                </div>
                </form>
                <div>
                <span>Items Price:</span>
                <span>{itemsPrice}$ {stDiscount&&<span>(-{stDiscount.value}%)</span>}</span>
            </div>
            <div>
                <span>Shipping Price:</span>
                <span>{shippingPrice}$</span>
            </div>
            <div>
                <span>Tax Price:</span>
                <span>{taxPrice}$</span>
            </div>
            <div>
                <span>Total Price:</span>
                <span>{totalPrice}$</span>
            </div>
            <div>
              <span>Discount Code</span>
              <span><input placeholder='Nhập mã khuyến mãi' onChange={(e)=>setSearchDiscount(e.currentTarget.value)}/></span>
              <span><button disabled={searchDiscount==''?true:false} onClick={()=>applyCode()}>Apply code</button></span>
              {stDiscount && <p style={{color:"green"}}>Áp dụng cho thể loại : {stDiscount.categoryProduct}</p>}
            </div>
           
        <button className='btn' onClick={()=>handleSubmit()}>Order Now</button>

        </div>
        </div>
       

        
        
        <NotificationContainer/>
    </div></>
}
export default CartItems