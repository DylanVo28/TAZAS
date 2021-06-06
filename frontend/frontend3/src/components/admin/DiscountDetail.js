import clientRequest from "../../APIFeatures/clientRequest"
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { useEffect,useState } from 'react';
import { getFormattedDate,formattedDateFromParse } from "../../HandlerCaculate/formatDate";
import Modal from 'react-awesome-modal';

const DiscountDetail=(props)=>{
  const  [discount,setDiscount]=useState()
  const [openModal,setOpenModal]=useState(false)
  useEffect( async ()=>{
    if(props.match.path=="/admin/discount/:id"){
      const res=await clientRequest.getDiscountDetail(props.match.params.id)
      setDiscount(res.discount)
    }
  },[])
    const convertDate=(date)=>{
        const d=new Date(date)
        return Date.parse(d)
    }
    const submitHanddler=async (e)=>{

        e.preventDefault();
        
        const list=await clientRequest.getListDiscount(document.getElementsByName('name')[0].value)
        if(list.discounts.length!=0){
          NotificationManager.error("Error","Tên đã trùng, vui lòng đổi tên khác")
          return
        }
        
        const data={
            name:document.getElementsByName('name')[0].value,
            categoryProduct:document.getElementsByName('categoryProduct')[0].value,
            validDate:convertDate(document.getElementsByName('validDate')[0].value),
            quantity:Number( document.getElementsByName('quantiy')[0].value),
            value:Number( document.getElementsByName('value')[0].value)
        }
        await clientRequest.createDiscount(data).then(res=>NotificationManager.success("Success","Create Success"))
    }
    const removeDiscountItem=async ()=>{
      await clientRequest.removeDiscount(discount._id).then(res=>{
        NotificationManager.success("Success","Remove Success")
        window.location.href='/admin/discounts'
      }
        
        ).catch(err=>
          NotificationManager.error("Error","Remove failed")
          )
    }
    
    const updateDiscountItem=async()=>{
      const data=document.getElementsByName('addStock')[0].value
      await clientRequest.updateStock(discount._id,data).then(res=>{
        NotificationManager.success('success',"success")
        setOpenModal(false)
      })
    }
    const ModalStock=()=>{
      return <Modal  visible={openModal} width="400" height="300" effect="fadeInUp"
      onClickAway={() => setOpenModal(false)}
      >  <div  className='popup-tazas text-center'>
          <div style={{margin:'auto'}}> 
                <h6>Update stock</h6>
                <input placeholder="Input quantity" name='addStock'/>
                    <div className='btn-group btn'>
                         <button className='btn btn-success' onClick={()=>updateDiscountItem()}>
                          Update
                         </button>
                         <button className='btn'>
                         <a href="javascript:void(0);"
                          onClick={() =>setOpenModal(false)}
                          >Close</a>
                         </button>
                         
                     </div>
                     </div>
                     </div>
                 </Modal>
    }
    return <div className='row'>
        <div className='col-md-6'>
        <form onSubmit={submitHanddler}>
  <div className="form-group">
    <label htmlFor="formGroupExampleInput">Name</label>
    <input type="text" className="form-control" id="formGroupExampleInput" defaultValue={discount&&discount.name} name='name' disabled={props.match.path=="/admin/discount/:id"}/>
  </div>
  <div className="form-group col-md-4">
            <label>Category</label>
            <select disabled={props.match.path=="/admin/discount/:id"} className="form-control" name='category' defaultValue={discount&&discount.categoryProduct} name='categoryProduct'>
              <option selected>Jackets & Coats</option>
              <option>Hoodies & Sweatshirts</option>
              <option>Cardigan & Jumpers</option>
              <option>T-shirt & Tanks</option>
              <option>Shoes</option>
              <option>Shirts</option>
              <option>Basics</option>
              <option>Blazers & Suits</option>
              <option>Shorts</option>
              <option>Trousers</option>
              <option>Jeans</option>
              <option>Swimwear</option>
              <option>Underwear</option>
              <option>Socks</option>

              
            </select>
          </div>
  <div className="form-group">
    <label htmlFor="formGroupExampleInput2">Valid Date</label>
    <input disabled={props.match.path=="/admin/discount/:id"} type="date" id="start" name="validDate" defaultValue={discount?formattedDateFromParse(discount.validDate):Date.now()} min="2018-01-01" max="2099-12-31" />

  </div>
  <div className="form-group">
    <label htmlFor="formGroupExampleInput2">Quantity</label>
    <input disabled={props.match.path=="/admin/discount/:id"} type="text" className="form-control" id="formGroupExampleInput2" defaultValue={discount&&discount.quantity} name='quantiy'/>
  </div>
  <div className="form-group">
    <label htmlFor="formGroupExampleInput2">Value (%)</label>
    <input disabled={props.match.path=="/admin/discount/:id"} type="text" className="form-control" id="formGroupExampleInput2" defaultValue={discount&&discount.value} name='value'/>
  </div>
  {props.match.path=="/admin/create-discount"&&<button type='submit'>Create Discount</button>}

</form>
{props.match.path=="/admin/discount/:id"&&<button onClick={()=>setOpenModal(true)}>Update Stock</button>}

<NotificationContainer/>
<ModalStock/>
        </div>
    </div>
}
export default DiscountDetail