// These lines make "require" available
import { createRequire } from "module";
const require = createRequire(import.meta.url);

import { searchArtist, searchAlbums, getAlbum, home } from './controllers/search-artist.js';
import 'dotenv/config' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import express from 'express'
import hbs from 'hbs'
import path from 'path';

const __dirname = path.resolve();

// app settings
const app = express();
app.use(express.static('public'));
app.set('view engine', 'hbs');
app.use(express.json()) // as JSON
app.use(express.urlencoded({ extended: true })) // as url form data
app.listen(3000, () => console.log('My Spotify project running on port 3000 🎧 🥁 🎸 🔊'));

hbs.registerPartials(path.join(__dirname, 'views/partials'));

// setting the spotify-api goes here:
const SpotifyWebApi = require('spotify-web-api-node');
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET
});

// Retrieve an access token
spotifyApi
  .clientCredentialsGrant()
  .then(data => spotifyApi.setAccessToken(data.body['access_token']))
  .catch(error => console.log('Something went wrong when retrieving an access token', error));


// Routing
app.get('/', home);
app.get('/artist-search', searchArtist);
app.get('/album/:albumId', getAlbum);
app.get('/albums/:artistId', searchAlbums);

export { spotifyApi };

