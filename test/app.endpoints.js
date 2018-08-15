const express = require('express');
const request = require('supertest');

describe('app', () => {
    describe('.express:', () => {
        it('Should start Express instance', (done) => {
            const app = express();

            if(app) done();
        });
    });

    describe('.endpoints:', () => {
        it('Should get welcome page', (done) => {
            const app = express();

            app.get('/', function( req, res ) {
                res.send('Welcome to CentralRouter!');
            });

            request(app)
                .get('/')
                .expect('Welcome to CentralRouter!', done);
        });
    });
});