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
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               map:
 *                 type: object
 *                 properties:
 *                   lats:
 *                     type: number
 *                   longs:
 *                     type: number
 *                   obstacles:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         lat:
 *                           type: number
 *                         long:
 *                           type: number
 *               initialPosition:
 *                 type: object
 *                 properties:
 *                   lat:
 *                     type: number
 *                   long:
 *                     type: number
 *                   direction:
 *                     type: string
 *                     enum: [N, E, S, W]
 *       required: true             
 *     responses:
 *       200:
 *         description: Return an empty object.
 *       400:
 *         description: Return an error object when body is not valid
 */
router.post('/',
    validateInitBody,
    storeSession,
    sendResponse
    )

export default router