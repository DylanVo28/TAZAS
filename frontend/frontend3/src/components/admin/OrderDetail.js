import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';

const OrderDetail=(props)=>{
    const [order,setOrder]=useState({})
    const [user,setUser]=useState({})
    
    useEffect(() => {
        async function fetchMyAPI() {
            const userToken=localStorage.getItem("token")
            await axios.get(`http://localhost:4000/api/v1/order/${props.match.params.id}`,{
                params:{
                    userToken
                }
            }).then(res=>{setOrder(res.data.order)
                axios.get(`http://localhost:4000/api/v1/admin/user/${res.data.order.user}`,{
                    params:{
                        userToken
                    }
                }
                ).then(res=>setUser(res.data.user))
            })
    
            
        }
    
        fetchMyAPI()
      }, [])
   const FormUser=()=>{
                return (<>
                <h4>User</h4>
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
    <div className='col-3'>Status:</div>
    <div className='col-9'>{(order.paymentInfo)?(order.paymentInfo.status):('')}</div>
    <div className='col-3'>Paid At:</div>
    <div className='col-9'>{order.paidAt}</div>
    <div className='col-3'>Items Price:</div>
    <div className='col-9'>{order.itemsPrice}</div>
    <div className='col-3'>Tax Price:</div>
    <div className='col-9'>{order.taxPrice}</div>
    <div className='col-3'>Shipping Price:</div>
    <div className='col-9'>{order.shippingPrice}</div>
    <div className='col-3'>Total Price:</div>
    <div className='col-9'>{order.totalPrice}</div>
    <div className='col-3'>Order Status:</div>
    <div className='col-9'>{order.orderStatus}</div>
    <div className='col-3'>Created At:</div>
    <div className='col-9'>{order.createAt}</div>
</div>
        </>
    }
    return (        <div className="container-fluid py-4">
        <div className="row">
            <div className="col-md-6">
                <FormShippingInfo/>
            </div>
            <div className="col-md-6">
                <FormUser/>
            </div>
            <div className="col-md-6">
                <FormItems/>
            </div>
            <div className="col-md-6">
                <FormTotal/>
            </div>
        </div>
    </div>
    )
}
export default OrderDetail