import spotipy
from spotipy.oauth2 import SpotifyOAuth
import os

class SpotifyClient:
    """
    Class to interface the Spotfiy API. Authentication can be done server-side headless and in development envs.
    
    Main intent of the class is to be used with a refresh token stored in a database.

    Fresh access tokens can be passed to the class as well - probably on instances of first authentication client-side
    """
        # loads the environment from a .env file
    from dotenv import load_dotenv
    load_dotenv()

    def __init__(self, access_token=None, refresh_token=None):

        self._scope = 'ugc-image-upload user-top-read playlist-modify-public playlist-read-public'

        # case where an access_token is passed directly in (first authentication, specific use cases maybe)
        if access_token:
            self._spotify = spotipy.Spotify(auth=access_token)
            self._access_token = access_token
            self._refresh_token = None

        # typical use - refresh_token taken from a database and used to create a new access_token
        elif refresh_token:
            auth=SpotifyOAuth(
                client_id=os.environ.get("SPOTIFY_CLIENT_ID"),
                client_secret=os.environ.get("SPOTIFY_CLIENT_SECRET"),
                scope=self._scope
            )
            tokens = auth.refresh_access_token(refresh_token)
            self._spotify = spotipy.Spotify(auth=tokens['access_token'])
            self._access_token = tokens['access_token']
            self._refresh_token = tokens['refresh_token']

        # local and development environments
        # wont work headless server-side as it requires a user to log in
        else:
            self._spotify = spotipy.Spotify(auth_manager=SpotifyOAuth(
                client_id=os.environ.get("SPOTIFY_CLIENT_ID"),
                client_secret=os.environ.get("SPOTIFY_CLIENT_SECRET"),
                scope=self._scope,
                redirect_uri='http://localhost:8080'
            ))
            self._access_token = None
            self._refresh_token = None
    
    def current_user_top_tracks(self):
        """
        Get the current authenticated user's top tracks
        """
        return self._spotify.current_user_top_tracks()['items']

    def current_user_top_artists(self):
        """
        Get the current authenticated user's top artists
        """
        return self._spotify.current_user_top_artists()['items']
    
    def get_recommendations(self, seeds, **parameters):
        """
        Get song recommendations based on seeds
        """
        return self._spotify.recommendations()