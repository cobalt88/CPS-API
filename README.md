# CPS-API

<img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E"> &nbsp;
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"> &nbsp;
<img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white"> &nbsp;
<img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white"> &nbsp;

## Table of Contents

- [Description](#overall-description)
- [Installation Instructions](#installation-instructions)
- [How To Use](#instructions/how-to-use)
- [Contribution](#contribution-guidelines)
- [Tests](#application-tests)
- [About The Author](#about-the-author)

## Description

This is a demo API built to demonstrate a bare bones REST API using Node.js, Express.js, Mongoose ODM, and MongoDB. It is a simple API that allows you to query a database of US cities and their populations. Presently this is not hosted anywhere as it using static data from a Mongo database that is not updated regularly, however you can run it locally or use it as a template for your own API.

This application also leverages the built in node OS and Cluster Modules for automatic load balancing. The server will automatically detect how many processing cores on the host machine and spawn 1 Primary node followed by 1 worker node for each additional core up to a maximum of 10. If youd like to use more or less than 10 instances you can change the value of this line of code found in the server.js

```javascript
const numCPUs = nodeOs.cpus().length > 10 ? 10 : nodeOs.cpus().length;
```

The above ternary operator will set the number of instances to 10 if the host machine has more than cpu 10 cores (a hyperthreaded core counts as 2), otherwise it will set the number of instances to the number of cores on the host machine.

The combination of a clustered Node API and an efficiently indexed MongoDB database makes for a very fast and efficient API that can handle an insane amount of traffic without running into the potential bottleneck of exceeding the call queue. Keep in mind however that the reason this is limited to 10 instances is because more than that has the ability to exceed the throughput of a MongoDB M0 and M10 Cluster. In local testing at the time of building the average response time for a request was under 100ms with the accetopn of the POST route wich was closer to 150ms on average due it needing to perform a more complex opteration of finding an object, then compairing it to the data in the request body before updating the object in the database.

## Installation Instructions

Setup will run a script to create local log files

```
$ npm run setup
```

npm install will install all dependencies (the few there are)

```
$ npm install
```

npm start will start the server on port 5555, alternatively you can use npm run dev if you have nodemon installed.

```
$ npm start
```

## How To Use

First and foremost you will need to have a .env file in the root directory of the application with the following variables:

```
USER="cps-api-local"
PASSWORD="obrbV3BGomtjwNJ2"
CLUSTER="cluster0.abmx1vn.mongodb.net"
```

I dont mind sharing the above information since that cluster is isolated and only contains one collection of data that is not updated regularly. If you want to use this application for your own purposes you will need to create your own cluster and database and update the .env file accordingly.

The original dataset was obtained from [here](https://github.com/Trazi-Ventures/sample-data-interview/blob/main/city_populations.csv) and was then imported into a MongoDB database using MongoDB Compass after being cleaned up and normalized. The data is stored in a collection called "cities" and has the following schema:

```json
{
	"_id": {
		"$oid": "60f3b0c9a2e7c3b4a8f7b7b5"
	},
	"City": "New York",
	"State": "New York",
	"Population": 8398748
}
```

Once the local version is up and running you can use the following route to access the data in GET POST PUT and DELETE requests.

```
 http://127.0.0.1:5555/api/population/state/:state/city/:city
```

example request:

```
http://127.0.0.1:5555/api/population/state/new%20york/city/new%20york
```

example request body:

```json
{
	"population": 8398748
}
```

for GET and DELETE requests only the city and state are required, for POST and PUT requests you must also include the population in the body of the request.

```
{
    "population": 123456
}
```

There is a built in logging feature for both system events and error events that will log to a file in the logs folder. A typical event will appear as follows:

```
2023-07-18 11:35:33 Server initiated, running on port 5555
```

timestamp of the event, where the event originated from, and the event or error itself.

It is advisable to turn diable the system logger functions in production as it will log every request to the server, which can be a lot of data depenfing on the traffic to your application.

## Contribution Guidelines

Contributors are welcome, just keep a few things in mind:

1. All contributions are to be made in a separate branch off develop or in an independent fork. Do not attempt to contribute to develop or main directly, it will be denied.

2. All contributions are subject to peer review, so please keep your code clean and readable, feel free to comment as much as you like, however most of those comments will likely be removed in the final version if your contributions are merged. Your code should speak for itself wherever possible.

3. If there is an open issue that is not assigned, that means it is available to be worked on, so take your pick.

4. don't forget to have fun. If you love what you do, its not work.

## Application Tests

none currenly as this application only has 4 routes. But there is built in persistent logging for system events and errors.

## About The Author

I hope you enjoy the application, if you have any questions, comments, concerns, feedback, ect,
please feel free to open a new issue or reach out directly. Don't forget to check out some of my other projects on github while your here!

- Email: [vincent@vtportfolio.net](vincent@vtportfolio.net)
- GitHub: [cobalt88](https://github.com/cobalt88)
