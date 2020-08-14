# This application is for handling order of delivery

## Sart Applicationn for Development

* to start built application, run `./start.sh`.
* for local development run `./start.sh -d`

## APIs

* You can go to [swagger](http://localhost:8080/swagger) for API testings
* @Get /orders/orders?page=:page&limit=:limit => order by createdDate in descending order
* for validation error, one extra field info will be added for showing actual validation issue

```json
{
  "error": "VALIDATION_ERROR",
  "info": [
    {
      "field": "origin",
      "violations": {
        "LatLongConstraint": "Coordiante format incorrect"
      }
    },
    {
      "field": "destination",
      "violations": {
        "LatLongConstraint": "Coordiante format incorrect",
        "arrayMinSize": "destination must contain at least 2 elements"
      }
    }
  ]
}
```

## Google API key

To use google api, put the api key to environemtn variable `MAP_SERVICE_KEY`, like
`MAP_SERVICE_KEY=YOUR_GOOGLE_API_KEY`

## Unit Testing

* run unit test using command `npm run test`
* unit tests will be focus on orderService
* controller service basically just call orderService, will only test happy flow

## End to End testing

* to run e2e test, make make sure you have start the application
* use `docker exec -it order-service-dev npm run test:e2e` (when using `./start.sh -d`)
or `docker exec -it order-service npm run test:e2e` (when using `./start.sh`)

// TODO

## Special notes for development

when you start the application using `./start.sh -d`, you can get the change
reflected automatically. But you may see some message like `[Note] Aborted connection XX to db`,
it is the order service try to reconnect to mysql-service, please wait for a moment.
