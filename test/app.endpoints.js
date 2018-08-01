const express = require('express');
const request = require('supertest');

describe('app', () => {
    describe('.endpoints', () => {
        it('Should get welcome page: ', (done) => {
            var app = express();

            app.get('/', function( req, res ) {
                res.send('Welcome to CentralRouter!');
            });

            request(app)
                .get('/')
                .expect('Welcome to CentralRouter!', done);
        });
    });
});