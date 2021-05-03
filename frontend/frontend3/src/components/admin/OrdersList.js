import Pagination from 'react-js-pagination';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const OrdersList=()=>{
    const [stOrders,setStOrders]=useState([])
    const [sizePage,setSizePage]=useState({
        current:1,
        total:0,
        count:10,
  
      })
    useEffect(()=>{
        axios.get('http://localhost:4000/api/v1/admin/orders').then(res=>{
            setStOrders(res.data.orders)
            setSizePage({...sizePage,total:res.data.orders.length})
        })
        
        
    },[])
    const getFormattedDate=(dateString) =>{
        const date = new Date(dateString);  
        var year = date.getFullYear();
      
        var month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;
      
        var day = date.getDate().toString();
        day = day.length > 1 ? day : '0' + day;
        
        return day+'/'+month + '/'  + year;
      }
    const ProductRow=(order)=>{
        return <tr>
            
                  <td>
                  <p className="text-xs font-weight-bold mb-0">{order._id}</p>
                  </td>
                  <td>
                    <p className="text-xs font-weight-bold mb-0">{order.totalPrice}</p>
                  </td>
                  <td className="align-middle text-center text-sm">
                  <p className="text-xs font-weight-bold mb-0">{order.orderStatus}</p>

                  </td>
                  <td className="align-middle text-center">
                    <span className="text-secondary text-xs font-weight-bold">{getFormattedDate(order.createAt)}</span>
                  </td>
                  <td className="align-middle">
                    <Link  to={"/admin/order/"+order._id} className="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit user">
                      Detail
                    </Link>
                  </td>
                  
                </tr>
    }
    const handlePageChange=(pageNumber)=> {
        setSizePage(sizePage=>({...sizePage,current:pageNumber}))
      }
    return (<div className="container-fluid py-4">
    <div className="row">
      <div className="col-12">
        <div className="card mb-4">
          <div className="card-header pb-0">
            <h6>Order List</h6>
            <div style={{display:'flex',justifyContent:'space-between'}}>
            </div>
            <br/>
  
          </div>
          <div className="card-body px-0 pt-0 pb-2">
            <div className="table-responsive p-0">
              <table className="table align-items-center mb-0">
                <thead>
                  <tr>
                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Order Id</th>
                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Total Price</th>
                    <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Status</th>
                    <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">CreatedAt</th>
                    <th className="text-secondary opacity-7" />
                  </tr>
                </thead>
                <tbody>
                    {stOrders.map(item=>{return ProductRow(item)})}
                 
                </tbody>
  
              </table>
              <div>
              <Pagination
          activePage={sizePage.current}
          itemsCountPerPage={sizePage.count}
          totalItemsCount={sizePage.total}
          itemClass="page-item"
          linkClass="page-link"
          onChange={(e)=>handlePageChange(e)}
        />
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
   
  </div>)
}
export default OrdersList