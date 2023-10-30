import express, { Request, Response } from 'express'
import validateSession from './middlewares/validateSession'
import validateCommandBody from './middlewares/validateCommandBody'
import moveRover from './middlewares/moveRover'
import sendResponse from './middlewares/sendResponse'
const router = express.Router()

router.post('/',
    validateSession,
    validateCommandBody,
    moveRover,
    sendResponse
)

export default router