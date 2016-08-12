# event-org

This project was generated with the [Angular Full-Stack Generator](https://github.com/DaftMonk/generator-angular-fullstack) version 3.7.3.

## Getting Started

### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js and npm](nodejs.org) Node ^4.2.3, npm ^2.14.7
- [Bower](bower.io) (`npm install --global bower`)
- [Ruby](https://www.ruby-lang.org) and then `gem install sass`
- [Gulp](http://gulpjs.com/) (`npm install --global gulp`)
- [MongoDB](https://www.mongodb.org/) - Keep a running daemon with `mongod`


### Running OSRM-backend

OSRM-backend is a routing engine ([Map Matching](https://www.mapbox.com/blog/map-matching/)) that maps GPS coordinates to roads.

1. Clone osrm-backend from [git osrm-backend](https://github.com/Project-OSRM/osrm-backend.git)
2. Build and install osrm-backend
  - [Ubuntu - Prerequisites](https://github.com/Project-OSRM/osrm-backend/wiki/Building-on-Ubuntu)
  - [Ubuntu - Build](https://github.com/Project-OSRM/osrm-backend#quick-start)
3. Run osrm-backend
  - Download maps from [Geofabrik](http://download.geofabrik.de/index.html)
  - For Romania [Maps .pbf romania](http://download.geofabrik.de/europe/romania.html)
  - After install `osrm-extract`, `osrm-contract` and `osrm-routed` should be available globally
  - The profiles are situated in the mainOSRM-backend/profiles - car/bike/foot
  - `$ osrm-extract data.osm.pbf -p profiles/car.lua`
  - `$ osrm-contract data.osrm`
  - `$ osrm-routed data.osrm`
  - The server will run on localhost:5000 - [API documentation](https://github.com/Project-OSRM/osrm-backend/blob/master/docs/http.md)

4. osrm.js - client library for OSRM-backend [OSRM.js](https://github.com/Project-OSRM/osrm.js)
  - Note: Latest version of osrm.js (5.0.0-rc-2) is beta and is not yet available via npm.

### Developing

1. Run `npm install` to install server dependencies.

2. Run `bower install` to install front-end dependencies.

3. Run `mongod` in a separate shell to keep an instance of the MongoDB Daemon running

4. Run `gulp serve` to start the development server. It should automatically open the client in your browser when ready.

## Build & development

Run `gulp build` for building and `gulp serve` for preview.

## Testing

Running `npm test` will run the unit tests with karma.

Running `gulp test` will run the client and server unit tests with karma and mocha.

Use grunt test:server to only run server tests.

Use grunt test:client to only run client tests.

### Protractor tests

To setup protractor e2e tests, you must first run

`npm run update-webdriver`

Use gulp test:e2e to have protractor go through tests located in the e2e folder.

### Code Coverage

Use gulp test:coverage to run mocha-istanbul and generate code coverage reports.

coverage/server will be populated with e2e and unit folders containing the lcov reports.

The coverage taget has 3 available options:

test:coverage:unit generate server unit test coverage
test:coverage:e2e generate server e2e test coverage
test:coverage:check combine the coverage reports and check against predefined thresholds

when no option is given test:coverage runs all options in the above order

### Debugging

Use grunt serve:debug for a more debugging-friendly environment.

## Adding new bower component

Run `bower install --save new_dependency`
Run `gulp build` to add the library into index.html


## Generators

Available generators:

* App
    - [angular-fullstack]
* Server Side
    - [angular-fullstack:endpoint](https://github.com/angular-fullstack/generator-angular-fullstack/blob/master/docs/generators/endpoint.md)
* Client Side
    - [angular-fullstack:route](https://github.com/angular-fullstack/generator-angular-fullstack/blob/master/docs/generators/route.md)
    - [angular-fullstack:controller](https://github.com/angular-fullstack/generator-angular-fullstack/blob/master/docs/generators/controller.md)
    - [angular-fullstack:filter](https://github.com/angular-fullstack/generator-angular-fullstack/blob/master/docs/generators/filter.md)
    - [angular-fullstack:directive](https://github.com/angular-fullstack/generator-angular-fullstack/blob/master/docs/generators/directive.md)
    - [angular-fullstack:service](https://github.com/angular-fullstack/generator-angular-fullstack/blob/master/docs/generators/service.md)
    - [angular-fullstack:provider](https://github.com/angular-fullstack/generator-angular-fullstack/blob/master/docs/generators/service.md)
    - [angular-fullstack:factory](https://github.com/angular-fullstack/generator-angular-fullstack/blob/master/docs/generators/service.md)
    - [angular-fullstack:decorator](https://github.com/angular-fullstack/generator-angular-fullstack/blob/master/docs/generators/decorator.md)
* Deployment
    - [angular-fullstack:openshift](https://github.com/angular-fullstack/generator-angular-fullstack/blob/master/docs/generators/openshift.md)
    - [angular-fullstack:heroku](https://github.com/angular-fullstack/generator-angular-fullstack/blob/master/docs/generators/heroku.md)


## Angular Translate

https://angular-translate.github.io/ - with staticFilesLoader

Static files location : /components/translate/locale-language.json
Default language: en

Language dropdown - navbar.controller.js
this.languages = ['en', 'ro'];

To add more languages add a static file in /components/translate and a new language in the language object from navbar

### Make a translation

locale-language.json -
{
  "TRANSLATION_ID": "This is a concrete translation for a specific language."
}

In a html file {{'TRANSLATION_ID' | translate}}

### Running the location generator script

Location of the script server/scripts/generate.js
The server should be running, a client should be open in the tracks tab, the list of locations should increase when running the script


### HTTP Requests to add a Location to a Track

* Creare track:

Method: POST

URL : http://localhost:9000/api/tracks

Headers: 
     Content-Type : application/json
     
Body: raw
{
    "trackName" : "Ana are mere",
    "trackInfo" : "Track ana are mere",
    "public" : true,
    "users" : [
        {
            "username" : "user1",
            "userId" : 100
        },
        {
            "username" : "user2",
            "userId" : 200
        },
        {
            "username" : "user3",
            "userId" : 300
        }],
    "ownerName" : "user1",
    "ownerId" : 100
}


* Send Location

Method: PUT

URL : http://localhost:9000/api/locations/:trackId/:userId

Headers: 
     Content-Type : application/json
     
Body: raw
{
    "lat" : 26.06526,
    "long" : 44.42038,
    "time" : "2016-06-30T15:35:46.750Z",
    "username" : "user1"
}
