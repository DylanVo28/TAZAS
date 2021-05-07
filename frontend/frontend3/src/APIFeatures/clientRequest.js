import axios from "axios";
import { Component } from "react";
const config={
    headers:{
        'Content-Type':'application/json'
    }
}
const userToken=localStorage.getItem("token")
const DOMAIN='http://localhost:4000'
class ClientRequest{
   
    getProducts(){
        return new Promise( (resolve, reject) => {
            axios.get(`${DOMAIN}/api/v1/products`,{
                params:{userToken}
            }).then(result => {
                    resolve(result.data)
                }, reject)
        })
    }

    getLengthAllProducts(){
        return new Promise( (resolve, reject) => {
            axios.get(`${DOMAIN}/api/v1/length-product`,{
                params:{userToken}
            }).then(result => {
                    resolve(result.data)
                }, reject)
        })
    }

    getSearchProducts(searchName,currentPage){
        return new Promise( (resolve, reject) => {
            axios.get(`${DOMAIN}/api/v1/products?keyword=${searchName}&page=${currentPage}`,{
                params:{userToken}
            }).then(result => {
                    resolve(result.data)
                }, reject)
        })
    }

    getOrders(){
        return new Promise((resolve,reject)=>{
            axios.get(`${DOMAIN}/api/v1/admin/orders`,{
                params:{userToken}
            }).then(result => {
                resolve(result.data)
            }, reject)
        })
    }

    getAllUser(){
        return new Promise((resolve,reject)=>{
            axios.get(`${DOMAIN}/api/v1/admin/all-user`,{
                params:{userToken}
            }).then(result => {
                resolve(result.data)
            }, reject)
        })
    }

    getProductDetail(id){
        return new Promise((resolve,reject)=>{
            axios.get(`${DOMAIN}/api/v1/product/${id}`,{
                params:{userToken}
            }).then(result => {
                resolve(result.data)
            }, reject)
        })
    }

    newProduct(data){
        return new Promise((resolve,reject)=>{
            axios.post(`${DOMAIN}/api/v1/admin/product/new`,{
                params:{
                  userToken
              },data},config).then(result => {
                resolve(result.data)
            }, reject)
        })
    }

    updateProduct(id,data){
        return new Promise((resolve,reject)=>{
            axios.put(`${DOMAIN}/api/v1/admin/product/${id}`,{
                params:{
                  userToken
              },data},config).then(result => {
                resolve(result.data)
            }, reject)
        })
    }

    deleteProduct(id){
        return new Promise((resolve,reject)=>{
            axios.delete(`${DOMAIN}/api/v1/admin/product/${id}`,{
                params:{
                  userToken
              }},config).then(result => {
                resolve(result.data)
            }, reject)
        }) 
    }

    getOrder(id){
        return new Promise((resolve,reject)=>{
            axios.get(`${DOMAIN}/api/v1/order/${id}`,{
                params:{
                  userToken
              }},config).then(result => {
                resolve(result.data)
            }, reject)
        }) 
    }
    
    getUser(id){
        return new Promise((resolve,reject)=>{
            axios.get(`${DOMAIN}/api/v1/admin/user/${id}`,{
                params:{
                  userToken
              }},config).then(result => {
                resolve(result.data)
            }, reject)
        }) 
    }

    deleteOrder(id){
        return new Promise((resolve,reject)=>{
            axios.delete(`${DOMAIN}/api/v1/admin/order/${id}`,{
                params:{
                  userToken
              }},config).then(result => {
                resolve(result.data)
            }, reject)
        }) 
    }

    getProfileMe(){
        return new Promise((resolve,reject)=>{
            axios.get(`${DOMAIN}/api/v1/me`,{
                params:{
                  userToken
              }},config).then(result => {
                resolve(result.data)
            }, reject)
        }) 
    }

    postLogin(email,password){
        return new Promise((resolve,reject)=>{
            axios.post(`${DOMAIN}/api/v1/user/login`,{email,password},config).then(result => {
                resolve(result.data)
            }, reject)
        }) 
    }

    createUser(data){
        return new Promise((resolve,reject)=>{
            axios.post(`${DOMAIN}/api/v1/user/create`,data,config).then(result => {
                resolve(result.data)
            }, reject)
        }) 
    }

    updateUser(data,avatarPr){
        return new Promise((resolve,reject)=>{
            axios.put(`${DOMAIN}/api/v1/user/update-profile`,{
                params:{
                  userToken
              },data,avatarPr},config).then(result => {
                resolve(result.data)
            }, reject)
        }) 
    }

    updatePassword(oldPassword,password){
        return new Promise((resolve,reject)=>{
            axios.put(`${DOMAIN}/api/v1/user/update-password`,{
                params:{
                  userToken
              },oldPassword,password},config).then(result => {
                resolve(result.data)
            }, reject)
        }) 
    }

    getAllUsers(){
        return new Promise((resolve,reject)=>{
            axios.put(`${DOMAIN}/api/v1/admin/all-user`,{
                params:{
                  userToken
              }},config).then(result => {
                resolve(result.data)
            }, reject)
        })
    }

    getSearchUsers(searchName,currentPage){
        return new Promise((resolve,reject)=>{
            axios.get(`${DOMAIN}/api/v1/admin/users?keyword=${searchName}&page=${currentPage}`,{
                params:{userToken}
            }).then(result => {
                    resolve(result.data)
                }, reject)
        })
    }
}
const clientRequest = new ClientRequest();
export default clientRequest;

