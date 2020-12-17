from apscheduler.schedulers.blocking import BlockingScheduler
from astrolify.Astrolify import Astrolify

sched = BlockingScheduler()

@sched.scheduled_job('interval', hour=1)
def timed_job():
    print('This job is run every 10 seconds')

# @sched.scheduled_job('cron', day_of_week='mon-fri', hour=17)
# def update_playlists():
#     # Status
#     print('This will update the user playlists each week... hopefully.')

#     # init astrolify object
#     ast = Astrolify()

#     # get all users in database
#     # users = sql.get_all_users()

sched.start()