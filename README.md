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

This is a demo API build to demonstrate a bare bones REST API using Node.js, Express.js, Mongoose ODM, and MongoDB. It is a simple API that allows you to query a database of US cities and their populations. Presently the api i not hosted anywhere as it using static data from a mongo database that is not updated regularly.

## Installation Instructions

```
$ npm run setup
```

```
$ npm install
```

```
$ npm start
```

## How To Use

Once the local version is up and running you can use the following route to access the data in GET POST PUT and DELETE requests.

```
 http://127.0.0.1:5555/api/population/state/:state/city/:city
```

for GET and DELETE requests only the city and state are required, for POST and PUT requests you must also include the population in the body of the request.

```
{
    "population": 123456
}
```

## Contribution Guidelines

Contributors are welcome, just keep a few things in mind:

1. All contributions are to be made in a separate branch off develop or in an independent fork. Do not attempt to contribute to develop or main directly, it will be denied.

2. All contributions are subject to peer review, so please keep your code clean and readable, feel free to comment as much as you like, however most of those comments will likely be removed in the final version if your contributions are merged. Your code should speak for itself wherever possible.

3. If there is an open issue that is not assigned, that means it is available to be worked on, so take your pick.

4. don't forget to have fun. If you love what you do, its not work.

## Application Tests

none currenly as this application only has 4 routes.

## About The Author

I hope you enjoy the application, if you have any questions, comments, concerns, feedback, ect,
please feel free to open a new issue or reach out directly. Don't forget to check out some of my other projects on github while your here!

- Email: [vincent@vtportfolio.net](vincent@vtportfolio.net)
- GitHub: [cobalt88](https://github.com/cobalt88)
