import express, { Request, Response } from 'express'
import validateSession from './middlewares/validateSession'
import validateCommandBody from './middlewares/validateCommandBody'
import moveRover from './middlewares/moveRover'
import sendResponse from './middlewares/sendResponse'
const router = express.Router()

/**
 * @openapi
 * /run:
 *   post:
 *     tags:
 *        - run
 *     description: Invia comandi per pilotare il tuo rover
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               commands:
 *                 type: array
 *                 description: asdf
 *                 items:
 *                   type: string
 *       required: true             
 *     responses:
 *       200:
 *         description: Return an empty object.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 currentPosition:
 *                   type: object
 *                   properties:
 *                     lat:
 *                       type: number
 *                     long:
 *                       type: number
 *                     direction:
 *                       type: string
 *                 obstacleDetected:
 *                   type: boolean
 *                 obstaclePosition:
 *                   type: object
 *                   properties:
 *                     lat:
 *                       type: number
 *                     long:
 *                       type: number
 *       400:
 *         description: Return an error object when body is not valid
 *       403:
 *         description: Return this error when there is no session. Call first POST /init
 */
router.post('/',
    validateSession,
    validateCommandBody,
    moveRover,
    sendResponse
)

export default router