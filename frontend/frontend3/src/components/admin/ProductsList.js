import axios from 'axios';
import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Pagination from "react-js-pagination";
// require("bootstrap/less/bootstrap.less");

const ProductsList=()=>{
    const [listProduct,setListProduct]=useState([])
    const [searchName,setSearchName]=useState('')
    const [sizePage,setSizePage]=useState({
      current:1,
      total:0,
      count:10,

    })
    useEffect(()=>{
        axios.get('http://localhost:4000/api/v1/products')
        .then(res=>setListProduct(res.data.products))
        axios.get('http://localhost:4000/api/v1/length-product')
        .then(res=>setSizePage(sizePage=>({
          ...sizePage,
          total:res.data.lengthProducts
        })))
    },[])
    useEffect(()=>{
      axios.get(`http://localhost:4000/api/v1/products?keyword=${searchName}&page=${sizePage.current}`).then(res=>setListProduct(res.data.products))
    },[sizePage.current])
    const handlePageChange=(pageNumber)=> {
      setSizePage(sizePage=>({...sizePage,current:pageNumber}))
    }
    const getFormattedDate=(dateString) =>{
      const date = new Date(dateString);  
      var year = date.getFullYear();
    
      var month = (1 + date.getMonth()).toString();
      month = month.length > 1 ? month : '0' + month;
    
      var day = date.getDate().toString();
      day = day.length > 1 ? day : '0' + day;
      
      return day+'/'+month + '/'  + year;
    }
    const ProductRow=(product)=>{
        return <tr>
            
                  <td>
                    <div className="d-flex px-2 py-1">
                      <div>
                        <img src={product.images[0].url} className="avatar avatar-sm me-3" />
                      </div>
                      <div className="d-flex flex-column justify-content-center">
                        <h6 className="mb-0 text-sm">{product.name}</h6>
                        <p className="text-xs text-secondary mb-0">{product._id}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p className="text-xs font-weight-bold mb-0">{product.user}</p>
                  </td>
                  <td className="align-middle text-center text-sm">
                  <p className="text-xs font-weight-bold mb-0">{product.stock}</p>

                  </td>
                  <td className="align-middle text-center">
                    <span className="text-secondary text-xs font-weight-bold">{getFormattedDate(product.createdAt)}</span>
                  </td>
                  <td className="align-middle">
                    <Link  to={"/admin/product/"+product._id} className="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit user">
                      Edit
                    </Link>
                  </td>
                  
                </tr>
    }
    const onChangeSearchProduct=(e)=>{
      setSearchName(e.currentTarget.value)
      axios.get(`http://localhost:4000/api/v1/products?keyword=${e.currentTarget.value}`).then(res=>setListProduct(res.data.products))
    }
    return (
        <div className="container-fluid py-4">
  <div className="row">
    <div className="col-12">
      <div className="card mb-4">
        <div className="card-header pb-0">
          <h6>Product List</h6>
          <div style={{display:'flex',justifyContent:'space-between'}}>
          <input className='search-product' onChange={e=>onChangeSearchProduct(e)} placeholder="Search product"/>
          <Link name="" id="" class="btn create-button" to="/admin/create-product" role="button">Create Product</Link>
          </div>
          <br/>

        </div>
        <div className="card-body px-0 pt-0 pb-2">
          <div className="table-responsive p-0">
            <table className="table align-items-center mb-0">
              <thead>
                <tr>
                  <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Name</th>
                  <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">User</th>
                  <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Stock</th>
                  <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">CreatedAt</th>
                  <th className="text-secondary opacity-7" />
                </tr>
              </thead>
              <tbody>
                  {listProduct.map(item=>{return ProductRow(item)})}
               
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
 
</div>

    )
}
export default ProductsList