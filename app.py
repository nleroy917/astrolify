from astrolify.Astrolify import Astrolify
from google.cloud import language_v1

app = Astrolify('9/17/1996')
print(app.horoscope.content)
print('-='*50)
print(app.horoscope.sentiment, end='')
print('-='*50)
recs = app.generate(verbose=True)
print('-='*50)
for rec in recs:
    print(rec['name'].ljust(5),',',rec['artists'][0]['name'].ljust(5))