"""
entry point for the GCP Cloud Functions
"""

from astrolify.Astrolify import Astrolify
from gcfns.core import PlaylistUpdater

def update_playlist(request):

    data = request.get_json()
    sp_refresh_token = data['sp_refresh_token']
    playlist_id = data['playlist_id']
    zodiac = data['zodiac']
    targets = data['targets']
    entities = data['entities']

    updater = PlaylistUpdater(playlist_id, zodiac, sp_refresh_token=sp_refresh_token)
    return_message = updater.update(targets, entities)

    return return_message