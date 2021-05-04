import { LOGIN_REQUEST, LOGIN_FAIL, LOGIN_SUCCESS, CLEAR_ERRORS, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAIL } from './../constants/userConstants';
import axios from 'axios'
import {NotificationContainer, NotificationManager} from 'react-notifications';
import { Redirect } from 'react-router-dom';
function saveTheCookie(value) {
    var today = new Date(); // Actual date
    var expire = new Date(); // Expiration of the cookie

    var cookie_name = "userid_form"; // Name for the cookie to be recognized
    var number_of_days = 10; // Number of days for the cookie to be valid (10 in this case)

    expire.setTime( today.getTime() + 60 * 60 * 1000 * 24 * number_of_days ); // Current time + (60 sec * 60 min * 1000 milisecs * 24 hours * number_of_days)

    document.cookie = cookie_name + "=" + escape(value) + "; expires=" + expire.toGMTString();
}
export const login=(email,password)=>async(dispatch)=>{
    try{
        dispatch({type:LOGIN_REQUEST})
        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }
        const {data}=await axios.post('http://localhost:4000/api/v1/user/login',{email,password},config)
        // saveTheCookie('user',data.user._id)
        // sessionStorage.setItem('token', data.token);
        // sessionStorage.setItem('user', data.user._id);
        localStorage.setItem('token',data.token)
        dispatch({
            type:LOGIN_SUCCESS,
            payload:data.user
        })
        NotificationManager.success('Success', 'Login success');
        
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

    }
    catch(error){
        dispatch({
            type:REGISTER_USER_FAIL,
            payload:error.response.data.message
        })
        NotificationManager.error('Error message', 'Account creation failed');

    }
}

export const loadUser=()=>async(dispatch)=>{
    try{ 
        dispatch({
            type: LOAD_USER_REQUEST
        })
        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }
        const userToken=localStorage.getItem("token")
        const {data}=await axios.get('http://localhost:4000/api/v1/me',{
            params:{
                userToken
            }
        },config)
        dispatch({
            type:LOAD_USER_SUCCESS,
            payload:data.user
        })
    }
    catch(error){
        dispatch({
            type:LOAD_USER_FAIL,
            payload:error.response.data.message
        })
    }
}