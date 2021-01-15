from astrolify.Astrolify import Astrolify
from horoscopes.Horoscopes import Horoscope
from horoscopes.Client import HoroscopeClient
from language_processing.GoogleNaturalLanguage import LanguageClient
from dotenv import load_dotenv
from postgres.models import *
import os

# Env variables
load_dotenv()
POSTGRES_URI=os.getenv('DATABASE_URL')
from postgres.driver import Driver

dbdriver = Driver(POSTGRES_URI)

def update_playlists():

    # init the horoscope client
    hclient = HoroscopeClient()

    # init google client
    gclient = LanguageClient()

    # get all the horoscopes
    hor_capricorn =  hclient.get_horoscope('capricorn', 'today')
    hor_aquarius =  hclient.get_horoscope('aquarius', 'today')
    hor_pisces =  hclient.get_horoscope('pisces', 'today')
    hor_aries =  hclient.get_horoscope('aries', 'today')
    hor_taurus =  hclient.get_horoscope('taurus', 'today')
    hor_gemini =  hclient.get_horoscope('gemini', 'today')
    hor_cancer =  hclient.get_horoscope('cancer', 'today')
    hor_leo =  hclient.get_horoscope('leo', 'today')
    hor_virgo =  hclient.get_horoscope('virgo', 'today')
    hor_libra =  hclient.get_horoscope('libra', 'today')
    hor_scorpio =  hclient.get_horoscope('scorpio', 'today')
    hor_sagittarius =  hclient.get_horoscope('sagittarius', 'today')

    # get sentiment for each horoscope
    hor_capricorn.sentiment = gclient.get_sentiment(hor_capricorn.content)
    hor_aquarius.sentiment = gclient.get_sentiment(hor_aquarius.content)
    hor_pisces.sentiment =  gclient.get_sentiment(hor_pisces.content)
    hor_aries.sentiment = gclient.get_sentiment(hor_aries.content)
    hor_taurus.sentiment = gclient.get_sentiment(hor_taurus.content)
    hor_gemini.sentiment = gclient.get_sentiment(hor_gemini.content)
    hor_cancer.sentiment = gclient.get_sentiment(hor_cancer.content)
    hor_leo.sentiment = gclient.get_sentiment(hor_leo.content)
    hor_virgo.sentiment = gclient.get_sentiment(hor_virgo.content)
    hor_libra.sentiment = gclient.get_sentiment(hor_libra.content)
    hor_scorpio.sentiment = gclient.get_sentiment(hor_scorpio.content)
    hor_sagittarius.sentiment = gclient.get_sentiment(hor_scorpio.content)

    # get entities for each horoscope
    hor_capricorn.entities = gclient.get_entities(hor_capricorn.content)
    hor_aquarius.entities = gclient.get_entities(hor_aquarius.content)
    hor_pisces.entities =  gclient.get_entities(hor_pisces.content)
    hor_aries.entities = gclient.get_entities(hor_aries.content)
    hor_taurus.entities = gclient.get_entities(hor_taurus.content)
    hor_gemini.entities = gclient.get_entities(hor_gemini.content)
    hor_cancer.entities = gclient.get_entities(hor_cancer.content)
    hor_leo.entities = gclient.get_entities(hor_leo.content)
    hor_virgo.entities = gclient.get_entities(hor_virgo.content)
    hor_libra.entities = gclient.get_entities(hor_libra.content)
    hor_scorpio.entities = gclient.get_entities(hor_scorpio.content)
    hor_sagittarius.entities = gclient.get_entities(hor_scorpio.content)

    # store in a lookup dictionary
    horoscope_lookup = {
        'capricorn': hor_capricorn,
        'aquarius': hor_aquarius,
        'pisces': hor_pisces,
        'aries': hor_aries,
        'taurus': hor_taurus,
        'gemini': hor_gemini,
        'cancer': hor_cancer,
        'leo': hor_leo,
        'virgo': hor_virgo,
        'libra': hor_libra,
        'scorpio': hor_scorpio,
        'sagittarius': hor_sagittarius
    }

    users = dbdriver.query_all(User)
    for user in users:
        print('Updating playlist for: {}({})'.format(user['name'],user['spotify_id']))
        horoscope = horoscope_lookup[user['zodiac']]
        ast = Astrolify(
            zodiac=user['zodiac'].lower(), # force into lowercase
            sp_refresh_token=user['spotify_refresh_token'],
            horoscope=horoscope,
            worker=True
          )
        ast.update_playlist(user['playlist_id'])

if __name__ == '__main__':
    update_playlists()