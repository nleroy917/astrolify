from spotify.Spotify import SpotifyClient
from horoscopes.Client import HoroscopeClient
from language_processing.GoogleNaturalLanguage import LanguageClient


class Astrolify:
    """
    Main class to run the analysis and generate songs
    """

    def __init__(self,
                 sp_access_token=None,
                 sp_refresh_token=None,
                 ):
        """
        Create a new instance of the Astrolify class
        """

        self._spclient = SpotifyClient(access_token=sp_access_token,
                                       refresh_token=sp_refresh_token)
        self._hclient = HoroscopeClient()
        self._gclient = LanguageClient()
