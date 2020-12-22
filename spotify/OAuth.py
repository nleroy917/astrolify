from spotipy.oauth2 import SpotifyOAuth

class OAuth2():
    """
    Simple class to help go through the OAuth handshake serverside. It leverages
    the spotipy OAuth class already - no need to reinvent the wheel right?
    """

    def __init__(self, client_id, client_secret, redirect_uri):
        """
        Create an instance of the spotify oauth class
        """
        self._spoauth = SpotifyOAuth(
            client_id=client_id,
            client_secret=client_secret,
            redirect_uri=redirect_uri
        )
    
    def get_tokens(self, code):
        """
        Exchange the authorization code for access tokens
        """
        return self._spoauth.get_access_token(
            code=code,
            as_dict=True,
            check_cache=False
        )

    
    

