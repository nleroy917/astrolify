import axios from 'axios';
import querystring from 'querystring';

export const getTokens = async (CLIENT_ID, CLIENT_SECRET, authCode, redirectURI) => {
    // set headers
    let headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET)
    }
    //set body
    let body = {
        grant_type: 'authorization_code',
        code: authCode,
        redirect_uri: redirectURI
    }
    // call within a try-catch
    try  {
      var res = await axios.post(`https://accounts.spotify.com/api/token`, querystring.stringify(body), {headers: headers})
      var data = await res.data
      return data

    } catch (error) {
      // todo - better error handling
      alert(`Error! ${error}`)
    }
}
