import { ErrorRequestHandler, Request, Response } from "express"

export default () => (err: ErrorRequestHandler, req: Request, res: Response) => {
    console.error(err)
    res.status(500).send('Something broke!')
  }