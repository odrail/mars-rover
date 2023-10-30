import express, { Request, Response, Application, NextFunction } from 'express'
import session from 'express-session'
import bodyParser from 'body-parser'
import { errors as celebrateErrors } from 'celebrate';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import initRoute from './routes/init'
import commandRoute from './routes/command'
import apiDocsRoute from './routes/apiDocs'

const app: Application = express()

app.use(helmet());
app.use(bodyParser.json())
app.use(session({
    secret: 'CodicePlastico',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false
    },
    name: 'rover-mars'
}))
app.use(morgan('combined', { skip: () => process.env.NODE_ENV === 'test' }));
app.use(compression());

app.use('/init', initRoute)
app.use('/command', commandRoute)
app.use('/api-docs', apiDocsRoute)

app.use(celebrateErrors())
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })

export default app
