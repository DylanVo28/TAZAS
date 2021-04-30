import { LOGIN_REQUEST, LOGIN_FAIL, LOGIN_SUCCESS, CLEAR_ERRORS, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAIL } from './../constants/userConstants';
import axios from 'axios'
import {NotificationContainer, NotificationManager} from 'react-notifications';
export const login=(email,password)=>async(dispatch)=>{
    try{
        dispatch({type:LOGIN_REQUEST})
        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }
        const {data}=await axios.post('http://localhost:4000/api/v1/user/login',{email,password},config)
        dispatch({
            type:LOGIN_SUCCESS,
            payload:data.user
        })
        window.location.href = '/admin/dashboard';

    }
    catch(error){
        dispatch({
            type: LOGIN_FAIL,
            payload:error.response.data.message
        })
        NotificationManager.error('Error message', 'Account creation failed');

    }
}
export const clearErrors=()=>async(dispatch)=>{
    dispatch({
        type:CLEAR_ERRORS
    })
}

export const register=(userData)=>async(dispatch)=>{
    try{
        dispatch({type:REGISTER_USER_REQUEST})
        const config={
            headers:{
                'Content-Type':'multipart/form-data'
            }
        }
        const {data}=await axios.post('http://localhost:4000/api/v1/user/create',userData)
        dispatch({
            type:REGISTER_USER_SUCCESS,
            payload:data.user
        })
        NotificationManager.success('Success message', 'Account successfully created');
        window.location.href = '/login';

    }
    catch(error){
        dispatch({
            type:REGISTER_USER_FAIL,
            payload:error.response.data.message
        })
        NotificationManager.error('Error message', 'Account creation failed');

    }
}