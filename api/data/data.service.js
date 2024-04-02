


import { loggerService } from '../../services/logger.service.js'
import { stationService } from '../station/station.service.js'
const clientId = "a737078c69ce4f92b0b55aab65b6690e"
const clientSecret = "251919510e1c44e594b7e0deb4f72a16"

const categories = [
    { id: '0JQ5DAqbMKFz6FAsUtgAab', color: '#db0944', headerColor: '#41634d', name: 'New Releases', imgUrl: 'https://i.scdn.co/image/ab67706f000000027ea4d505212b9de1f72c5112' },
    { id: '0JQ5DAqbMKFEC4WFtoNRpw', color: '#039e20', headerColor: '#bd2fb8', name: 'Pop', imgUrl: 'https://i.scdn.co/image/ab67fb8200005cafa862ab80dd85682b37c4e768' },
    { id: '0JQ5DAqbMKFzHmL4tf05da', color: '#ff00ee', headerColor: '#c92a55', name: 'Mood', imgUrl: 'https://i.scdn.co/image/ab67fb8200005caf271f9d895003c5f5561c1354' },
    { id: '0JQ5DAqbMKFQ00XGBls6ym', color: '#4a3757', headerColor: '#7b5499', name: 'Hip-Hop', imgUrl: 'https://i.scdn.co/image/ab67fb8200005caf9e3dea60be755ccd97b7351f' },
    { id: '0JQ5DAqbMKFA6SOHvT3gck', color: '#5b96c9', headerColor: '#7b5499', name: 'Party', imgUrl: 'https://i.scdn.co/image/ab67fb8200005cafcbf80f8ea695536eace4fd2c' },
    { id: '0JQ5DAudkNjCgYMM0TZXDw', color: '#9374b3', headerColor: '#41634d', name: 'Charts', imgUrl: 'https://charts-images.scdn.co/assets/locale_en/regional/weekly/region_global_default.jpg' },
    //{ id: '0JQ5DAqbMKFIRybaNTYXXy', color: '#433ae0', headerColor: '#3c32a8', name: 'In the car', imgUrl: 'https://i.scdn.co/image/ab67fb8200005caf341265d27be641506e56c346' },
    { id: '0JQ5DAqbMKFHOzuVTgTizF', color: '#f54414', headerColor: '#57b5b0', name: 'Dance Electronic', imgUrl: 'https://i.scdn.co/image/ab67fb8200005cafdfdaac1cf9574a196ca25196' },
    { id: '0JQ5DAqbMKFAXlCG6QvYQ4', color: '#96918f', headerColor: '#78162d', name: 'Workout', imgUrl: 'https://i.scdn.co/image/ab67706f000000029249b35f23fb596b6f006a15' },
    { id: '0JQ5DAqbMKFPw634sFwguI', color: '#1f6640', headerColor: '#3f334f', name: 'EQUAL', imgUrl: 'https://i.scdn.co/image/ab67fb8200005caf9ed6e364e8839210dc4dbff7' },
    { id: '0JQ5DAtOnAEpjOgUKwXyxj', color: '#9374b3', headerColor: '#1e1c21', name: 'Discover', imgUrl: 'https://t.scdn.co/images/d0fb2ab104dc4846bdc56d72b0b0d785.jpeg' },
    { id: '0JQ5DAqbMKFFtlLYUHv8bT', color: '#f03611', headerColor: '#1f56b5', name: 'Alternative', imgUrl: 'https://i.scdn.co/image/ab67fb8200005caf106e29a9f294cb4265da6af9' },
    { id: '0JQ5DAqbMKFF9bY76LXmfI', color: '#3478ed', headerColor: '#cc1890', name: 'Frequency', imgUrl: 'https://i.scdn.co/image/ab67fb8200005caf9571e2fc2a85d91eda472f04' },
    { id: '0JQ5DAqbMKFCWjUTdzaG0e', color: '#ff0000', headerColor: '#80553e', name: 'Indie', imgUrl: 'https://i.scdn.co/image/ab67fb8200005cafa1a252e3a815b65778d8c2aa' },
    { id: '0JQ5DAqbMKFEOEBCABAxo9', color: '#ff0000', headerColor: '#8183a6', name: 'Netflix', imgUrl: 'https://i.scdn.co/image/ab67fb8200005caf0b0c71c920d6a745461ada69' },
    { id: '0JQ5DAqbMKFGnsSfvg90Wo', color: '#3478ed', headerColor: '#4045a8', name: 'GLOW', imgUrl: 'https://i.scdn.co/image/ab67fb8200005caf50cfe3fbd3a9fb8810da45ea' },
    { id: '0JQ5DAqbMKFDXXwE9BDJAr', color: '#ff0000', headerColor: '#991595', name: 'Rock', imgUrl: 'https://i.scdn.co/image/ab67fb8200005cafae7e69beb88f16969641b53e' },
    { id: '0JQ5DAqbMKFEZPnFQSFB1T', color: '#f08011', headerColor: '#527812', name: 'R&B', imgUrl: 'https://i.scdn.co/image/ab67fb8200005caff4e38be86ca48a3b10884ae3' },
    // { id: '0JQ5DAqbMKFN2GMExExvrS', color: '#9374b3', headerColor: '#527812', name: 'Throwback', imgUrl: 'https://i.scdn.co/image/ab67fb8200005cafded6f7cbf0d9edcd92776473' },
    { id: '0JQ5DAqbMKFIxnofjQmnmn', color: '#3478ed', headerColor: '#57729c', name: 'Disney', imgUrl: 'https://i.scdn.co/image/ab67fb8200005caf78c17dc5631c053fd95f31bb' },
    { id: '0JQ5DAqbMKFOOxftoKZxod', color: '#ad6f58', headerColor: '#2f5c4b', name: 'RADAR', imgUrl: 'https://i.scdn.co/image/ab67fb8200005cafe760702de052fbefea27064a' },
    { id: '0JQ5DAqbMKFLb2EqgLtpjC', color: '#ad6f58', headerColor: '#6cadac', name: 'Wellness', imgUrl: 'https://i.scdn.co/image/ab67fb8200005caf8dec632effd9735fa8aba06e' },
    { id: '0JQ5DAqbMKFKLfwjuJMoNC', color: '#f54414', headerColor: '#283366', name: 'Country', imgUrl: 'https://i.scdn.co/image/ab67fb8200005cafc0d2222b4c6441930e1a386e' },
    { id: '0JQ5DAqbMKFGvOw3O4nLAf', color: '#039e20', headerColor: '#c23502', name: 'K-pop', imgUrl: 'https://i.scdn.co/image/ab67fb8200005caf013ee3c983e6f60bf28bad5a' },
    { id: '0JQ5DAqbMKFFzDl7qN9Apr', color: '#f54414', headerColor: '#088715', name: 'Chill', imgUrl: 'https://i.scdn.co/image/ab67fb8200005caf47e942f5bea637f4f4760170' },
    { id: '0JQ5DAqbMKFCuoRTxhYWow', color: '#153261', headerColor: '#697885', name: 'Sleep', imgUrl: '	https://i.scdn.co/image/ab67706f00000002b70e0223f544b1faa2e95ed0' },
    { id: '0JQ5DAqbMKFx0uLQR2okcc', color: '#5c7991', headerColor: '#697885', name: 'At Home', imgUrl: 'https://i.scdn.co/image/ab67fb8200005cafe914a07d20cec7a65e2e5dad' },
    { id: '0JQ5DAqbMKFIVNxQgRNSg0', color: '#d96d16', headerColor: '#ad1b13', name: 'Decades', imgUrl: 'https://i.scdn.co/image/ab67fb8200005caff005a355830c374754d32868' },
    { id: '0JQ5DAqbMKFAUsdyVjCQuL', color: '#ff0000', headerColor: '#b8287a', name: 'Love', imgUrl: 'https://i.scdn.co/image/ab67fb8200005cafb03c6f8e7efca2ae36f41b31' },
    // { id: '0JQ5DAqbMKFJw7QLnM27p6', color: '#c43ba9', headerColor: '#86bab7', name: 'Student', imgUrl: 'https://i.scdn.co/image/ab67fb8200005cafdad1281e13697e8d8cf8f347' },
    // { id: '0JQ5DAqbMKFQVdc2eQoH2s', color: '#f54414', headerColor: '#9cba93', name: 'Desi', imgUrl: 'https://i.scdn.co/image/ab67fb8200005cafae8338a83b96acd1ab54416d' },
    { id: '0JQ5DAqbMKFAJ5xb0fwo9m', color: '#96918f', headerColor: '#33211d', name: 'Jazz', imgUrl: 'https://i.scdn.co/image/ab67fb8200005cafe289743024639ea8f202364d' },
    { id: '0JQ5DAqbMKFQIL0AXnG5AK', color: '#c43ba9', headerColor: '#80553e', name: 'Trending', imgUrl: 'https://i.scdn.co/image/ab67fb8200005caf1867113f5218598847550acd' },
    { id: '0JQ5DAqbMKFPrEiAOxgac3', color: '#804629', headerColor: '#a4a4ab', name: 'Classical', imgUrl: 'https://i.scdn.co/image/ab67fb8200005caf12809992dfc5b318892ea07b' },
    { id: '0JQ5DAqbMKFziKOShCi009', color: '#f72d81', headerColor: '#373a73', name: 'Anime', imgUrl: 'https://i.scdn.co/image/ab67706f00000002c19c5f13f8b3ff2d73ff00bc' },
    { id: '0JQ5DAqbMKFy78wprEpAjl', color: '#d96d16', headerColor: '#734637', name: 'Folk & Acoustic', imgUrl: '	https://i.scdn.co/image/ab67fb8200005cafcc70a3c2e4c71398708bdc4a' },
    { id: '0JQ5DAqbMKFCbimwdOYlsl', color: '#4a3757', headerColor: '#7c5c99', name: 'Focus', imgUrl: 'https://i.scdn.co/image/ab67706f00000002e4eadd417a05b2546e866934' },
    { id: '0JQ5DAqbMKFIpEuaCnimBj', color: '#ff00ee', headerColor: '#80553e', name: 'Soul', imgUrl: '	https://i.scdn.co/image/ab67fb8200005cafd82e2c83fe100a89e9cbb2a2' },
    { id: '0JQ5DAqbMKFFoimhOqWzLB', color: '#9374b3', headerColor: '#3e9691', name: 'Kids & Family', imgUrl: 'https://i.scdn.co/image/ab67fb8200005caf8a04560a209b3f32165ea8a2' },
    { id: '0JQ5DAqbMKFCfObibaOZbv', color: '#f72d81', headerColor: '#74963e', name: 'Gaming', imgUrl: 'https://i.scdn.co/image/ab67fb8200005caf26dd3719e8824756914ae61f' },
    { id: '0JQ5DAqbMKFObNLOHydSW8', color: '#3478ed', headerColor: '#a85b31', name: 'Caribbean', imgUrl: 'https://i.scdn.co/image/ab67fb8200005caf8ba1febbb4f77336b6f9aace' },
    { id: '0JQ5DAqbMKFNQ0fGp4byGU', color: '#f54414', headerColor: '#366375', name: 'Afro', imgUrl: '	https://i.scdn.co/image/ab67fb8200005caf04faccb4f5e1828600921f37' },
    { id: '0JQ5DAqbMKFDkd668ypn6O', color: '#ff0000', headerColor: '#206cc9', name: 'Metal', imgUrl: 'https://i.scdn.co/image/ab67fb8200005cafefa737b67ec51ec989f5a51d' },
    { id: '0JQ5DAqbMKFOzQeOmemkuw', color: '#c43ba9', headerColor: '#c41a58', name: 'TV & Movies', imgUrl: 'https://i.scdn.co/image/ab67fb8200005cafb4c4523336133ec3c7fd1744' },
    { id: '0JQ5DAqbMKFRieVZLLoo9m', color: '#5c7991', headerColor: '#41634d', name: 'Instrumental', imgUrl: '	https://i.scdn.co/image/ab67706f000000028ed1a5002b96c2ea882541b2' },
    { id: '0JQ5DAqbMKFAjfauKLOZiv', color: '#153261', headerColor: '#527812', name: 'Punk', imgUrl: '	https://i.scdn.co/image/ab67fb8200005cafb2cdd7a95b0a5444aa15cfb5' },
    { id: '0JQ5DAqbMKFLjmiZRss79w', color: '#4a7b8a', headerColor: '#391c4f', name: 'Ambient', imgUrl: 'https://i.scdn.co/image/ab67fb8200005cafa6ee95dc83af715115f40522' },
    { id: '0JQ5DAqbMKFQiK2EHwyjcU', color: '#cf7342', headerColor: '#1f2573', name: 'Blues', imgUrl: '	https://i.scdn.co/image/ab67fb8200005caff22ac5cab318d550b593ffac' },
    { id: '0JQ5DAqbMKFRY5ok2pxXJ0', color: '#d96d16', headerColor: '#731531', name: 'Cooking & Dining', imgUrl: 'https://i.scdn.co/image/ab67fb8200005cafe53d71d0920a4f1f441d803c' },
    { id: '0JQ5DAqbMKFAQy4HL4XU2D', color: '#3478ed', headerColor: '#41634d', name: 'Travel', imgUrl: '	https://i.scdn.co/image/ab67fb8200005caf4b36a2c31432ace68d90c4f2' }
]

