# THERMOSTAT

Thermostat is a scalable web utility built using Node Express, React and MongoDb.
The purpose is to view the thermometer readings from a local directory and upload them onto mongo.

Installation instructions for this app are as follow:

* Git clone 
* cd into the folder and run `npm install`.
* unzip the file      and place the contents in the data folder.
* run`npm run dev` in your terminal and wait for the webpage to bootup

Once the webite boots up you can choose to register as a new user or login using an existing credentials._
email: temp@temp.com_
password:temp@123_

mongo server url: `https://cloud.mongodb.com/v2/5da8bf32f2a30b8797db909f#clusters`_
username: smendes2901@gmail.com_
password: Shaun@2901_

On login you can browse the files present in the data directory._
Select the THERM0001.json file and the graph of 2015 for the same can be viewer._
The graph is zoomable by drawing a box around the desired area._
Once the graph is analysed the readings can be uploaded to mongo._

There are two databases:_
* thermostats: Used to keep user infromation including alert logs
* tables: Used to store data from json
