[![CentralRouter Logo](https://image.ibb.co/mSKP3z/centralrouter_branding_logo.png)](https://centralrouter.github.io/)
[![Build Status](https://travis-ci.org/CentralRouterJS/CentralRouter.svg?branch=master)](https://travis-ci.org/CentralRouterJS/CentralRouter) [Trello board](https://trello.com/b/fp6jPIC9/centralrouter-roadmap)

Fast, modern Data Delivery Network built on top of [NodeJS](http://nodejs.org).

## Running with Docker
```bash
$ docker-compose up
```

## Running with NodeJS
Requirements:
- MongoDB 
- Redis

Firstly, you must edit the environment (.env) file by removing "mongo" from/after DATABASE_HOST,
then "redis" from/after REDIS_HOST variable.
Secondly, let's spin the application up like below:

```bash
$ npm install
```
```bash
$ node index.js
```
## About the project

Maybe you got the question: what is CentralRouter?

It's a learning project for me, and I'd like to discover more-and-more features from NodeJS.
While I'm building this, I'm going to work around a DDN which stands for "Data Delivery Network" 
based on a personal idea to access data from private networks without opening a port for a service, 
touching a firewall.  

Feel free to join the project community using the links below.

## Docs & Community

* [Website and Documentation](https://centralrouter.github.io/)
* [Discord](https://discord.gg/n9yFj2F)

## Interfaces

CentralRouter is integrating with various protocols, which is called "interfaces".
By default, all of the interfaces are disabled for security reasons.

Interfaces currently implemented:

| Name | Port | Description |
| ---- | ---- | ----------- |
| HTTP |  80  | HTTP methods are served. |

## Testing

Testing is done using [mocha](https://mochajs.org/):

```bash
$ mocha test
```

## License

[GPL-3.0](LICENSE)
