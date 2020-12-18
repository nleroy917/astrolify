from apscheduler.schedulers.blocking import BlockingScheduler
from astrolify.Astrolify import Astrolify
from horoscopes.Horoscopes import Horoscope
from horoscopes.Client import HoroscopeClient

sched = BlockingScheduler()

@sched.scheduled_job('interval', hour=1)
def timed_job():
    print('This job is run every 10 seconds')

@sched.scheduled_job('cron', day_of_week='mon-fri', hour=17)
def update_playlists():

    # init the horoscope client
    hclient = HoroscopeClient()

    # get all the horoscopes
    hor_capricorn =  hclient.get_horoscope('capricorn')
    hor_aquarius =  hclient.get_horoscope('aquarius')
    hor_pisces =  hclient.get_horoscope('pisces')
    hor_aries =  hclient.get_horoscope('aries')
    hor_taurus =  hclient.get_horoscope('taurus')
    hor_gemini =  hclient.get_horoscope('gemini')
    hor_cancer =  hclient.get_horoscope('cancer')
    hor_leo =  hclient.get_horoscope('leo')
    hor_virgo =  hclient.get_horoscope('virgo')
    hor_libra =  hclient.get_horoscope('libra')
    hor_scorpio =  hclient.get_horoscope('scorpio')
    hor_sagittarius =  hclient.get_horoscope('sagittarius')

     
    # create astrolify objects for each zodiac
    ast_capricorn = Astrolify(zodiac='capricorn', horoscope=hor_capricorn, worker=True)
    ast_aquarius = Astrolify(zodiac='aquarius', horoscope=hor_aquarius, worker=True)
    ast_pisces = Astrolify(zodiac='pisces', horoscope=hor_pisces, worker=True)
    ast_aries = Astrolify(zodiac='aries', horoscope=hor_aries, worker=True)
    ast_taurus = Astrolify(zodiac='taurus', horoscope=hor_taurus, worker=True)
    ast_gemini = Astrolify(zodiac='gemini', horoscope=hor_gemini, worker=True)
    ast_cancer = Astrolify(zodiac='cancer', horoscope=hor_capricorn, worker=True)
    ast_leo = Astrolify(zodiac='leo', horoscope=hor_leo, worker=True)
    ast_virgo = Astrolify(zodiac='virgo', horoscope=hor_virgo, worker=True)
    ast_libra = Astrolify(zodiac='libra', horoscope=hor_libra, worker=True)
    ast_scorpio = Astrolify(zodiac='scorpio', horoscope=hor_, worker=True)
    ast_sagittarius = Astrolify(zodiac='sagittarius', horoscope=hor_sagittarius, worker=True)

    # Status
    print('This will update the user playlists each week... hopefully.')


sched.start()