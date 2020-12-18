from astrolify.Astrolify import Astrolify, AstrolifyException

class PlaylistUpdater(Astrolify):
    """
    Class to handle the ubdating of playlists
    """
    def __init__(self, playlist_id, zodiac, sp_access_token=None, 
              sp_refresh_token=None
            ):
        # assign the playlist_id
        self._playlist_id = playlist_id

        # assign access and refresh tokens on creation
        self.sp_access_token = sp_access_token
        self.sp_refresh_token = sp_refresh_token

        # check that at least and access_token or refresh token were supplied 
        if not sp_access_token and not sp_refresh_token:
            raise AstrolifyException("At least an accesstoken or refresh token "
                                    "for Spotify must be passed into the PlaylistUpdater "
                                    "when calling the object."
                                   )

        # init the astrolify class with the access_token and/or refresh token
        # also, for the playlist updater we MUST pass in a horoscope
        Astrolify.__init__(self,
                    zodiac=zodiac,
                    sp_access_token=sp_access_token, 
                    sp_refresh_token=sp_refresh_token,
                    worker=True
                )
        
    def update(self, targets, entities):
        """
        Calls the Astrolify.generate() function, but overrides
        the targets and entities so that it is decoupled
        from an internal horoscope. The main reason is that
        It prevents it from doing on the fly horoscope
        analysis - which is much more efficient and
        less costly at scale
            :param targets: - a dictionary of target values
                              for valence and energy
            :param entities: - a list of dictionaries that have
                                entity names at least
            :param sp_refresh_token: - a valid refresh token
                                        for the user
        """
        tracks = self.generate(targets=targets, entities=entities)
        print('Generated {} tracks'.format(tracks))
        uris = [track['uri'] for track in tracks]
        data = self.update_playlist(self._playlist_id, track_uris=uris)
        return {
            "message": 'Success',
            "snapshot_id": data['snapshot_id']
        }