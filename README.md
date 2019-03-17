[![CentralRouter Logo](https://i.ibb.co/zmV5k3K/68747470733a2f2f696d6167652e6962622e636f2f6d534b50337a2f63656e7472616c726f757465725f6272616e64696e675f6c6f676f2e706e67.png)](https://centralrouter.github.io/)

<p align="center">
    [![Build Status](https://travis-ci.org/CentralRouterJS/CentralRouter.svg?branch=master)](https://travis-ci.org/CentralRouterJS/CentralRouter)
    <img src="https://badges.frapsoft.com/os/v2/open-source.png?v=103" />
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" />
    <img src="https://img.shields.io/github/package-json/v/CentralRouterJS/CentralRouter.svg" />
    <img src="https://img.shields.io/github/license/CentralRouterJS/CentralRouter.svg?color=green" />
    [Trello board](https://trello.com/b/fp6jPIC9/centralrouter-roadmap)
</p>

Fast, modern Data Delivery Network built on top of [NodeJS](http://nodejs.org). 
CentralRouter is a learning project for me, based on a simple idea to access data from private
networks securely, without even opening a port for the service.

Feel free to join the community, using the links below.

## Docs & Community

* [Website and Documentation](https://centralrouter.github.io/)
* [Discord](https://discord.gg/n9yFj2F)

## Getting started

By following these steps, you will be running your own CentralRouter instance 
based on your preferences.

 * Install [NodeJS](https://nodejs.org/)
 * Install [MongoDB](https://www.mongodb.com/)
 * Install [Redis](https://redis.io/)
 
 * Install dependencies:
    ```bash
    $ npm install
    ```

* Start your CentralRouter instance:
    ```bash
    $ node index.js
    ```

* Alternative way is docker-compose:
    ```bash
    $ docker-compose up
    ```

## Interfaces

CentralRouter is integrating with various protocols, which is called "interfaces".
By default, all of the interfaces are disabled for security reasons.

Interfaces currently implemented:

| Name | Port | Description |
| ---- | ---- | ----------- |
| HTTP |  80  | Major HTTP methods are implemented. |

## Configuration

CentralRouter configuration is relies on dotenv, so all of the variables can be found
inside the .env file in the root directory.

Important variables with their descriptions:

| Name | Description |
| ---- | ----------- |
| APP_NAME | Sets the instance's webserver name. |
| APP_API_PREFIX | Sets the REST API prefix for the web-interface. |
| WSS_NAME | Sets the instance's wss name. |
| INTERFACES_ENABLED | Configures the enabled services on your instance. Seperate each by a comma. |
| PUBLISH_ON_MASTER | By default, all CentralRouter instances showing up on the public serverlist. |

## Testing

Testing is done using [mocha](https://mochajs.org/):

```bash
$ mocha test
```

## Contributors

* [Milan Zeisler](https://github.com/LeFizzy/)

We're always happy to review and accept issues/PR's.
Feel free to share your ideas in our Discord server, or either via the TrelloBoard.

## License

Copyright (c) 2019 Milan Zeisler. See the [License](LICENSE) file for license rights and limitations. This project is licensed under the terms of the GPL-3.0 license.
