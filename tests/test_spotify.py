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
