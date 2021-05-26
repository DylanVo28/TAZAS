import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { NotificationManager, NotificationContainer } from 'react-notifications';
import clientRequest from '../../APIFeatures/clientRequest';
import {getFormattedDate} from './../../HandlerCaculate/formatDate';
import ModalPopup from './../shared/ModalPopup';

const OrderDetail=(props)=>{
    const [order,setOrder]=useState({})
    const [user,setUser]=useState({})
    const [showModal,setShowModal]=useState(false)
    const [tableItems,setTableItems]=useState()
    useEffect(() => {
        if(props.match.path=='/order/me/:id'){
            async function fetchMyAPI() {
                clientRequest.getOrder(props.match.params.id).then(res=>{
                    setOrder(res.order)
                    setTableItems(res.orderItems)
                    setUser(res.user)
                })
            }
            fetchMyAPI()
        }
        if(props.match.path=='/admin/order/:id'){
            async function fetchMyAPIRoleAdmin() {
                clientRequest.getOrderRoleAdmin(props.match.params.id).then(res=>{
                    setOrder(res.order)
                    setTableItems(res.orderItems)
                    setUser(res.user)
                })
            }
            fetchMyAPIRoleAdmin()
        }
       
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
    <div className='col-9'>{user.emailUser}</div>
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
              {tableItems&&tableItems.map(item=><div className='row'>
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
    <div className='col-8'>{getFormattedDate(order.paidAt)}</div>
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
    <div className='col-8'>{getFormattedDate(order.createAt)}</div>
</div>
        </>
    }
    const deleteItem=()=>{
        props.match.path=='/admin/order/:id'  && clientRequest.deleteOrder(order._id).then(res=>{
            NotificationManager.success('Success', 'Delete success');
            window.location.href = '/admin/orders';
        })
        props.match.path=='/order/me/:id' && clientRequest.deleteMyOrder(order._id).then(res=>{
       NotificationManager.success('Success', 'Delete success');
            window.location.href = '/order/me';
            
        } ).catch(err=>NotificationManager.error('Error', 'Cannot delete order'))
    }
    const updateOrderStatus=(status)=>{
        clientRequest.updateOrder(order._id,status).then(res=>{setOrder({...order,orderStatus:res.order.orderStatus})
        NotificationManager.success('Success', 'success');
    }).catch(err=>NotificationManager.error('Success', 'error'))
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
        <div className='btn-group'>
        {(order.orderStatus=='Processing' && props.match.path=='/admin/order/:id')&&<button className='btn' 
        onClick={(status)=>updateOrderStatus('Confirmed')}>Confirm Order</button>}
        {(order.orderStatus=='Confirmed'&& props.match.path=='/admin/order/:id')&&<button className='btn' 
        onClick={(status)=>updateOrderStatus('Delivered')}>Delivered</button>}
        {(order.orderStatus=='Delivered'&& props.match.path=='/order/me/:id')&&<button className='btn' 
        onClick={(status)=>updateOrderStatus('Complete')}>Has Received</button>}
        
        <ModalPopup
         open={showModal}
         handleChange={()=>setShowModal(!showModal)}
         title={"Product delivered, doesn't delete"}
        //  linkTo={'/login'}
        //  titleLinkTo={'Login'}
        />
        </div>
    </div>
    )
}
export default OrderDetail