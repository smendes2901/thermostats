# THERMOSTAT

Thermostat is a scalable web utility built using Node Express, React and MongoDb.
The purpose is to view the thermometer readings from a local directory and upload them onto mongo.

Installation instructions for this app are as follow:

* Git clone 
* cd into the folder and run `npm install`.
* place THERM0001.json in the data folder.
* run`npm run dev` in your terminal and wait for the webpage to bootup

Once the webite boots up you can choose to register as a new user or login using an existing credentials.
email: temp@temp.com
password:temp@123

The mongo server used for this project 

On login you can browse the files present in the data directory.
Select the THERM0001.json file and the graph of 2015 for the same can be viewer.
The graph is zoomable by drawing a box around the desired area.
Once the graph is analysed the readings can be uploaded to mongo.

To use the mongo shell kindly run the following command on terminal:
`mongo "mongodb+srv://cluster0-hisfi.mongodb.net/test" --username temp`
Incase prompted for password use the above credentials.

There are two databases:
* thermostats: Used to keep user infromation including alert logs
* tables: Used to store data from json
