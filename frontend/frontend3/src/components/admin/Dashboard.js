import { Fragment, useEffect } from 'react';
import { React } from 'react';
import CardItem from './CardItem';
import Menu from './Menu';
import Sidebar from './Sidebar';
const axios = require('axios');
const Dashboard=()=>{
    useEffect(()=>{
        axios.get('localhost:4000/api/v1/products').then(res=>console.log(res))
    },[])
    return (
        <Fragment>
            <div>
                <Sidebar/>
                <main className='main-content mt-1 border-radius-lg'>
                <Menu/>
                <div className='container-fluid py-4'>
                    <div className='row'>
                    <CardItem/>
                    <CardItem/>
                    <CardItem/>

                    </div>
                </div>
                </main>

            </div>
        </Fragment>
    )
}
export default Dashboard