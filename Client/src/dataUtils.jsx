
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



  function formatDate(inputDate) {
  
    const date = new Date(inputDate);
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const daySuffix = getDaySuffix(day);
    const formattedDate = `${day}${daySuffix} ${months[monthIndex]} ${year}`;
    return formattedDate;
  }
  
  function getDaySuffix(day) {
    if (day >= 11 && day <= 13) {
      return "th";
    }
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }
  



  

export {calculateDateDifferenceInDays, convertToCompatibleDateFormat, formatDate, getDaySuffix};

