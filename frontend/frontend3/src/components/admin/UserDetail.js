import { useEffect } from 'react';
import { useState } from 'react';
import clientRequest from '../../APIFeatures/clientRequest';
import getFormattedDate from '../../HandlerCaculate/formatDate';
import Curved from '../../images/curved0.jpg'
import { NotificationManager, NotificationContainer } from 'react-notifications';
const UserDetail=()=>{
    const [user,setUser]=useState({
        name:"",
        url:'',
        email:"",
        password:"",
        avatar:[{
            public_id:"",
            url:"",
        }],
        role:"",
        createAt:""
    })
    const [avatarPr,setAvatarPr]=useState('')
    const [edit,setEdit]=useState(true)
    const [changePass,setChangePass]=useState(false);
    useEffect(()=>{
        clientRequest.getProfileMe().then(res=>{
          setUser(res.user)
          setAvatarPr(res.user.avatar.url)
        })
    },[])
    const onChangeAvatar=(e)=>{
      const reader=new FileReader()
      reader.onload=()=>{
        if(reader.readyState===2){
          setAvatarPr(reader.result)
        }
      }
      reader.readAsDataURL(e.target.files[0])
    }
    const MenuUser=()=>{
        return (user && <div className="container-fluid">
        <div className="page-header min-height-300 border-radius-xl mt-4" style={{backgroundImage: `url(${Curved})`, backgroundPositionY: '50%'}}>
          <span className="mask bg-gradient-primary opacity-6" />
        </div>
        <div className="card card-body blur shadow-blur mx-4 mt-n6">
          <div className="row gx-4">
            <div className="col-auto">
              <div className="avatar avatar-xl position-relative">
                 <img src={avatarPr} alt="..." className="w-100 border-radius-lg shadow-sm" />
                <input onChange={(e)=>onChangeAvatar(e)} type="file" className=" fa fa-pen btn btn-sm btn-icon-only bg-gradient-light position-absolute bottom-0 end-0 mb-n2 me-n2"/>
                  {/* <i className="fa fa-pen top-0" data-bs-toggle="tooltip" data-bs-placement="top" title aria-hidden="true" data-bs-original-title="Edit Image" aria-label="Edit Image" /><span className="sr-only">Edit Image</span>
                </input> */}
              </div>
            </div>
            <div className="col-auto my-auto">
              <div className="h-100">
                <h5 className="mb-1">
                  {user.name}
                </h5>
                <p className="mb-0 font-weight-bold text-sm">
                  {user.email}
                </p>
              </div>
            </div>
            <div className="col-sm-4 col-8 my-sm-auto ms-sm-auto me-sm-0 mx-auto mt-3">
              <div className="nav-wrapper position-relative end-0">
              
              </div>
            </div>
          </div>
        </div>
      </div>)
    }
    const saveUser=()=>{
      setUser({
        ...user,
        name:document.getElementsByName('name')[0].value,
        email:document.getElementsByName('email')[0].value,
        role:document.getElementsByName('role')[0].value,
        
      })
      const data={
        name:document.getElementsByName('name')[0].value,
        email:document.getElementsByName('email')[0].value,
        role:document.getElementsByName('role')[0].value,
      }
      clientRequest.updateUser(data,avatarPr).then(NotificationManager.success('Success', 'Update success'))
      setEdit(true)
    }
    const InfoUser=()=>{
        return (user && <div className="col-12 col-xl-8">
        <div className="card h-100">
          <div className="card-header pb-0 p-3">
            <div className="row">
              <div className="col-md-8 d-flex align-items-center">
                <h6 className="mb-0">Profile Information</h6>
              </div>
              <div className="col-md-4 text-right">
                <a href="javascript:;">
                  {edit?
                  <i onClick={()=>setEdit(false)} className="fas fa-user-edit text-secondary text-sm" data-bs-toggle="tooltip" data-bs-placement="top" title aria-hidden="true" data-bs-original-title="Edit Profile" aria-label="Edit Profile" />
                  :(<div className="btn-group"><button className='btn btn-primary' onClick={()=>saveUser()}>Save</button>
                  <button className='btn' 
                  onClick={()=>setChangePass(!changePass)}
                  >Change Password</button></div>
                  )
                  } 
                </a>
              </div>
            </div>
          </div>
          <div className="card-body p-3">
            
            <hr className="horizontal gray-light my-4" />
            <ul className="list-group">
              <li className="list-group-item border-0 ps-0 pt-0 text-sm"><strong className="text-dark">Full Name:</strong> &nbsp;<input name='name' defaultValue={user.name} disabled={edit}/> </li>
              <li className="list-group-item border-0 ps-0 text-sm"><strong className="text-dark">Email:</strong> &nbsp; <input name='email' defaultValue={user.email} disabled={edit}/></li>
              <li className="list-group-item border-0 ps-0 text-sm"><strong className="text-dark">Role:</strong> &nbsp;<input name='role' defaultValue={user.role} disabled={edit}/>  </li>
              <li className="list-group-item border-0 ps-0 text-sm"><strong className="text-dark">Create At:</strong> &nbsp; {getFormattedDate(user.createAt)}</li>
              <li className="list-group-item border-0 ps-0 pb-0">
                <strong className="text-dark text-sm">Social:</strong> &nbsp;
                <a className="btn btn-facebook btn-simple mb-0 ps-1 pe-2 py-0" href="javascript:;">
                  <i className="fab fa-facebook fa-lg" aria-hidden="true" />
                </a>
                <a className="btn btn-twitter btn-simple mb-0 ps-1 pe-2 py-0" href="javascript:;">
                  <i className="fab fa-twitter fa-lg" aria-hidden="true" />
                </a>
                <a className="btn btn-instagram btn-simple mb-0 ps-1 pe-2 py-0" href="javascript:;">
                  <i className="fab fa-instagram fa-lg" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      )
    }
    const savePassword=()=>{
      const data={
        oldPassword:document.getElementsByName('oldPassword')[0].value,
        password:document.getElementsByName('password')[0].value,
      }
      clientRequest.updatePassword(data.oldPassword,data.password).then(res=>{NotificationManager.success('Success', 'Update password success')
      localStorage.removeItem("token");
      window.location.href='/login'
    })

    }
    const ChangePassUser=()=>{
      return (<div className="col-12 col-xl-4 change-password">
       
      <div className="card h-100">
     
        <div className="card-header pb-0 p-3">
        <div className="btn-group"><button className='btn' onClick={()=>setChangePass(!changePass)}>Back</button>
                  <button className='btn btn-primary' 
                  onClick={()=>savePassword()}
                  >Save</button></div>
          <h6 className="mb-0">Change Password</h6>
       
        </div>
        <div className="card-body p-3">
          <input placeholder="Old Password" name='oldPassword'/>
          <input placeholder="Password" name='password'/>
        </div>
      </div>
    </div>
    )
    }
    return (user &&<>
        <MenuUser/>
        <div className="container-fluid py-4">
            <div className="row">
                {!changePass &&<InfoUser/>}
                {changePass&&<ChangePassUser/>}
            </div>
        </div>
        <NotificationContainer/>

    </>
  )
}
export default UserDetail