from dotenv import load_dotenv
import os
import random
from datetime import date

# Env variables
load_dotenv()
SPOTIFY_CLIENT_ID=os.getenv('SPOTIFY_CLIENT_ID')
SPOTIFY_CLIENT_SECRET=os.getenv('SPOTIFY_CLIENT_SECRET')
GOOGLE_APPLICATION_CREDENTIALS=os.getenv('GOOGLE_APPLICATION_CREDENTIALS')
REGISTER_REDIRECT=os.getenv('REGISTER_REDIRECT')
POSTGRES_URI=os.getenv('POSTGRES_URI')


# import custom modules
from astrolify.Astrolify import Astrolify, AstrolifyException
from spotify.Spotify import SpotifyClient
from spotify.OAuth import OAuth2
from language_processing.GoogleNaturalLanguage import LanguageClient
from horoscopes.Client import HoroscopeClient
from horoscopes.Horoscopes import Horoscope

#import fireabse and init
import firebase_admin
from firebase_admin import credentials, auth
cred = credentials.Certificate(".google/astrolify-b7774d0fa3b8.json")
if not firebase_admin._apps:
    fb_app = firebase_admin.initialize_app(cred)

# import flask
from flask import Flask
from flask import jsonify
from flask import request
from flask import render_template
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

# import db models
from postgres.models import *

#import other necessary modules
import json

# init flask
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = POSTGRES_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
db = SQLAlchemy(app)
CORS(app)

# Testing route/main route
@app.route('/')
def api_base():
    package = {
        "message": "astrolify api",
        "version": "0.0.1"
    }
    return jsonify(package)

@app.route('/users', methods=['GET'])
def all_users():
    if request.method == 'GET':
        results = User.query.all()
        users = [user.serialize for user in results]
        return jsonify(users)

@app.route('/playlists', methods=['GET'])
def all_playlists():
    if request.method == 'GET':
        results = Playlist.query.all()
        playlists = [playlist.serialize for playlist in results]
        return jsonify(playlists)

@app.route('/auth/register', methods=['POST'])
def register_user():
    """
    Register a new user with Astrolify. This request should come
    in with a bunch of data for authenticating with spotify. Namely,
    a valid auth-code. In addition, some basic info should come in
    like birthday and name.

    With this, we can validate the user, get information on their 
    account and insert them into the database and get rolling.
        1.) Implement OAuth2 handshake with Spotify
            - get access_token and refresh token
        2.) Use to get user profile data
        3.) Insert user into database
        3.) Create a new playlist for this user based
            on their zodiac
        4.) Insert Playlist data into database
        5.) Create custom token with Firebase-SDK
        6.) Send token back to client for them to log in
    """
    # get data and init OAuth flow object
    data = request.json
    oauth = OAuth2(
        SPOTIFY_CLIENT_ID,
        SPOTIFY_CLIENT_SECRET,
        REGISTER_REDIRECT
    )
    # extract birthday and get spotify tokens
    birthday = data['birthday'].split('-')
    tokens = oauth.get_tokens(data['code'])

    # init Astrolify object + spotify client
    ast = Astrolify(
        zodiac=data['zodiac'],
        sp_access_token=tokens['access_token']
    )
    sp = SpotifyClient(access_token=tokens['access_token'])

    # get user, create platlist and update it with music
    user = sp.current_user()
    playlist = sp.create_playlist('Astrolify', img='./assets/coverart-test.png')
    snapshot = ast.update_playlist(playlist['id'])
    
    # insert new playlist and new user into system
    new_playlist = Playlist(
        playlist_id = playlist['id'],
        owner = user['id'],
        snapshot_id = snapshot['snapshot_id'],
        link = playlist['external_urls']['spotify'],
        name = playlist['name']
    )

    new_user = User(
        id = user['id'],
        display_name = user['display_name'],
        email = user['email'],
        birthday = date(
            int(birthday[0]), int(birthday[1]), int(birthday[2])
        ),
        name = data['name'],
        playlist_id = '1234',
        spotify_access_token = tokens['access_token'],
        spotify_refresh_token = tokens['refresh_token'],
        zodiac = data['zodiac'],
        account_created = date.today()
    )

    # insert and commit
    db.session.add(new_playlist)
    db.session.add(new_user)
    try:
        db.session.commit()
    except Exception:
        print('Error in commit, rolling back db')
        db.session.rollback()


    # create token to sign in
    fb_token = auth.create_custom_token(user['id'])

    # return
    return jsonify({
        'status': 'success',
        'user': user,
        'playlist': playlist,
        'fb_token': fb_token.decode('utf-8')
    })


if __name__ =='__main__':
    app.run()