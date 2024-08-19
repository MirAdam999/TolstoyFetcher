const app = require('../index.js');
const request = require('supertest');
const express = require('express');


describe('POST /fetch_metadata', () => {

    //Passed
    it('should return 400 if urls is not an array', async () => {
        const response = await request(app)
            .post('/fetch_metadata')
            .send({ urls: 'paka-paka-paka-not-a-list' });
        expect(response.status).toBe(400);
        expect(response.body.global_error).toBe('Please provide a valid list of URLs.');
    });

    //Passed
    it('should return 400 if urls array is empty', async () => {
        const response = await request(app)
            .post('/fetch_metadata')
            .send({ urls: [] });
        expect(response.status).toBe(400);
        expect(response.body.global_error).toBe('Please provide a valid list of URLs.');
    });

    //Passed
    it('should return 400 if urls array has more than 10 URLs', async () => {
        const urls = [
            [0, "https://example.com"],
            [1, "https://example.com"],
            [2, "https://example.com"],
            [3, "https://example.com"],
            [4, "https://example.com"],
            [5, "https://example.com"],
            [6, "https://example.com"],
            [7, "https://example.com"],
            [8, "https://example.com"],
            [9, "https://example.com"],
            [10, "https://example.com"]
        ]

        const response = await request(app)
            .post('/fetch_metadata')
            .send({ urls });
        expect(response.status).toBe(400);
        expect(response.body.global_error).toBe('Up to 10 URLs per submittion please.');
    });

    //Passed
    it('should return 400 if any url array is not an array of length 2', async () => {
        const urls = [
            [0, 'http://example.com'],
            [1],
        ];
        const response = await request(app)
            .post('/fetch_metadata')
            .send({ urls });
        expect(response.status).toBe(400);
        expect(response.body.global_error).toBe('Invalid URL list.');
    });

    //Passed
    it('should return metadata + 200 for valid URLs', async () => {
        const urls = [
            [0, 'https://example.com']
        ];
        const response = await request(app)
            .post('/fetch_metadata')
            .send({ urls });
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body[0]).toHaveProperty('url', 'https://example.com');
        expect(response.body[0]).toHaveProperty('title');
        expect(response.body[0]).toHaveProperty('description');
        expect(response.body[0]).toHaveProperty('image');
    });
});