from astrolify.Astrolify import Astrolify

app = Astrolify('9/17/1996')
print('Horoscope:\n' + '-='*40)
print(app.horoscope.content)
print('-='*40)
print(app.horoscope.sentiment)
