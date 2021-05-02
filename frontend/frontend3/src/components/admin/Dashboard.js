import { set } from 'mongoose';
import { Fragment, useEffect, useState } from 'react';
import { React } from 'react';
import CardItem from './CardItem';
import Menu from './Menu';
import Sidebar from './Sidebar';
const axios = require('axios');
const Dashboard=()=>{
    const [stProducts,setStProducts]=useState(0);
    const [stOrders,setStOrders]=useState([])
    const [stUsers,setStUsers]=useState([])
    useEffect(()=>{
        axios.get('http://localhost:4000/api/v1/length-product')
        .then(res=>setStProducts(res.data.lengthProducts))
        axios.get('http://localhost:4000/api/v1/admin/orders').then(res=>setStOrders(res.data.orders))
        axios.get('http://localhost:4000/api/v1/admin/all-user').then(res=>setStUsers(res.data.user))
    },[])
    return (
        
                
                <div className='container-fluid py-4'>
                    <div className='row'>
                    <CardItem title="Products" total={stProducts} icon="fas fa-archive"/>
                    <CardItem title="Orders" total={stOrders.length} icon="fas fa-shipping-fast"/>
                    <CardItem title="User" total={stUsers.length} icon="fas fa-user"/>

                    </div>
                </div>

    )
}
export default Dashboard