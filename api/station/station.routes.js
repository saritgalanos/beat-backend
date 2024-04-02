import express  from "express"
//import { addBug, getBug, getBugs, removeBug, updateBug } from "./bug.controller.js"
import { requireUser } from "../../middlewares/requireAuth.middleware.js"
import { getStations , getStation, removeStation, addStation, updateStation} from "./station.controller.js"
//import { requireUser } from '../../middlewares/requireAuth.middleware.js'
// import { requireAuth } from '../../middlewares/requireAuth.middleware.js'


const router = express.Router()


router.get('/', getStations)
router.get('/:stationId', getStation)
router.delete('/:stationId', requireUser, removeStation) 
router.post('/', requireUser, addStation)
router.put('/', requireUser, updateStation)

export const stationRoutes = router
