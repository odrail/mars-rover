# Mars Rover

Questo progetto è un'implementazione di Mars Rover scritto in NodeJS. L'applicazione esporta 3 API:

- /init per la configurazione del pianeta Marte e inizializzare il rover nella sua posizione iniziale
- /run per inviare comandi al rover e spostarlo dalla sua posizione iniziale
- /api-docs per visualizzare la documentazione delle prime due API

## Prerequisiti

È necessario avere NodeJS > 18 installato sul proprio sistema operativo

## Installazione

Clona il repo in locale
```
git clone https://github.com/odrail/mars-rover.git
```

Installa le dipendenze
```
npm install
```

## Test

```
npm test
```

## Dev

In fase di sviluppo, avviare il progetto con supporto al live reload

```
npm run dev
```

## Avvio
L'applicazione si avvia con

```
npm start
```

e sarà in ascolto alla porta stampata a video.

## API DOCS

Le api sono documentate con OpenAPI/Swagger. Una volta avviata l'applicazione, aprire il browser all'indirizzo

```
http://localhost:3001/api-docs
```