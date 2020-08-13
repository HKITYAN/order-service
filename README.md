# This application is for handling order of delivery

## Sart Applicationn for Development

* to start built application, run `./start.sh`.
* for local development run `./start.sh -d`

## Swagger for API testing

You can go to [swagger](http://localhost:8080/swagger) for API testings

## Google API key

To use google api, put the api key to environemtn variable `MAP_SERVICE_KEY`, like
`MAP_SERVICE_KEY=YOUR_GOOGLE_API_KEY`

## Special notes for development

when you start the application using `./start.sh -d`, you can get the change
reflected automatically. But you may see some message like `[Note] Aborted connection 43 to db`,
it is the order service try to reconnect to mysql-service, please wait for a moment.
