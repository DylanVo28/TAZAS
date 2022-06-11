import Modal from 'react-awesome-modal';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ModalPopup.css'
const ModalComponent=(props)=>{
    const [visible,setVisible]=useState(false)
    
    useEffect(()=>{
        setVisible(props.open)
    },[props.open])
    const openModal=()=> {
        setVisible(true)
        props.handleChange()
    }
    const closeModal=()=>{
        setVisible(false)
    }
    
    return <Modal  visible={visible} width="400" height="300" effect="fadeInUp"
     onClickAway={() => closeModal()}
     >  <div  className='popup-tazas text-center'>
         <div style={{margin:'auto'}}>{props.form}

                   <div className='btn-group btn'>
                   <button className='btn'>
                     
                   <a href="javascript:void(0);"
                         onClick={() =>props.submit()}
                         >Send Transaction</a>
                        </button>
                        <button className='btn'>
                      
                        <a href="javascript:void(0);"
                         onClick={() =>closeModal()}
                         >Close</a>
                        </button>
                        
                    </div>
                    </div>
                    </div>
                </Modal>
}
export default ModalComponent
