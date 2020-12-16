from astrolify.Astrolify import Astrolify
from google.cloud import language_v1

app = Astrolify('9/17/1996')
print(app.horoscope.content)

print('-='*30)
print(app.horoscope.sentiment, end='')

print('-='*30)
print('Found entities: ')
for entity in app.horoscope.entities:
    print(entity.name.ljust(8), '-', str(entity.type_).ljust(8), '-', str(round(entity.salience, 2)).ljust(8))

print('-='*30)
recs = app.generate(verbose=True)
print('-='*30)
for rec in recs:
    print(rec['name'].ljust(5),',',rec['artists'][0]['name'].ljust(5))