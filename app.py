from language_processing.GoogleNaturalLanguage import GoogleNaturalLanguage
from horoscopes.Horoscopes import Sentiment, Horoscope
from horoscopes.APIClient import HoroscopeClient

hclient = HoroscopeClient()
horoscope = hclient.get_horoscope(sign='virgo', date='today')

print(horoscope.content)
