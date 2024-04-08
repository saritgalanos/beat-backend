
async function loadSpotifyDataToDB() {

    const accessToken = await getSpotifyAccessToken()
    if (!accessToken) {
        res.status(500).send('Failed to obtain access token from Spotify');
        return;
    }

    const categories = _getCategories(accessToken)
    try {
        for (const category of categories) {
             const playlists = await _fetchAllStationsForCategory(category, accessToken)
             for (const playlist of playlists) {
                /*add to database*/
                await stationService.add(playlist)
            }
        }
    } catch (error) {
        console.error('An error occurred:', error)
        res.status(500).send('Failed to upload spotify data to DB')
    }
}


async function getSpotifyAccessToken() {
    const authString = btoa(`${clientId}:${clientSecret}`)
  
    try {
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${authString}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'grant_type=client_credentials',
        });

        const data = await response.json()
        return data.access_token
    } catch (error) {
        return null
    }
}



async function _fetchAllStationsForCategory(category, accessToken) {
    //take data from spotify
    const data = await _fetchSpotifyPlaylistsAndTracksForCategory(category, accessToken)
    const spotifyStations = []
    data.map(playlist => {
        //convert data to stations objects
        const station = _createStationFromSpotifyPlayList(playlist)
        if (station) {
            spotifyStations.push(station)
        }
    })
    return spotifyStations
}

async function _fetchSpotifyPlaylistsAndTracksForCategory(category, accessToken) {

    const categoryPlayLists = []

    try {
        const playlistsData = await _fetchPlaylistsForCategory(category.id, accessToken)

        /*fetch songs only for the first categories*/

        for (const playlist of playlistsData.playlists.items) {
            const tracksData = await _fetchTracksForPlaylist(playlist.id, accessToken)
            playlist.categoryId = category.id  //add category to the PL
            playlist.tracks = tracksData
            playlist.likes = await _fetchPlaylistFollowers(playlist.id, accessToken)
            categoryPlayLists.push(playlist)
            await _delay(1500)
            
        }

    } catch (error) {
        console.error('Error:', error)
    }
    return categoryPlayLists

}


async function _fetchPlaylistsForCategory(categoryId, accessToken) {
    const url = `https://api.spotify.com/v1/browse/categories/${categoryId}/playlists`;
    const response = await fetch(url, { headers: { 'Authorization': 'Bearer ' + accessToken } });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();

    // Assuming the playlists are located in data.playlists.items
    const uniquePlaylists = data.playlists.items.reduce((acc, current) => {
        const x = acc.find(item => item.id === current.id);
        if (!x) {
            return acc.concat([current]);
        } else {
            return acc;
        }
    }, []);

    // Replace the original playlist array with the unique ones
    data.playlists.items = uniquePlaylists;

    return data;
}



async function _fetchTracksForPlaylist(playlistId, accessToken) {
    const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`
    const response = await fetch(url, { headers: { 'Authorization': 'Bearer ' + accessToken } })
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    return response.json()
}


async function _fetchPlaylistFollowers(playlistId, accessToken) {
    const url = `https://api.spotify.com/v1/playlists/${playlistId}`;
    const response = await fetch(url, { headers: { 'Authorization': 'Bearer ' + accessToken } });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data.followers.total; // Return the number of followers
}


function _createStationFromSpotifyPlayList(playlist) {
    var station = _getEmptyStation()
    if (!_validateStation(playlist))
        return null

    //station._id = playlist.id
    station.name = playlist.name
    station.createdBy._id = playlist.owner.id
    station.createdBy.fullname = playlist.owner.display_name
    station.imgUrl = playlist.images[0].url
    station.description = playlist.description
    station.likes = playlist.likes
    if (playlist.categoryId) {
        station.categoryId = playlist.categoryId
    }
 
    playlist.tracks.items.slice(0, 40).forEach(song => {
        if (!_validateSong(song)) {
            return
        }
        const songToAdd = {
            id: song.track.id,
            title: `${song.track.name} - ${song.track.artists[0].name}`,
            //url: song.track.href,
            url:'',
            imgUrl: song.track.album.images[0].url,
            addedBy: 'beat',
            addedAt: Date.parse(song.added_at),
            duration: _formatDuration(song.track.duration_ms),
            album: song.track.album.name
        }
        station.songs.push(songToAdd)
    })
    return station
}



function _delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function _getCategories(accessToken) {

}

