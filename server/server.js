const newrelic = require('newrelic');
const express = require('express');
const path = require('path');
const axios = require('axios');
const morgan = require('morgan');
const app = express();
const PORT = 3001;

app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(express.json());
app.use(morgan('dev'));

app.get(`/restaurant/:restaurantId/reviews`, function(req, res) {
    const id = req.params.restaurantId;
    axios.get(`http://localhost:3007/restaurant/${id}/reviews`)
        .then((response) => {
            res.send(response.data);
            res.end();
        })
        .catch((err) => {
            res.end(err);
        })
})

app.post(`/restaurant/:restaurantId/user/:userId/review`, function(req, res) {
    const { restaurantId, userId } = req.params;
    const review = req.body;
    axios.post(`http://localhost:3007/restaurant/${restaurantId}/user/${userId}/review`, review)
        .then(function (response) {
            res.status(201);
            res.end();
        })
        .catch((err) => {
            res.end(err);
        })
})

app.get(/icons/, function(req, res) {
    axios.get("http://localhost:3001"+req.url)
        .then((response) => {
            res.setHeader("content-type", "image/svg+xml")
            res.end(response.data)
        })
        .catch((err) => {
            res.end(err);
        })
})

app.get('/restaurants', function(req, res) {
    axios.get('http://localhost:3001/restaurants')
        .then((response) => {
            res.end(JSON.stringify(response.data))
        })
        .catch((err) => {
            res.end(err);
        })
})

app.get('/reservations', function(req, res) {
    axios.get('http://localhost:3002/reservations')
        .then((response) => {
            res.end(JSON.stringify(response.data))
        })
        .catch((err) => {
            res.end(err);
        })
})

app.get('/images', function(req, res) {
    axios.get('http://localhost:3003/images')
        .then((response) => {
            res.end(JSON.stringify(response.data))
        })
        .catch((err) => {
            res.end(err);
        })
})

app.get('/popular-dishes-bundle.js', function(req, res) {
    axios.get('https://popular-dishes.s3-us-west-1.amazonaws.com/remi/bundle.js')
        .then((response) => {
            res.end(response.data);
        })
        .catch((err) => {
            res.end(err);
    })
})

app.get('/gallery-bundle.js', function(req, res) {
    axios.get('https://popular-dishes.s3-us-west-1.amazonaws.com/cole/bundle.js')
        .then((response) => {
            res.end(response.data);
        })
        .catch((err) => {
            res.end(err);
    })
})

app.get('/reservations-bundle.js', function(req, res) {
    axios.get('https://popular-dishes.s3-us-west-1.amazonaws.com/zach/bundle.js')
        .then((response) => {
            res.end(response.data);
        })
        .catch((err) => {
            res.end(err);
    })
})


app.listen(PORT, () => console.log('Listening on port: ' + PORT));
