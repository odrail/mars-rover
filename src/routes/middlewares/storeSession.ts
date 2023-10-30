import { NextFunction, Request, Response } from 'express'

export default (req: Request, res: Response, next: NextFunction) => {
    const body = req.body
    req.session.data = body
    next()
}