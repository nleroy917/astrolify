from astrolify.Astrolify import Astrolify
from google.cloud import language_v1

PLAYLIST_ID = '1p1hAVQnIJA7IQGf43VS8e'

app = Astrolify('9/17/1996')
print(app.horoscope.content)

print('-='*30)
print(app.horoscope.sentiment, end='')

print('-='*30)
print('Found entities: ')
for entity in app.horoscope.entities:
    print(entity.name.ljust(8), '-', str(entity.type_).ljust(8), '-', str(round(entity.salience, 2)).ljust(8))

app.update_playlist(PLAYLIST_ID)
