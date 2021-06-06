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
    
    return `${year}-${month}-${day}`
  }
  const checkURL=(url)=> {
    return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
}
const compareValidDate=(date)=>{
  const date1 = new Date();
    const date2 = new Date(date);
    console.log( date1.getTime() )
    console.log(date2.getTime())
    if(date1.getTime() > date2.getTime()){
       return false
    }
    return true
}
  export {getFormattedDate,checkURL,formattedDateFromParse,compareValidDate}