function getCategories() {
    return categories
}


export const dataService = {
    loadSpotifyDataToDB
}

async function loadSpotifyDataToDB() {

    const accessToken = await getSpotifyAccessToken();
    if (!accessToken) {
        res.status(500).send('Failed to obtain access token from Spotify');
        return;
    }

    const categories = getCategories()
    try {
        for (const category of categories) {
            console.log('getting stations for category:', category.name)
            const playlists = await _fetchAllStationsForCategory(category, accessToken)
            console.log('saving stations to DB for category:', category.name)
            for (const playlist of playlists) {
                await stationService.add(playlist);
            }
        }
    } catch (error) {
        console.error('An error occurred:', error)
        res.status(500).send('Failed to upload spotify data to DB')
    }
}

async function getSpotifyAccessToken() {
    const authString = btoa(`${clientId}:${clientSecret}`);
    console.log('authString', authString)
    try {
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${authString}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'grant_type=client_credentials',
        });

        const data = await response.json();
        return data.access_token;
    } catch (error) {
        console.error('Error fetching Spotify access token:', error);
        return null;
    }
}


async function _fetchAllStationsForCategory(category, accessToken) {
    console.log('fetchAllStationsForCategory')
    const data = await _fetchSpotifyPlaylistsAndTracksForCategory(category, accessToken)
    const spotifyStations = []
    data.map(playlist => {
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
        console.log('fetching category:', category.name)
        const playlistsData = await _fetchPlaylistsForCategory(category.id, accessToken)

        /*fetch songs only for the first categories*/

        for (const playlist of playlistsData.playlists.items) {
            const tracksData = await _fetchTracksForPlaylist(playlist.id, accessToken)
            playlist.categoryId = category.id  //add category to the PL
            playlist.tracks = tracksData
            playlist.likes = await _fetchPlaylistFollowers(playlist.id, accessToken)
            categoryPlayLists.push(playlist)
            await _delay(1500); // Assuming delay is an async function that returns a promise
            console.log('fetching next item')
        }

    } catch (error) {
        console.error('Error:', error)
    }
    return categoryPlayLists

}

async function _fetchPlaylistFollowers(playlistId, accessToken) {
    const url = `https://api.spotify.com/v1/playlists/${playlistId}`;
    const response = await fetch(url, { headers: { 'Authorization': 'Bearer ' + accessToken } });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data.followers.total; // Return the number of followers
}





function _delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
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






function _createStationFromSpotifyPlayList(playlist) {
    console.log('saving playlist:', playlist.name)
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
    console.log(playlist)

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


function _getEmptyStation() {

    return {
        //_id: '',
        name: '',
        description: '',
        createdBy: {
            _id: '',
            fullname: '',
            imgUrl: '',
        },

        songs: [],
        likedByUsers: []
    }
}



function _validateSong(song) {
    if (!song || !song.track) return false

    if (!song.track.id || !song.track.name || !song.track.href || !song.track.duration_ms || !song.added_at) {
        console.log('missing parameters for song')
        return false;
    }

    if (!Array.isArray(song.track.artists) || song.track.artists.length === 0) {
        console.log('missing parameters for artist')
        return false;
    }

    // Ensure album and album.images exist and images is an array with at least one item
    if (!song.track.album || !Array.isArray(song.track.album.images) || song.track.album.images.length === 0) {
        console.log('missing parameters for album')
        return false;
    }

    // Check for the existence of album.name
    if (!song.track.album.name) {
        console.log('missing parameters for album name')
        return false;
    }

    // If all checks pass, the song is valid
    return true;
}


function _validateStation(playlist) {
    // Check if the playlist object is not null or undefined
    if (!playlist) return false;

    // Check for the existence and non-emptiness of direct fields
    if (!playlist.id || !playlist.name || !playlist.description) {
        console.log('missing parameters of station')
        return false;
    }

    // Check for the existence of owner fields
    if (!playlist.owner || !playlist.owner.id || !playlist.owner.display_name) {
        console.log('missing owner of station:', playlist.name)
        return false;
    }

    // Ensure images array exists and has at least one item with a url
    if (!Array.isArray(playlist.images) || playlist.images.length === 0 || !playlist.images[0].url) {
        console.log('missing img data of station:', playlist.name)
        return false;
    }

    // If all checks pass, the playlist is valid for station creation
    return true;
}


function _formatDuration(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    // Convert minutes and seconds to strings without leading zeros
    const formattedMinutes = minutes.toString();
    const formattedSeconds = seconds < 10 ? '0' + seconds : seconds.toString();

    return `${formattedMinutes}:${formattedSeconds}`;
}