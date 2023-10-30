import { Request, Response, NextFunction } from 'express'
import { MarsMap, Position } from '../../lib/engine';
import session from 'express-session';

// import session from 'express-session';



declare module 'express-session' {
    export interface SessionData {
        data: {
            map: MarsMap
            initialPosition: Position
        };
    }
}

export default (req: Request, res: Response, next: NextFunction) => {
    const { data: sessionData } = req.session
    if (!sessionData) {
        res.sendStatus(403)
    } else {
        next()
    }
}