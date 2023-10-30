import { Request, Response, NextFunction } from 'express'
import engine from '../../lib/engine'

export default (req: Request, res: Response, next: NextFunction) => {
    const { data: sessionData } = req.session
    if (sessionData) {
        const result = engine(sessionData.map, sessionData.initialPosition, req.body.commands)
        res.locals = result
        next()
    }
}