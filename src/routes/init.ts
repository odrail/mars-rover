import express, { Request, Response } from 'express'
import validateInitBody from './middlewares/validateInitBody'
import storeSession from './middlewares/storeSession'
import sendResponse from './middlewares/sendResponse'
const router = express.Router()


/**
 * @openapi
 * /init:
 *   post:
 *     tags:
 *        - init
 *     description: Configura il pianeta marte impostando il numero di latitudini e longitudini e la posizione iniziale del tuo rover
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.post('/',
    validateInitBody,
    storeSession,
    sendResponse
    )

export default router