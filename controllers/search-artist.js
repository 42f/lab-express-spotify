import { spotifyApi } from '../app.js';

function searchArtist(req, res, next) {
	const query = req.query.search;
	spotifyApi
		.searchArtists(query)
		.then(data => {
			const temlateData = {
				search: query,
				results: data.body.artists.items.map(a => {
					return { name: a.name, id: a.id, preview: a.images };
				})
			}
			res.render('artist-search-results', temlateData);
		})
		.catch(err => console.log('The error while searching artists occurred: ', err));
}

function searchAlbums(req, res, next) {
	const id = req.params.artistId;
	spotifyApi
		.getArtistAlbums(id)
		.then(data => {
			const temlateData = {
				results: data.body.items.map(a => {
					return { name: a.name, id: a.id, artwork: a.images };
				})
			}
			res.render('albums', temlateData);
		})
		.catch(err => console.log('The error while searching artists occurred: ', err));

}

function getAlbum(req, res, next) {
	const id = req.params.albumId;
	spotifyApi
		.getAlbumTracks(id)
		.then(data => {
			const temlateData = {
				artwork: req.query.img,
				results: data.body.items.map(song => {
					return { name: song.name, id: song.id, preview_url: song.preview_url };
				})
			}
			res.render('album', temlateData);
		})
		.catch(err => console.log('The error while searching artists occurred: ', err));

}

function home(req, res, next) {
	res.render('home');
}

export { searchArtist, searchAlbums, getAlbum, home };
