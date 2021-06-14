const getFormattedDate=(dateString) =>{
    const date = new Date(dateString);  
    var year = date.getFullYear();
  
    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
  
    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    
    return day+'/'+month + '/'  + year;
  }
  const formattedDateFromParse=(dateString)=>{
    const date = new Date(dateString);  
    var year = date.getFullYear();
  
    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
  
    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    
    return `${month}-${day}-${year}`
  }
  const checkURL=(url)=> {
    return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
}
const compareValidDate=(date)=>{
  const date1 = new Date();
    const date2 = new Date(date);
   
    if(date1.getTime() > date2.getTime()){
       return false
    }
    return true
}
const validatePhoneNumber=(phone)=>{
  var phoneno = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
  if(phone.match(phoneno)) {
    return true;
  }
  return false;
}
const validateCityOrPostalCode=(code)=>{
  return /^([0-9]{5})$/.test(code);
}
  export {getFormattedDate,checkURL,formattedDateFromParse,compareValidDate,validatePhoneNumber,validateCityOrPostalCode}