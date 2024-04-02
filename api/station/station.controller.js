import { stationService } from "./station.service.js"

//List
export async function getStations(req, res) {
    console.log('request to get stations received')
    try {
        let filterBy = {
            creatorId: req.query.creatorId || '',
            likedByUserId: req.query.likedByUserId || '',
            categoryId: req.query.categoryId || ''
        }
        console.log(filterBy)
        
        const stations = await stationService.query(filterBy)
        res.send(stations)
    } catch (err) {
        res.status(400).send(`couldn't get stations`)
    }
}


//Get
export async function getStation(req, res) {

    var { stationId } = req.params

    try {
        const station = await stationService.getById(stationId, req.loggedinUser)
        res.send(station)
    } catch (err) {
        res.status(400).send(`couldn't get station`)
    }
}

//Delete
export async function removeStation(req, res) {
    const { stationId } = req.params
    console.log(`user ${req.loggedinUser.fullname} is trying to remove station id: ${stationId}`)
    console.log(req.loggedinUser)

    try {
        const deletedCount = await stationService.remove(stationId, req.loggedinUser)
        res.send({ msg: 'Deleted OK', deletedCount })
    } catch (err) {
        res.status(400).send(`Couldn't remove station - ${err}`)
    }
}

//Save
export async function addStation(req, res) {
    const { name, description , imgUrl  } = req.body
    const stationToSave = { name, description, imgUrl }
    try {
        const savedStation = await stationService.add(stationToSave, req.loggedinUser)
        res.send(savedStation)
    } catch (err) {
        res.status(400).send(`couldn't save station -  ${err}`)
    }

}

//Update
// export async function updateStation(req, res) {

//     const { _id, name, description, createdBy } = req.body
//     const stationToSave = { _id, name, description, createdBy }
  
//     console.log('--------------------new station to update', stationToSave)
//     try {
//         const savedStation = await stationService.update(stationToSave, req.loggedinUser)
//         res.send(savedStation)
//     } catch (err) {
//         console.log(err)
//         res.status(400).send(`couldn't update station -  ${err}`)
//     }

// }

export async function updateStation(req, res) {
    // Deep copy the station from the request body
    const stationToSave = JSON.parse(JSON.stringify(req.body));
    
    console.log('--------------------new station to update', stationToSave);
    try {
        const savedStation = await stationService.update(stationToSave, req.loggedinUser);
        res.send(savedStation);
    } catch (err) {
        console.log(err);
        res.status(400).send(`couldn't update station - ${err}`);
    }
}

