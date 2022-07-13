
import React,{useEffect,useState} from 'react';
import {ethers, utils, Wallet} from 'ethers'
import {contractABI,contractAddress,byteCode} from '../utils/constants'
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
    const [contract,setContract]=useState(null)
    useEffect(()=>{
        getInfuraContract()
    },[])
    
    const handleChange=(e,name)=>{
        setFormData((prevState)=>({...prevState,[name]:e.target.value}))
    }
    const getInfuraContract=()=>{
        const wsProvider=new ethers.providers.WebSocketProvider("wss://mainnet.infura.io/ws/v3/54a57591f73c4c4696041b6d8d1460ea","rinkeby")
       
        const wallet = new ethers.Wallet('0c07df1d7dff826637d793112894610bd1081c6a989aa224466001d7fdbe311c', wsProvider)
      
        const signer = wallet.provider.getSigner(wallet.address)
        const contract=new ethers.Contract(contractAddress,contractABI, signer)
            contract.on("sendData", (...args) => {
                console.log(args);
              });

    
    }
    
    const checkIfWalletIsConnected=async ()=>{
        try {
            if(!ethereum) return alert("Please install metamask")
            const accounts=await ethereum.request({method: 'eth_accounts'})
            if (accounts.length){
                setCurrentAccount(accounts[0])
                return true
            }
        } catch (error) {
            throw new Error("No ethereum object.")
        }
        return false;
        
    }
    const connectWallet=async()=>{
        try{
            if(checkIfWalletIsConnected()){
                if(!ethereum) return alert("Please install metamask")
                const accounts=await ethereum.request({method: 'eth_requestAccounts'})
                setCurrentAccount(accounts[0])
            }
           
        }catch(error){
            throw new Error("No ethereum object.")
        }

        return true;
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
    const connectSmartContract=async ()=>{
        try{
            getEthereumContract().CreateOrder("123456")

        }
        catch(e){
            console.log(e)
        }

        // console.log(getEthereumContract())
    }

  
   
return (
    <TransactionContext.Provider value={{connectWallet,currentAccount,formData,setFormData,handleChange,sendTransaction,connectSmartContract}}>
        {children}
    </TransactionContext.Provider>
)
}