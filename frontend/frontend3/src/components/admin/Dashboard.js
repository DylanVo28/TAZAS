import { set } from 'mongoose';
import { Fragment, useEffect, useState } from 'react';
import { React } from 'react';
import store from '../../store';
import CardItem from './CardItem';
import Menu from './Menu';
import Sidebar from './Sidebar';
import {loadUser} from '../../actions/userActions'
import clientRequest from '../../APIFeatures/clientRequest';

const axios = require('axios');
const Dashboard=()=>{
    const [stProducts,setStProducts]=useState(0);
    const [stOrders,setStOrders]=useState({
        totalPayment:0,
        orders:[]
    })
    const [stUsers,setStUsers]=useState(0)
    useEffect(()=>{
        clientRequest.getLengthAllProducts().then(res=>setStProducts(res.lengthProducts))
        clientRequest.getOrders().then(res=>setStOrders({
            ...stOrders,totalPayment:res.totalPayment,orders:res.orders
        }))
        clientRequest.getAllUser().then(res=>setStUsers(res.user.length))
       
    },[])
    return (
        
                
                <div className='container-fluid py-4'>
                    <div className='row'>
                    <CardItem title="Products" total={stProducts} icon="fas fa-archive"/>
                    <CardItem title="Orders" total={stOrders.orders.length} icon="fas fa-shipping-fast"/>
                    <CardItem title="User" total={stUsers} icon="fas fa-user"/>
                    <CardItem title="Total Payment" total={stOrders.totalPayment} icon="fas fa-dollar-sign"/>
                    </div>
                </div>

    )
}
export default Dashboard