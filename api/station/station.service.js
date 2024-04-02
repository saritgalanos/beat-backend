//import fs from 'fs'
import { utilService } from './../../services/util.service.js';
import { dbService } from '../../services/db.service.js';
import { ObjectId } from 'mongodb'
import { asyncLocalStorage } from '../../services/als.service.js';
import { loggerService } from '../../services/logger.service.js'

export const stationService = {
    query,
    getById,
    remove,
    add,
    update,
}

const collectionName = 'station'
const PAGE_SIZE = 3

async function query(filterBy) {
    try {
        const criteria = _buildCriteria(filterBy)
        //const sortCriteria = _buildSortCriteria(filterBy)
        console.log('criteria', criteria)


        const collection = await dbService.getCollection(collectionName)

        // var stations = await collection.aggregate(_buildAggregationPipeline(filterBy))

        // console.log(stations)



        // const stationCursor = await collection.find(criteria).sort(sortCriteria)
        const stationCursor = await collection.find(criteria)

        const stations = await stationCursor.toArray()
        return stations

    } catch (err) {
        loggerService.error('Had problems getting stations')
        throw err
    }

}

async function getById(stationId) {
    try {
        const collection = await dbService.getCollection(collectionName)
        const station = await collection.findOne({ _id: new ObjectId(stationId) })
        if (!station) {
            console.log('could not find station')
            throw `Couldn't find bug with _id ${stationId}`
        }
        return station
    } catch (err) {
        loggerService.error(`while finding station ${stationId}`, err)
        throw err
    }
}


async function remove(stationId, loggedinUser) {
    try {

        const collection = await dbService.getCollection(collectionName)
        const stationToDelete = await collection.findOne({ _id: new ObjectId(stationId) })

        /*only the creator or an admin can delete the bug */
        if (!loggedinUser.isAdmin && (stationToDelete.createdBy._id !== loggedinUser._id)) {
            console.log(`${loggedinUser._id} is trying to remove bu ${stationToDelete.createdBy._id} `)
            throw { msg: `Not your station`, code: 403 }
        }

        const { deletedCount } = await collection.deleteOne({ _id: new ObjectId(stationId) })
        return deletedCount
    } catch (err) {
        loggerService.error(`cannot remove station ${stationId}`, err)
        throw err
    }
}


async function add(stationToSave, loggedinUser) {
    try {
        if (loggedinUser) {
            stationToSave.createdBy = loggedinUser
        }
        const collection = await dbService.getCollection(collectionName)
        await collection.insertOne(stationToSave)
        //stationToSave.createdAt = new ObjectId(stationToSave._id).getTimestamp()
        return stationToSave
    } catch (err) {
        loggerService.error('add, can not add station : ' + err)
        throw err
    }
}

async function update(station, loggedinUser) {
    try {

        const collection = await dbService.getCollection(collectionName)
        const stationToUpdate = await collection.findOne({ _id: new ObjectId(station._id) })

        /*only the creator or an admin can update the station */
        // if (!loggedinUser.isAdmin && (stationToUpdate.createdBy._id !== loggedinUser._id)) {
        //     console.log(`${loggedinUser._id} is trying to update station created by ${stationToUpdate.createdBy._id} `)
        //     throw { msg: `Not your station`, code: 403 }
        // }


        // Take only updatable fields
        const stationToSave = JSON.parse(JSON.stringify(station));
        delete stationToSave.createdBy;
        delete stationToSave._id;
        const res = await collection.updateOne({ _id: new ObjectId(station._id) }, { $set: stationToSave })
        return station
    } catch (err) {
        loggerService.error(`cannot update station ${station._id}`, err)
        throw err
    }
}




function _buildCriteria(filterBy) {
    console.log(filterBy)
    const criteria = {}

    if (filterBy.categoryId) {
        criteria.categoryId = { $regex: filterBy.categoryId, $options: 'i' }
    }

    if (filterBy.creatorId) {
        // Basic match for stations created by this user
        criteria['createdBy._id'] = { $regex: filterBy.creatorId, $options: 'i' }
    }

    if (filterBy.likedByUserId) {
        criteria['likedByUsers._id'] = filterBy.likedByUserId;
    }
    return criteria
}


function _buildSortCriteria(filterBy) {
    const sortCriteria = {}
    if (filterBy.sortBy) {
        // MongoDB sort criteria: 1 for ascending, -1 for descending
        switch (filterBy.sortBy) {
            case 'title':
                sortCriteria.title = 1
                break;
            case 'severity':
                sortCriteria.severity = 1
                break;
            case 'createdAt':
                sortCriteria._id = -1
                break
        }
    }
    console.log(sortCriteria)
    return sortCriteria
}

