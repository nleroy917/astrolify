from spotify.Spotify import SpotifyClient
import unittest
import sys
sys.path.append('../')


class SpotifyTest(unittest.TestCase):
    """
    Test harness for the Spotify module written for this application. Intended
    for local development purposes only. This code is not to be run serverside
    in production.
    """

    cover_art_path = 'assets/coverart-test.png'
    test_uris = [
        'spotify:track:7tFiyTwD0nx5a1eklYtX2J', # queen - bohemian rhapsody
        'spotify:track:5ChkMS8OtdzJeqyybCc9R5', # mj - billie jean
        'spotify:track:0VjIjW4GlUZAMYd2vXMi3b' # the weeknd - blinding lights
    ]

    test_seed_tracks = [
        'spotify:track:0VjIjW4GlUZAMYd2vXMi3b' # the weeknd - blinding lights
        ]
    test_seed_artists = [
        'spotify:artist:1dfeR4HaWDbWqFHLkxsg1d' # queen
        ]
    test_seed_genres = ['pop']  # simple genre

    test_parameters = {
        'target_valence': 0.8,
        'max_danceability': 0.9,
        'min_liveness': 0.1,
    }


    @classmethod
    def setUpClass(self):
        """
        Set up class for testing - create instance of my custom Spotify client
        """
        self._spclient = SpotifyClient()

    def test_current_user_top_tracks(self):
        result = self._spclient.current_user_top_tracks()
        self.assertTrue(len(result) > 0)

    def test_current_user_top_artists(self):
        result = self._spclient.current_user_top_artists()
        self.assertTrue(len(result) > 0)

    def test_create_playlist(self):
        # create the playlist
        new_playlist = self._spclient.create_playlist('Astrolify Sun - Virgo',
                                                      img=self.cover_art_path
                                                      )
        self.assertTrue('id' in new_playlist)

        # add songs to the playlist
        result = self._spclient.add_tracks_to_playlist(
            new_playlist['id'], self.test_uris)
        self.assertTrue('snapshot_id' in result)

        # clear the playlist of its contents
        # check the removal worked,
        # check the playlist no longer has items
        result = self._spclient.clear_playlist(new_playlist['id'])
        self.assertTrue('snapshot_id' in result)
        self.assertTrue((len(self._spclient.get_playlist(
            new_playlist['id'])['tracks']['items']) == 0))
    
    def test_recommendations(self):
        # get recs based on test data
        result = self._spclient.get_recommendations(
            parameters=self.test_parameters,
            seed_artists=self.test_seed_artists,
            seed_tracks=self.test_seed_tracks,
            seed_genres=self.test_seed_genres,
        )
        self.assertTrue(len(result['tracks']) > 0)

