
function calculateDateDifferenceInDays(startDate, endDate) {
    const oneDay = 24 * 60 * 60 * 1000; 
  
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
  
    const timeDifference = startDateObj - endDateObj;
    const daysDifference = Math.floor(timeDifference / oneDay);
  
    return daysDifference;
  }
  


  function convertToCompatibleDateFormat(dateString) {
    const parts = dateString.split('/');
    const year = parts[2];
    const month = parts[1];
    const day = parts[0];
    return `${year}-${month}-${day}`;
  }





  

export {calculateDateDifferenceInDays, convertToCompatibleDateFormat};

