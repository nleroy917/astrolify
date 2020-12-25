from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()

# User model
class User(db.Model):
    __tablename__ = 'users'
    firebase_id =db.Column(db.String(80), primary_key=True)
    spotify_id = db.Column(db.String(80))
    display_name = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True)
    birthday = db.Column(db.DateTime, nullable=False)
    name = db.Column(db.String(80), nullable=False)
    playlist_id = db.Column(db.String(80), nullable=False)
    spotify_access_token = db.Column(db.String(120))
    spotify_refresh_token = db.Column(db.String(120))
    zodiac = db.Column(db.String(80), nullable=False)
    account_created = db.Column(db.DateTime)

    @property
    def serialize(self):
        return {
            'firebase_id': self.firebase_id,
            'spotify_id': self.spotify_id,
            'display_name': self.display_name,
            'email': self.email,
            'birthday': self.birthday,
            'name': self.name,
            'playlist_id': self.playlist_id,
            'spotify_access_token': self.spotify_access_token,
            'spotify_refresh_token' :self.spotify_refresh_token,
            'zodiac': self.zodiac,
            'account_created': self.account_created
        }
    def __repr__(self):
        return '<User %r>' % self.username

# Playlist Model
class Playlist(db.Model):
    __tablename__ = 'playlists'
    playlist_id = db.Column(db.String(80), primary_key=True)
    owner_spotify_id = db.Column(db.String(80))
    owner_firebase_id = db.Column(db.String(80))
    snapshot_id = db.Column(db.String(120))
    link = db.Column(db.String(120))
    name = db.Column(db.String(80))

    @property
    def serialize(self):
        return {
            'playlist_id': self.playlist_id,
            'owner_spotify_id': self.owner_spotify_id,
            'owner_firebase_id': self.owner_firebase_id,
            'snapshot_id': self.snapshot_id,
            'link': self.link,
            'name': self.name
        }
    def __repr__(self):
        return '<Playlist %r>' % self.playlist_id