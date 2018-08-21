const express = require('express');
const request = require('supertest');

describe('app', () => {
    describe('.endpoints:', () => {
        it('Should get welcome page', (done) => {
            const app = express();

            app.get('/', function( req, res ) {
                res.send('index.html');
            });

            request(app)
                .get('/')
                .expect(200, done);
        });
    });
});