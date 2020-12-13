from .Horoscopes import *
import requests
import urllib

class HoroscopeClient:
    """
    Class to interface the horoscope API
    """

    def __init__(self):
        self._baseurl = 'https://aztro.sameerkumar.website'
    
    def _post(self, **kwargs):
        """
        Make a POST requet to the url
        """
        query = urllib.parse.urlencode(kwargs)
        return requests.post(self._baseurl + '/?' + query)
    
    def get_horoscope(self, sign, date, raw=False):
        """
        Get a horoscope
            -> raw indicates whether to return raw data or return as a horoscope class
        """
        res = self._post(sign=sign, date=date)
        data = res.json()
        if raw:
            return data
        else:
            return Horoscope(date=data['current_date'], content=data['description'], type='sun', sign=sign source=self._baseurl)

