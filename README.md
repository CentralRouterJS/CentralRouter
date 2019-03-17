<p align="center">
    <img src="https://github.com/CentralRouterJS/CentralRouter/blob/master/public/logo.png">
</p>

<p align="center">
    <img src="https://img.shields.io/travis/CentralRouterJS/CentralRouter.svg" />
    <img src="https://badges.frapsoft.com/os/v2/open-source.png?v=103" />
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" />
    <img src="https://img.shields.io/github/package-json/v/CentralRouterJS/CentralRouter.svg" />
    <img src="https://img.shields.io/github/license/CentralRouterJS/CentralRouter.svg?color=green" />
    <a href="https://trello.com/b/fp6jPIC9/centralrouter-roadmap"><img src="https://img.shields.io/badge/Trello-ideas-blue.svg"/></a>
</p>

Fast, modern Data Delivery Network built on top of [NodeJS](http://nodejs.org). 
CentralRouter is a learning project for me, based on a simple idea to access data from private
networks securely, without even opening a port for the service.

Feel free to join the community or share your ideas/suggestions, by using the links below.

## Docs & Community

* [Website and Documentation](https://centralrouter.github.io/)
* [Trello](https://trello.com/b/fp6jPIC9/centralrouter-roadmap)
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
