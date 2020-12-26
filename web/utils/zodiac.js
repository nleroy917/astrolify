import axios from 'axios';
const API_BASE = process.env.NEXT_PUBLIC_API_BASE

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

export const fetchHoroscope = async (zodiac) => {
    let res = await axios.post(`https://aztro.sameerkumar.website?sign=${zodiac}&day=today`)
    if(res.status === 200) {
        console.log(res.data)
        return res.data.description
    }
}

export const analyzeHoroscope = async (horoscope) => {
    let data = {
        content: horoscope
    }
    let res = await axios.post(`${API_BASE}/horoscope/analysis`, data)
    if(res.status === 200) {
        let data = await res.data
        let sentiment = data.sentiment
        let magnitude = data.magnitude
        let sentiment_string = ''
        let magnitude_string = ''

        // generate the sentiment string
             if(sentiment>=0.7){sentiment_string='very postitive'}
        else if(sentiment>=0.4){sentiment_string='postitive'}
        else if(sentiment>=0.1){sentiment_string='slightly postitive'}
        else if(sentiment>=-0.1){sentiment_string='nuetral'}
        else if(sentiment>=-0.4){sentiment_string='slightly negative'}
        else if(sentiment>=-0.7){sentiment_string='negative'}
        else {sentiment_string='very negative'}

        // generate the magnitude string
             if(magnitude>=3){magnitude_string='very strongly'}
        else if(magnitude>=2){magnitude_string='strongly'}
        else if(magnitude>=1){magnitude_string='weakly'}
        else {magnitude_string='very weakly'}
        
        let analysis = `Today's horoscope has an overall ${sentiment_string} tone and expresses this tone ${magnitude_string}`

        return {
            analysis: analysis,
            sentiment: sentiment,
            magnitude: magnitude
        }
    }
}