import express from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'
const router = express.Router()
const swaggerSpec = swaggerJsdoc({
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Mars Rover API',
            version: '1.0.0',
            description: 'Questa è un\'implementazione di Mars Rover sviluppata da Emanuele Liardo per conto di Codiceplastico'
        },
        tags: [
            {
                name: 'init',
                description: 'Tutto ciò che riguarda l\'inizializzazione del tuo rover'
            },
            {
                name: 'run',
                description: 'Dopo aver inizializzato Marte e il tuo rover, invia i comandi per comandarlo'
            }
        ]
    },
    apis: ['./src/routes/*.ts'], // files containing annotations as above
});

router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerSpec));

export default router