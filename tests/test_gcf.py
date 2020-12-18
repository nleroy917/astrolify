from gcfns.core import PlaylistUpdater
from horoscopes.Client import HoroscopeClient
from language_processing.GoogleNaturalLanguage import LanguageClient
import unittest
import os
import json
import requests


class GCFTest(unittest.TestCase):
    """
    Method to test the GCF functionality for upating a
    playlist. It essentially simulates once call to the
    gcf using pre-set environment variables that will
    be obtained from the db in the future.
    """
    from dotenv import load_dotenv
    load_dotenv()

    TEST_PLAYLIST_ID = os.getenv("TEST_PLAYLIST_ID")
    TEST_ZODIAC = os.getenv("TEST_ZODIAC")
    UPDATE_PLAYLIST_GCF_ENDPOINT = os.getenv("UPDATE_PLAYLIST_GCF_ENDPOINT")
    GOOGLE_IDENTITY_TOKEN = os.getenv("GOOGLE_IDENTITY_TOKEN")
    SPOTIPY_CACHE = ".cache-NLeRoy917"

    @classmethod
    def setUpClass(self):
        """
        Set up class for testing - create instance of my custom Spotify client
        """

        self._hclient = HoroscopeClient()
        self._gclient = LanguageClient()

        # get tokens - will come from db on server
        with open(self.SPOTIPY_CACHE, 'r') as f:
            self.SPOTIFY_TOKENS = json.load(f)

        # get horoscope and analyze - this should be done
        # by the clock worker and then used multiple times
        # to call the GCF
        self.horoscope = self._hclient.get_horoscope(self.TEST_ZODIAC, 'today')
        self.horoscope.sentiment = self._gclient.get_sentiment(
            self.horoscope.content)
        self.horoscope.entities = self._gclient.get_entities(
            self.horoscope.content)

        # initialize with playlist_id from db
        # and zodiac sign will be in database
        self._pu = PlaylistUpdater(
            self.TEST_PLAYLIST_ID,
            self.TEST_ZODIAC,
            self.horoscope,
            sp_access_token=self.SPOTIFY_TOKENS['access_token'],
            sp_refresh_token=self.SPOTIFY_TOKENS['refresh_token']
        )

    # def test_local_update(self):
    #     target_valence = self._pu._score_to_valence(
    #         self.horoscope.sentiment.score)
    #     target_energy = self._pu._magnitude_to_energy(
    #         self.horoscope.sentiment.magnitude)
    #     targets = {
    #         'valence': target_valence,
    #         'energy': target_energy
    #     }
    #     entities = [{"name": entity.name}
    #                 for entity in self.horoscope.entities]
    #     data = self._pu.update(targets, entities)
    #     self.assertTrue('snapshot_id' in data)

    def test_gcf_http(self):
        target_valence = self._pu._score_to_valence(
            self.horoscope.sentiment.score)
        target_energy = self._pu._magnitude_to_energy(
            self.horoscope.sentiment.magnitude)
        targets = {
            'valence': target_valence,
            'energy': target_energy
        }
        entities = [{"name": entity.name}
                    for entity in self.horoscope.entities]
        return_data = requests.post(self.UPDATE_PLAYLIST_GCF_ENDPOINT, json={
                "sp_refresh_token": self.SPOTIFY_TOKENS['refresh_token'],
                "playlist_id": self.TEST_PLAYLIST_ID,
                "zodiac": self.TEST_ZODIAC,
                "targets": targets,
                "entities": entities
            },
            headers = {
                'Authorization': 'bearer ' + self.GOOGLE_IDENTITY_TOKEN
            })
        print(return_data.content)
        self.assertTrue("snapshot_id" in return_data)
