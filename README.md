# THERMOSTAT

Thermostat is a scalable web utility built using Node Express, React and MongoDb.
The purpose is to view the thermometer readings from a local directory and upload them onto mongo.


Note: Kindly ensure there is a stable internet connection before proceeding

Installation instructions for this app are as follow:

* Git clone 
* cd into the folder and run `npm install`.
* unzip the file THERM0001.7z and place the contents in the data folder.
* run`npm run dev` in your terminal and wait for the webpage to bootup


Once the webite boots up you can choose to register as a new user or login using an existing credentials.  
email: temp@temp.com  
password:temp@123  

mongo server url: `https://cloud.mongodb.com/v2/5da8bf32f2a30b8797db909f#clusters`  
username: smendes2901@gmail.com  
password: Shaun@2901  
Project Name: Thermostats

On login you can browse the files present in the data directory.  
Select the THERM0001.json file and the graph of 2015 for the same can be viewed.  
The graph is zoomable by drawing a box around the desired area.  
Once the graph is analysed the readings can be uploaded to mongo.  
Once the upload the user will receive a notification.  

There are two databases:_
* thermostats: Used to keep user infromation including alert logs.
* tables: Used to store data from json.  
