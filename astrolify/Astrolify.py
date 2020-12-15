from spotify.Spotify import SpotifyClient
from horoscopes.Client import HoroscopeClient
from language_processing.GoogleNaturalLanguage import LanguageClient

from .Exceptions import AstrolifyException


class Astrolify:
    """
    Main class to run the analysis and generate songs
    """

    def __init__(self,
                 birthday,
                 sp_access_token=None,
                 sp_refresh_token=None,
                 horoscope=None
                 ):
        """
        Create a new instance of the Astrolify class
            :param birthday: - the birthday to deterine zodiac sign
            :param sp_access_token: optional. a valid access
                                    token for the spotify oAuth
                                    flow.
            :param sp_refresh_token: optional. Typical use, however.
                                    used to get new access token after
                                    downtime of no use of account access
                                    token.
            :param horoscope: A horoscope can be passed in that is already
                              analyzed. This is future proofing to optimize
                              server code for generation of a lot of songs
                              that will all use the same horoscope.
        """

        # assign birthday attribute and figure out zodiac sign
        self._birthday = birthday
        self.zodiac = self.date_to_zodiac(birthday)

        # instantiate client objects
        self._spclient = SpotifyClient(access_token=sp_access_token,
                                       refresh_token=sp_refresh_token
                                       )
        self._hclient = HoroscopeClient()
        self._gclient = LanguageClient()

        # if horoscope is given, use that
        # else create new and run analysis on it
        # good for case where a horoscope is already analyzed
        # and can be passed in in the instantiation of the
        # astrolify class
        if horoscope:
            self.horoscope = horoscope
        else:
            print(
                'No horoscope detected - obtaining today\'s '
                 'horoscope for {}...'.format(self.zodiac))
            self.horoscope = self._hclient.get_horoscope(self.zodiac, 'today')
            self._analyze_horoscope()

    def _analyze_horoscope(self):
        """
        Analyze the horoscope using the Google Language Processing
        platform
        """

        # check for horoscope existing in object
        if not self.horoscope:
            raise AstrolifyException("No horoscope found")

        print("Analyzing horoscope...")
        # get the sentiment
        sentiment = self._gclient.get_sentiment(self.horoscope.content)

        self.horoscope.sentiment = sentiment

    def date_to_zodiac(self, date):
        """
        Convert a date to a zodiac sign - date must be of the form DD/MM/YYYY
        """
        mmddyyyy = date.split('/')
        zodiacs = [(120, 'capricorn'), (218, 'aquarius'), (320, 'pisces'),
                   (420, 'aries'), (521, 'taurus'), (621, 'gemini'),
                   (722, 'cancer'), (823, 'leo'), (923, 'virgo'),
                   (1023, 'libra'), (1122, 'scorpio'), (1222, 'sagittarius'),
                   (1231, 'capricorn')]
        date_number = int(mmddyyyy[0] + mmddyyyy[1])
        for z in zodiacs:
            if date_number <= z[0]:
                return z[1]

    def generate(self, limit=10):
        """
        Generate songs from the horoscope
            :param limit: - number of songs to generate
        """

    def __del__(self):
        pass
