const getFormattedDate=(dateString) =>{
    const date = new Date(dateString);  
    var year = date.getFullYear();
  
    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
  
    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    
    return day+'/'+month + '/'  + year;
  }
  const checkURL=(url)=> {
    return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
}
  export {getFormattedDate,checkURL}