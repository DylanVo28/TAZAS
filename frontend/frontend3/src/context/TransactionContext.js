
import React,{useEffect,useState} from 'react';
import {ethers} from 'ethers'
import {contractABI,contractAddress} from '../utils/constants'
export const TransactionContext=React.createContext()
const {ethereum}=window;
const getEthereumContract=()=>{
    const provider=new ethers.providers.Web3Provider(ethereum)
    const signer =provider.getSigner();
    const transactionContract=new ethers.Contract(contractAddress,contractABI, signer)
    return transactionContract
}

export const TransactionProvider=({ children })=>{
    const [currentAccount,setCurrentAccount]=useState(null)
    const [formData,setFormData]=useState({address:'',amount:'',keyword:'',message:''})
    const handleChange=(e,name)=>{
        setFormData((prevState)=>({...prevState,[name]:e.target.value}))
    }
    const checkIfWalletIsConnected=async ()=>{
        try {
            if(!ethereum) return alert("Please install metamask")
        const accounts=await ethereum.request({method: 'eth_accounts'})
        if (accounts.length){
            setCurrentAccount(accounts[0])
        }else{
            console.log('No accounts found')
        }
        } catch (error) {
            throw new Error("No ethereum object.")
            
        }
        
    }
    const connectWallet=async()=>{
        try{
            if(!ethereum) return alert("Please install metamask")
            const accounts=await ethereum.request({method: 'eth_requestAccounts'})
            setCurrentAccount(accounts[0])
        }catch(error){
            throw new Error("No ethereum object.")
        }
    }
    const sendTransaction=async()=>{
        try{
            if(!ethereum) return alert("Please install metamask")
            const {address,amount,keyword,message}=formData
           const transactionContract= getEthereumContract()
           const parsedAmount=ethers.utils.parseEther(amount)
           await ethereum.request({
            method: 'eth_sendTransaction',
            params:[{
                from: currentAccount,
                to: '0xad44FdeC24d7E2f6F45261c2Fd66Fd69e56C0ACB',
                gas: '0x5208',
                value: parsedAmount._hex,
            }]
           })
        }catch(error){
            console.error(error)
        }
    }
    useEffect(()=>{
        checkIfWalletIsConnected();
    },[])
return (
    <TransactionContext.Provider value={{connectWallet,currentAccount,formData,setFormData,handleChange,sendTransaction}}>
        {children}
    </TransactionContext.Provider>
)
}