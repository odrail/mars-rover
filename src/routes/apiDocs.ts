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
            description: 'Questa è un\'implementazione del rover sviluppata da Emanuele Liardo per conto di CodicePlastico'
        },
        tags: [
            {
                name: 'init',
                description: 'Tutto ciò che riguarda l\'inizializzazione del tuo rover'
            }
        ]
    },
    apis: ['./src/routes/*.ts'], // files containing annotations as above
});

router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerSpec));

export default router