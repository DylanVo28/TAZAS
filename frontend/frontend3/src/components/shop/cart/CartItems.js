import { useEffect } from 'react';
import clientRequest from '../../../APIFeatures/clientRequest';
import { useState } from 'react';
import { Table } from 'react-bootstrap';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import { useStripe,useElements,CardElement,CardNumberElement} from '@stripe/react-stripe-js';
const CartItems=()=>{
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
    const stripe = useStripe();
    const elements = useElements();
    useEffect(()=>{
      fetchMyAPI()
      clientRequest.getCart().then(res=>console.log(res))
    },[])
    useEffect(()=>{
    
     var total = cartItems.reduce(function(acc, item){
       
       if(item.checked) {
        return acc + (item.quantity * item.price);
       }
       return acc
  }, 0);
  var tax=total*0.1
  setItemsPrice(total)
  setTaxPrice(tax)
  setTotalPrice(total+tax+shippingPrice)
  
    },[cartItems])
   
    async function fetchMyAPI() {
      const cart=await clientRequest.getProfileMe();
      setCartItems(cart.user.cartItems) 
      setUser(cart.user)
    }
      const updateCartChanged=(index)=>e=>{
        let newArr = [...cartItems];
        newArr[index].quantity =Number (e.target.value); 
        setCartItems(newArr)
      }
      const removeItem=(id)=>{
        const cartFilter=cartItems.filter(item=>item._id!=id)
        clientRequest.updateCartItem(cartFilter).then(res=>NotificationManager.success('success','update success'))
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
                orderStatus:'Processing'
        }
        clientRequest.postOrder(data).then(res=>console.log(res))
      }
      const submitHandler=async (e)=>{
        e.preventDefault();
        const res=await clientRequest.processPayment(totalPrice)
        const clientSecret=res.client_secret
        console.log(clientSecret)
        const cardElement = elements.getElement(CardNumberElement);
        console.log(cardElement)
        const result=await stripe.confirmCardPayment(clientSecret,{
          payment_method:{
            card :cardElement,
            billing_details:{
              name: user.name,
              email: user.email
            }
          }
        })
      }
    return <>
    <div style={{height:'80px'}}></div>
    <div className='container'>
        <div className='row'>
        <div className='col-md-6'>
        <Table striped bordered hover>
  <thead>
    <tr>
      <th></th>
      <th>Name</th>
      <th>Image</th>
      <th>Quantity</th>
      <th>Price</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    {cartItems.map((item,index)=> {
    return <tr>
      <td><input type="checkbox" defaultChecked={item.checked} onChange={handleChecked(index)}/></td>
  <td>{item.name}</td>
  {item.image&&<td><img src={item.image}/></td>}
  <td> <input defaultValue={item.quantity} type='Number' onChange={updateCartChanged(index)}/></td>
  <td>{item.price}</td>
    <td><button className='btn btn-danger fas fa-trash' onClick={()=>removeItem(item._id)}></button></td>
</tr>})
}
  </tbody>
</Table>
        </div>
        <div className="col-md-6">
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
                <span>{itemsPrice}$</span>
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
        <button className='btn' onClick={()=>handleSubmit()}>Order Now</button>

        </div>
        </div>
       

        {/* <div id="PaymentForm">
       <Cards
       cvc={creditInput.cvc}
       expiry={creditInput.expiry}
       focused={creditInput.focus}
       name={creditInput.name}
       number={creditInput.number}
       />
       <form onSubmit={submitHandler}>
         <CardNumberElement
          
         />
        	<input
            type="tel"
            name="number"
            placeholder="Card Number"
           onBlur={(e)=>setCreditInput({...creditInput,number:e.currentTarget.value})}
          />
          	<input
            type="tel"
            name="name"
            placeholder="Name"
           onBlur={(e)=>setCreditInput({...creditInput,name:e.currentTarget.value})}
          />
          	<input
            type="tel"
            name="expiry"
            placeholder="expiry"
           onBlur={(e)=>{setCreditInput({...creditInput,expiry:e.currentTarget.value,focus:e.currentTarget.name})}}
          />
          <input
            type="tel"
            name="expiry"
            placeholder="expiry"
            onFocus={(e)=>setCreditInput({...creditInput,focus:'cvc'})}
           onBlur={(e)=>{setCreditInput({...creditInput,cvc:e.currentTarget.value})}}
          />
          ...
          <button type='submit'>Payment</button>
        </form>
        </div> */}
        
        <NotificationContainer/>
    </div></>
}
export default CartItems