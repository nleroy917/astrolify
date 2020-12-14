from language_processing.GoogleNaturalLanguage import LanguageClient
from horoscopes.Horoscopes import Sentiment, Horoscope
from horoscopes.APIClient import HoroscopeClient

hclient = HoroscopeClient()
gclient = LanguageClient()
horoscope = hclient.get_horoscope(sign='aries', date='today')
sentiment = gclient.get_sentiment(horoscope.content)
entities = gclient.get_entities(horoscope.content)

print(horoscope.content)
print(sentiment)

for entity in entities:
    print(entities)

