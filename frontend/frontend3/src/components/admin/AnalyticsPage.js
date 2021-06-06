
import React from 'react';
import { Line } from 'react-chartjs-2';
import { useEffect } from 'react';
import clientRequest from '../../APIFeatures/clientRequest';
import { useState } from 'react';
const data = {
    labels: ['Ngày 6', 'Ngày 5', 'Ngày 4', 'Ngày 3', 'Ngày 2', 'Ngày 1'],
    datasets: [
      {
        label: 'product created',
        data: [12, 309, 3, 5, 2, 3],
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  };
  
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  
const AnalyticsPage=()=>{
  const [analyticProduct,setAnalyticProduct]=useState();
  const [analyticUser,setAnalyticUser]=useState();
  const [analyticOrder,setAnalyticOrder]=useState()
  const [topSellingProduct,setTopSellingProduct]=useState()
  const [topReviewProduct,setTopReviewProduct]=useState()
  const [topUser,setTopUser]=useState()
  const [filter,setFilter]=useState('week')
    useEffect(async()=>{
   
      
      Promise.all([
        await clientRequest.analyticsByProduct(filter),
        await clientRequest.analyticsByUser(filter),
        await clientRequest.analyticsByOrder(filter),
        await clientRequest.topSellingByProduct(filter),
        await clientRequest.topSellingByReview(filter),
        await clientRequest.topSellingByUser(filter)

      ]).then(res=>{
        console.log(res)
        setAnalyticProduct(res[0].data)
        setAnalyticUser(res[1].data)
        setAnalyticOrder(res[2].data)
        setTopSellingProduct(res[3].finalList)
        setTopReviewProduct(res[4].finalList)
        setTopUser(res[5].finalList)
      })
    },[filter])
    return  <>
    <div className='header'>
    <select className="form-select" aria-label="Default select example" onChange={(e)=>setFilter(e.target.value)}>
  <option value={'week'} selected>Filter By Week</option>
  <option value={'month'}>Filter By  Month</option>
  <option value={'year'}>Filter By Year</option>
</select>
      <div className='row'>
        <div className='col-md-6'>
        {analyticProduct&&<Line data={analyticProduct} options={options} />}

        </div>
        <div className='col-md-6'>
        {analyticUser && <Line data={analyticUser} options={options} />}

        </div>
        <div className='col-md-6'>
        {analyticOrder && <Line data={analyticOrder} options={options} />}

        </div>

      </div>
     <div className='row'>
      <div className='col-md-4'>
      <table className="table">
     
      <thead>
      <th scope="col">STT</th>
      <th scope="col">Name</th>
      <th scope="col">Quantity</th>
      </thead>
      <tbody>
        {topSellingProduct&& topSellingProduct.map((item,index)=> <tr>
          <th scope="row">{index+1}</th>
      <td>{item.name}</td>
      <td>{item.quantity}</td>
        </tr>)}
      </tbody>
      </table>
      </div>
      <div className='col-md-2'>
</div>
      <div className='col-md-4'>
      <table className="table">
     
      <thead>
      <th scope="col">STT</th>
      <th scope="col">Name</th>
      <th scope="col">Num of Review</th>
      </thead>
      <tbody>
        {topReviewProduct&& topReviewProduct.map((item,index)=> <tr>
          <th scope="row">{index+1}</th>
      <td>{item.name}</td>
      <td>{item.numOfReviews}</td>
        </tr>)}
      </tbody>
      </table>
      </div>
     </div>
     <div>
       <div className='row'>
         <div className='col-md-4'>
         <table className="table">
     
     <thead>
     <th scope="col">STT</th>
     <th scope="col">Name</th>
     <th scope="col">Num of Orders</th>
     </thead>
     <tbody>
       {topUser&& topUser.map((item,index)=> <tr>
         <th scope="row">{index+1}</th>
     <td>{item.name}</td>
     <td>{item.numOfOrders}</td>
       </tr>)}
     </tbody>
     </table>
         </div>
       </div>
     </div>
    </div>
  </>
}
export default AnalyticsPage