import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { NotificationManager, NotificationContainer } from 'react-notifications';
import clientRequest from '../../APIFeatures/clientRequest';

const OrderDetail=(props)=>{
    const [order,setOrder]=useState({})
    const [user,setUser]=useState({})
    
    useEffect(() => {
        async function fetchMyAPI() {
            clientRequest.getOrder(props.match.params.id).then(res=>{
                setOrder(res.order)
                clientRequest.getUser(res.order.user).then(res=>setUser(res.user))
            })
        }
    
        fetchMyAPI()
      }, [])
   const FormUser=()=>{
                return (<>
                <h4>Customer</h4>
                {user._id&&<div className='row form-user'>
                    <div className='col-12'>
                        <div className="avatar">
                        <img src={user.avatar.url}/>

                        </div>
                    </div>
                <div className='col-3'>Email:</div>
    <div className='col-9'>{user.email}</div>
    <div className='col-3'>Name:</div>
    <div className='col-9'>{user.name}</div>

                    </div>}
       </>)
   }
    const FormShippingInfo=()=>{
        return (<>
        <h4>Shipping Info</h4>{order.shippingInfo&&
                <div className={'row'}>

                    <div className='col-3'>Address:</div>
    <div className='col-9'>{order.shippingInfo.address}</div>
    <div className='col-3'>City:</div>
    <div className='col-9'>{order.shippingInfo.city}</div>
    <div className='col-3'>Phone Num:</div>
    <div className='col-9'>{order.shippingInfo.phoneNo}</div>
    <div className='col-3'>Postal Code:</div>
    <div className='col-9'>{order.shippingInfo.postalCode}</div>
    <div className='col-3'>Country:</div>
    <div className='col-9'>{order.shippingInfo.country}</div>
    

</div>}</>)
    }
    const FormItems=()=>{
        return <>
            <h4>Order Items</h4>{order.orderItems&&<>
              <div className='row'>
                <div className='col-3'>Name</div>
                <div className='col-3'>Quantity</div>
                <div className='col-3'>Image</div>
                <div className='col-3'>Price</div>


              </div>
              {order.orderItems.map(item=><div className='row'>
              <div className='col-3'>{item.name}</div>
                <div className='col-3'>{item.quantity}</div>
                <div className='col-3'>
                    <img src={item.image} style={{width:'40px'}}/>
                    </div>
                <div className='col-3'>{item.price}</div>
              </div>)}
              </>
                }
         </>
    }
    const FormTotal=()=>{
        return <>
                <h4>Total</h4>
                <div className={'row'}>
    <div className='col-4'>Status:</div>
    <div className='col-8'>{(order.paymentInfo)?(order.paymentInfo.status):('')}</div>
    <div className='col-4'>Paid At:</div>
    <div className='col-8'>{order.paidAt}</div>
    <div className='col-4'>Items Price:</div>
    <div className='col-8'>{order.itemsPrice}</div>
    <div className='col-4'>Tax Price:</div>
    <div className='col-8'>{order.taxPrice}</div>
    <div className='col-4'>Shipping Price:</div>
    <div className='col-8'>{order.shippingPrice}</div>
    <div className='col-4'>Total Price:</div>
    <div className='col-8'>{order.totalPrice}</div>
    <div className='col-4'>Order Status:</div>
    <div className='col-8'>{order.orderStatus}</div>
    <div className='col-4'>Created At:</div>
    <div className='col-8'>{order.createAt}</div>
</div>
        </>
    }
    const deleteItem=()=>{
        clientRequest.deleteOrder(order._id).then(res=>{
            NotificationManager.success('Success', 'Login success');
            window.location.href = '/admin/orders';
        })
        
    }
    return (        <div className="container-fluid py-4 order-detail">
        <div className="row">
            <div className="col-md-5 frame">
                <FormShippingInfo/>
            </div>
            <div className="col-md-2"></div>
            
            <div className="col-md-5 frame">
                <FormUser/>
            </div>
        </div>
        <br></br>
        <div className="row">
            <div className="col-md-6 frame">
                <FormItems/>
            </div>
            <div className="col-md-2"></div>
            <div className="col-md-4 frame">
                <FormTotal/>
            </div>
        </div>
       <NotificationContainer/>
        
        <button className="btn btn-danger" onClick={()=>deleteItem()}>Delete</button>
    </div>
    )
}
export default OrderDetail