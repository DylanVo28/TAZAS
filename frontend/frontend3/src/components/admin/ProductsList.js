import axios from 'axios';
import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const ProductsList=()=>{
    const [listProduct,setListProduct]=useState([])
    useEffect(()=>{
        axios.get('http://localhost:4000/api/v1/products')
        .then(res=>setListProduct(res.data.products))
    },[])
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
                    <span className="text-secondary text-xs font-weight-bold">{product.createdAt}</span>
                  </td>
                  <td className="align-middle">
                    <Link  to={"/admin/product/"+product._id} className="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit user">
                      Edit
                    </Link>
                  </td>
                  
                </tr>
    }
    return (
        <div className="container-fluid py-4">
  <div className="row">
    <div className="col-12">
      <div className="card mb-4">
        <div className="card-header pb-0">
          <h6>Product List</h6>
        </div>
        <div className="card-body px-0 pt-0 pb-2">
          <div className="table-responsive p-0">
            <table className="table align-items-center mb-0">
              <thead>
                <tr>
                  <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Name</th>
                  <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">User</th>
                  <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Status</th>
                  <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">CreatedAt</th>
                  <th className="text-secondary opacity-7" />
                </tr>
              </thead>
              <tbody>
                  {listProduct.map(item=>{return ProductRow(item)})}
               
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
 
</div>

    )
}
export default ProductsList