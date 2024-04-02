import { loggerService } from './../../services/logger.service.js';
import { dataService } from './data.service.js';

export async function getSpotifyData(req, res) {
    try {
        await dataService.loadSpotifyDataToDB()
        res.send('Spotify data fetched and stored successfully');
    } catch (err) {
        res.status(400).send(`couldn't get spotify data`)
    }
}

