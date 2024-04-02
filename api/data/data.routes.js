import express  from "express"
import { getSpotifyData } from "./data.controller.js"



const router = express.Router()

router.get('/', getSpotifyData)

export const dataRoutes = router
