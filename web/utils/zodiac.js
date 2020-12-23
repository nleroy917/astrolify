export const birthday_to_zodiac = (month, day) => {
    if (month === 12){ 
        if (day < 22) {return "sagittarius"}
        else          {return "capricorn"}
    } 
    else if (month === 1){ 
        if (day < 20) {return "capricorn" }
        else          {return "aquarius" }
    } 
    else if (month === 2){ 
        if (day < 19) {return "aquarius" } 
        else          {return "pisces"} 
    } 
          
    else if(month === 3){ 
        if (day < 21) {return "pisces"}
        else          {return "aries"}
    } 
    else if (month === 4){ 
        if (day < 20) {return "aries"} 
        else          {return "taurus"}
    } 
          
    else if (month === 5){ 
        if (day < 21) {return "taurus"}
        else          {return "gemini"}
    } 
          
    else if( month === 6){ 
        if (day < 21) {return "Gemini"}
        else          {return "cancer"}
    } 
          
    else if (month === 7){ 
        if (day < 23) {return "cancer"}
        else          {return "leo"}
    } 
          
    else if( month === 8){ 
        if (day < 23) {return "Leo"} 
        else          {return "virgo"}
    } 
          
    else if (month === 9){ 
        if (day < 23) {return "virgo"}
        else          {return "libra"}
    } 
          
    else if (month === 10){ 
        if (day < 23) {return "libra"}
        else          {return "scorpio"}
    } 
          
    else if (month == 11){ 
        if (day < 22) {return "scorpio"}
        else          {return "sagittarius"}
    } 
}