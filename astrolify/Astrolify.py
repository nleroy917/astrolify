from spotify.Spotify import SpotifyClient
from horoscopes.Client import HoroscopeClient
from language_processing.GoogleNaturalLanguage import LanguageClient

from .Exceptions import AstrolifyException
import warnings

import random
import time


class Astrolify:
    """
    Main class to run the analysis and generate songs
    """

    def __init__(self,
                 birthday=None,
                 zodiac=None,
                 sp_access_token=None,
                 sp_refresh_token=None,
                 horoscope=None,
                 worker=False
                 ):
        """
        Create a new instance of the Astrolify class
            :param birthday: - the birthday to determine zodiac sign
            :param zodiac: - if passed in doesnt try to determine from birthday
            :param sp_access_token: optional. a valid access
                                    token for the spotify oAuth
                                    flow.
            :param sp_refresh_token: optional. Typical use, however.
                                    used to get new access token after
                                    downtime of no use of account access
                                    token.
            :param horoscope: A horoscope can be passed in that is already
                              analyzed. This is future proofing to optimize
                              server code for generation of a lot of songs
                              that will all use the same horoscope.
            :param worker: a boolean value to tell the class if it's being
                           used as a worker to crunch playlists. The main
                           difference being that it skips spotify
                           authentication on intialization and saves it for
                           on-the-fly spin ups of the SpotifyClient class
        """
        # add access tokens and refresh tokens
        self.sp_access_token = sp_access_token
        self.sp_refresh_token = sp_refresh_token

        # check either birthday or zodiac was passed in
        if not birthday and not zodiac:
            raise AstrolifyException("Must initialize object with a birthday "
                                     "or a zodiac sign.")

        if birthday:
            # assign birthday attribute and figure out zodiac sign
            self.birthday = birthday
            self.zodiac = self.date_to_zodiac(birthday)
        else:
            # otherwise directly assign zodiac
            self.zodiac = zodiac

        if not sp_access_token and not sp_refresh_token and worker:
            raise AstrolifyException("Must provide either an access token or refresh token "
                                    "when running astroliy as a worker."
                                    )
        # instantiate client objects
        self._spclient = SpotifyClient(access_token=sp_access_token,
                                       refresh_token=sp_refresh_token
                                       )
        self._hclient = HoroscopeClient()
        self._gclient = LanguageClient()

        # if horoscope is given, use that
        # else create new and run analysis on it
        # good for case where a horoscope is already analyzed
        # and can be passed in in the instantiation of the
        # astrolify class
        if horoscope:
            self.horoscope = horoscope
            # check if it's analyzed - analyze if not
            if not self.horoscope.sentiment or not self.horoscope.entities:
                self._analyze_horoscope()
        elif not horoscope and not worker:
            print(
                'No horoscope detected - obtaining today\'s '
                'horoscope for {}...'.format(self.zodiac))
            self.horoscope = self._hclient.get_horoscope(self.zodiac, 'today')
            self._analyze_horoscope()
        else:
            print('Running as worker - skipping horoscope analysis')

    def _analyze_horoscope(self):
        """
        Analyze the horoscope using the Google Language Processing
        platform
        """

        # check for horoscope existing in object
        if not self.horoscope:
            raise AstrolifyException("No horoscope found")

        print("Analyzing horoscope...")
        # get the sentiment
        sentiment = self._gclient.get_sentiment(self.horoscope.content)
        entities = self._gclient.get_entities(self.horoscope.content)

        self.horoscope.sentiment = sentiment
        self.horoscope.entities = entities

    def _get_key_words(self, limit=3, entities=None):
        """
        Get key words from the entitites of the horoscope
            :param limit: - amount to return
            :param entities: - (Optional) Can pass in custom
                               horoscope entitie values. Must be a
                               list of dicts that have a "name"
                               key.
        """
        # check for entities already passed in. This
        # is most likely going to be used for hte GCF
        # spin ups when a dictionary of entities will
        # be passed as json() data in the request body.
        if entities:
            key_words = [entity["name"] for entity in entities]

        # other-wise we need to check if the horoscope
        # has already been analyzed and has entities
        elif not self.horoscope.entities:
            raise AstrolifyException("No entities found - have you analyzed"
                                     "the horoscope yet?")
        # generate key words
        else:
            key_words = [
                entity.name for entity in self.horoscope.entities[:limit]]
        return key_words

    def _search_spotify_for_key_words(self, key_words, limit=10):
        """
        Search spotify based on the key_words that were found from the
        horoscope entities.
            :param key_words: - list of words to search for in spotify

        returns a random track that contains a key-word
        """
        tracks = []
        for word in key_words:
            tracks += self._spclient.search(word, limit=limit)

        uris = [track['uri'] for track in tracks]
        return uris

    def _get_top_seeds(self):
        """
        Get seeds for the recomednation algorithm based on a user's top
        tracks. This function works by creating a list of uris for a users
        top tracks and top artists currently, then creates a random sample
        from them.
        """
        tracks = self._spclient.current_user_top_tracks()
        track_uris = [track['uri'] for track in tracks]

        artists = self._spclient.current_user_top_artists()
        artist_uris = [artist['uri'] for artist in artists]

        return {
            'artist_uris': random.sample(artist_uris, 2),
            'track_uris': random.sample(track_uris, 2)
        }

    def date_to_zodiac(self, date):
        """
        Convert a date to a zodiac sign - date must be of the form DD/MM/YYYY
        """
        mmddyyyy = date.split('/')
        zodiacs = [(120, 'capricorn'), (218, 'aquarius'), (320, 'pisces'),
                   (420, 'aries'), (521, 'taurus'), (621, 'gemini'),
                   (722, 'cancer'), (823, 'leo'), (923, 'virgo'),
                   (1023, 'libra'), (1122, 'scorpio'), (1222, 'sagittarius'),
                   (1231, 'capricorn')]
        date_number = int(mmddyyyy[0] + mmddyyyy[1])
        for z in zodiacs:
            if date_number <= z[0]:
                return z[1]

    def _filter_tracks_by_audio_features(self, uris, feature_targets, n=2):
        """
        Take a list of uris, retrieve their audio analysis from Spotify,
        and then return the tracks that have the features closest to those
        values. Utilizes a SSE approach and returns tracks with smallest
        squared-error
            :param uris: - Required. A list of uris
            :param feature_targets: - Required. A dictionary of target values
                                     for an audio feature {'feature': val, ...}
            :param n: - number of uris to return
        """
        # ensure that
        if len(uris) < n:
            raise AstrolifyException("Cannot return more uris than passed in!"
                                     " (n must be >= len(uris))")
        if len(uris) == n:
            warnings.warn("Length of uris == n, no filtering is being done."
                          "len(uris) < n")
            return uris

        sse_store = {}
        for uri in uris:
            sse_store[uri] = 0

        analysis_full = self._spclient.audio_features(uris)
        # loop through ecah analysis object
        # there will be one for each uri passed in
        for analysis in analysis_full:
            # loop through audio features to correct for
            # calculate SSE
            for feature in feature_targets:
                sse_store[analysis['uri']] += (analysis[feature] -
                                               feature_targets[feature])**2

        sorted_uris = dict(sorted(sse_store.items(), key=lambda item: item[1]))
        sorted_uris_list = [uri for uri in sorted_uris]
        return sorted_uris_list[:n]

    def _score_to_valence(self, score):
        """
        Quick method to convert a sentiment score to a target valence
        """
        return (score + 1) / 2

    def _magnitude_to_energy(self, magnitude):
        """
        Quick method to convert magnitude to energy
        """
        # floor to max value
        # this is totally arbitrary and can be changed
        if magnitude > 5:
            magnitude = 5
        return magnitude / 5

    def generate(self, entities=None, targets=None, limit=10, verbose=True,
                 sp_access_token=None, sp_refresh_token=None):
        """
        Generate songs from the horoscope
            :param limit: - number of songs to generate
            :param verbose: - display more detailed stats about algorithm
            :param entities: - you can override the horoscope entities
                                by passing in your own. They must be a
                                list of dicts with at least a "name"
                                key/attribute
            :param targets: - you can override the target value calculation
                             by passing in your own. This needs to be a dict
                             with "valence" and "energy" keys.
        """

        # start timer
        start = time.time()

        # print info
        if verbose:
            print('Generating music based on horoscope...')

        # get the currnetly authenticaed users
        # top track and artist uris
        top_uris = self._get_top_seeds()

        # get uris for the entities
        # these can be passed in to override the
        # built-in horoscope entities - most likely
        # in the case of GCF calling where entities
        # are coming in as an object in the request
        # body.
        key_word_uris = self._search_spotify_for_key_words(
            self._get_key_words(entities=entities), limit=10)
        key_word_uri = random.choice(key_word_uris)

        # if targets are supplied - use those
        if targets:
            valence = targets['valence']
            energy = targets['energy']
        # else use the internal horoscope
        else:
            valence = self._score_to_valence(self.horoscope.sentiment.score)
            energy = self._magnitude_to_energy(
                self.horoscope.sentiment.magnitude)

        if verbose:
            print('target_valence: {}'.format(str(round(valence, 2)).ljust(6)))
            print('target_energy:  {}'.format(str(round(energy, 2)).ljust(6)))

        # set params
        parameters = {
            'target_valence': round(valence, 2),
            'target_energy': round(energy, 2)
        }

        # generate recs based on targets and
        recs = self._spclient.get_recommendations(
            seed_artists=top_uris['artist_uris'],
            seed_tracks=(
                top_uris['track_uris'] + [key_word_uri]),
            limit=10,
            parameters=parameters
        )
        target_features = {
            'valence': valence,
            'energy': energy
        }

        # generate the tracks that are random
        # but filter them by those that are closest to
        # the target values
        key_word_uris_targeted = self._filter_tracks_by_audio_features(
            key_word_uris, target_features)

        # get them from spotify
        key_word_tracks = self._spclient.get_tracks(key_word_uris_targeted)

        # create a full tracks list
        all_tracks = recs['tracks'] + key_word_tracks

        # shuffle them for UX
        random.shuffle(all_tracks)

        # stop timer
        end = time.time()

        # info
        if verbose:
            print("Elapsed time: {} sec".format(round(end - start, 2)))

        return all_tracks

    def update_playlist(self, id, track_uris=None):
        """
        Update the currently authenitcated users playlist with
        tracks. These can be passed in or the app will auto-
        generate.
            :param id: the playlist id
            :param track_uris: list of track uris/ids to add to the playlist
        """
        if not track_uris:
            print("No tracks passed in, auto generating...")
            tracks = self.generate()
            track_uris = [track['uri'] for track in tracks]

        print("Updating...")
        # clear the playlist
        self._spclient.clear_playlist(id)

        # add tracks to the playlist
        snapshot = self._spclient.add_tracks_to_playlist(id, track_uris)
        return snapshot

    def __del__(self):
        pass
