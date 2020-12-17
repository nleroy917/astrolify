from dotenv import load_dotenv
import os
import random

load_dotenv()
SPOTIFY_CLIENT_ID=os.getenv('SPOTIFY_CLIENT_ID')
SPOTIFY_CLIENT_SECRET=os.getenv('SPOTIFY_CLIENT_SECRET')
GOOGLE_APPLICATION_CREDENTIALS=os.getenv('GOOGLE_APPLICATION_CREDENTIALS')

# import custom modules
from astrolify.Astrolify import Astrolify, AstrolifyException
from spotify.Spotify import SpotifyClient
from language_processing.GoogleNaturalLanguage import LanguageClient
from horoscopes.Client import HoroscopeClient
from horoscopes.Horoscopes import Horoscope

# import flask
from flask import Flask
from flask import jsonify
from flask import request
from flask import render_template
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

#import other necessary modules
import json
from dateutil import parser

# Testing route/main route
@app.route('/')
def api_base():
    package = {
        "message": "astrolify api",
        "version": "0.0.1"
    }
	return jsonify(package)