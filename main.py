"""
entry point for the GCP Cloud Functions
"""

from astrolify.Astrolify import Astrolify
from gcfns.core import PlaylistUpdater

def update_playlist(request):
    pu = PlaylistUpdater()
    status = pu.update()
    return status