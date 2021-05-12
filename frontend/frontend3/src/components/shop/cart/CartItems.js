import { useEffect } from 'react';
import clientRequest from '../../../APIFeatures/clientRequest';
import { useState } from 'react';
import { Table } from 'react-bootstrap';

const CartItems=()=>{
    const [cartItems,setCartItems]=useState([])
    const [user,setUser]=useState({})
    useEffect(()=>{
      fetchMyAPI()
      
    },[])

   
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
        setCartItems(cartFilter)
      }
      const handleChecked=(index)=>e=>{
        let newArr = [...cartItems];
        newArr[index].checked =e.currentTarget.checked; 
        setCartItems(newArr)
      }
      const handleSubmit=()=>{
        
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
    <td><button className='btn btn-danger fas fa-trash' onClick={()=>removeItem(item._id)}></button></td>
</tr>})
}
  </tbody>
</Table>
        </div>
        <div className="col-md-6">
        <button className='btn' onClick={()=>handleSubmit()}>Order Now</button>

        </div>
        </div>
    </div></>
}
export default CartItems