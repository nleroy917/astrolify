import spotipy
from spotipy.oauth2 import SpotifyOAuth
import os
import base64


class SpotifyClient:
    """
    Class to interface the Spotfiy API. Authentication can be done
    server-side headless and in development envs.

    Main intent of the class is to be used with a refresh token
    stored in a database.

    Fresh access tokens can be passed to the class as well -
    probably on instances of first authentication client-side
    """
    # loads the environment from a .env file
    from dotenv import load_dotenv
    load_dotenv()

    def __init__(self, access_token=None, refresh_token=None):
        self._scope = '''ugc-image-upload
                         user-top-read
                         playlist-modify-public
                         playlist-read-collaborative
                      '''

        # case where an access_token is passed directly in (first
        # authentication, specific use cases maybe)
        if access_token:
            print("Authenticating Spotify with access token")
            self._spotify = spotipy.Spotify(auth=access_token)
            self._access_token = access_token
            self._refresh_token = None

        # typical use - refresh_token taken from a database and used to create
        # a new access_token
        elif refresh_token:
            print("Authenticating Spotify with refresh token")
            auth = SpotifyOAuth(
                client_id=os.environ.get("SPOTIFY_CLIENT_ID"),
                client_secret=os.environ.get("SPOTIFY_CLIENT_SECRET"),
            )
            tokens = auth.refresh_access_token(refresh_token)
            self._spotify = spotipy.Spotify(auth=tokens['access_token'])
            self._access_token = tokens['access_token']
            self._refresh_token = tokens['refresh_token']

        # local and development environments
        # wont work headless server-side as it requires a user to log in
        else:
            print("Authenticating with local auth-flow")
            self._spotify = spotipy.Spotify(auth_manager=SpotifyOAuth(
                client_id=os.environ.get("SPOTIFY_CLIENT_ID"),
                client_secret=os.environ.get("SPOTIFY_CLIENT_SECRET"),
                scope=self._scope,
                redirect_uri='http://localhost:8080'
            ))
            self._access_token = None
            self._refresh_token = None

    def current_user(self):
        """
        Simply get the currently authenticated user
        """
        return self._spotify.current_user()
        
    def search(self,
               query,
               limit=10,
               type='track'
               ):
        """
        Search spotify for items (Tracks, artists, etc)
            :param query: - the search query
            :param limit: - the number of items to return
            :param type: - the type of items to return

        Returns the items from the search (['items']
        parameter)
        """
        return self._spotify.search(query,
                                    limit=limit,
                                    type=type,
                                    )[type + 's']['items']

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

    def get_playlist(self, id):
        """
        Get a playlist object based on it's id
            :param id: the playlist id

        Returns the playlist object
        """
        return self._spotify.playlist(id)

    def create_playlist(self, name, img=None):
        """
        Create a playlist for the currently authenticated user
            :param name: - Name of the playlist
            :param img: - path to image of the playlist

        Returns the created playlist object
        """
        # create description
        desc = "Your daily mixtape of fresh music based \
                on your horoscope for today"

        # get the current user
        user = self._spotify.current_user()

        # create playlist
        playlist = self._spotify.user_playlist_create(
            user=user['id'], name=name, description=desc)

        # if image url specified, add cover arts
        if img:
            # encode the image in base 64
            with open(img, 'rb') as image_file:
                encoded_string = base64.b64encode(image_file.read())
            self._spotify.playlist_upload_cover_image(
                playlist['id'], encoded_string)

        return playlist

    def get_recommendations(self,
                            seed_artists=None,
                            seed_tracks=None,
                            seed_genres=None,
                            limit=10,
                            parameters=None
                            ):
        """
        Get song recommendations based on seeds
            :param seed_artists: - list of artists to seed the
                                   recommendation algorithm with
            :param seed_tracks: - list of tracks to seed the
                                  recommendation algorithm with
            :param seed_genres: - list of genres to seed the
                                  recommendation algorithm with
            :param limit: - number of results to return
            :param parameters: - any specific audio-feature goals
                                using min_<attribute>, max_<attribute>,
                                or target_<attribute> = <value>

        """
        return self._spotify.recommendations(seed_artists=seed_artists,
                                             seed_tracks=seed_tracks,
                                             seed_genres=seed_genres,
                                             limit=limit,
                                             **parameters
                                             )

    def clear_playlist(self, id):
        """
        Clear out a playlist so that it doesn't have any tracks and is fresh.
            :param id: The id of the playlist to clear out
        """
        return self._spotify.playlist_remove_all_occurrences_of_items(
            id, items=[item['track']['uri'] for item
                       in self._spotify.playlist_items(id)['items']])

    def add_tracks_to_playlist(self, id, tracks):
        """
        Add tracks to a certain playlist given it's id
            :param id: the id of the playlist ot add the tracks to
            :param tracks: the tracks to add to the playlist
        """
        return self._spotify.playlist_add_items(id, tracks)

    def get_tracks(self, uris):
        """
        Simple method to get track objects from a list or uris
            :param uris: - uris of tracks
        """
        return self._spotify.tracks(uris)['tracks']

    def audio_features(self, uris):
        """
        Get the audio features for several tracks
        """
        return self._spotify.audio_features(tracks=uris)
