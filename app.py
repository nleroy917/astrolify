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

# import flask
from flask import Flask
from flask import jsonify
from flask import request
from flask import render_template
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = POSTGRES_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
CORS(app)

# import db models
from postgres.models import *

#import other necessary modules
import json

# Testing route/main route
@app.route('/')
def api_base():
    package = {
        "message": "astrolify api",
        "version": "0.0.1"
    }
    return jsonify(package)

@app.route('/users', methods=['GET', 'POST'])
def all_users():
    if request.method == 'GET':
        results = User.query.all()
        users = [user.serialize for user in results]
        return jsonify(users)
    elif request.method == 'POST':
        """
        Create new user
        """
        data = request.json
        new_user = User(
            id = 'test1234',
            display_name = 'test-user-rox',
            email = 'test@tester.com',
            birthday = date.today(),
            name = 'test user',
            playlist_id = '1234',
            spotify_access_token = '1234',
            spotify_refresh_token = '1234',
            zodiac = 'virgo',
            account_created = date.today()
        )
        db.session.add(new_user)
        return jsonify({
            'status': 'success',
            'user': new_user.serialize
        })

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
    data = request.json
    oauth = OAuth2(
        SPOTIFY_CLIENT_ID,
        SPOTIFY_CLIENT_SECRET,
        REGISTER_REDIRECT
    )
    
    tokens = oauth.get_tokens(data['code'])
    sp = SpotifyClient(access_token=tokens['access_token'])
    user = sp.current_user()

    return jsonify({
        'status': 'success',
        'user': user
    })


if __name__ =='__main__':
    app.run()