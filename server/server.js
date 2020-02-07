const express = require('express');
const path = require('path');
const axios = require('axios');
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(express.json());


app.get(/icons/, function(req, res) {
    res.redirect('http://localhost:3001'+req.url);
})

app.get('/restaurants', function(req, res) {
    axios.get('http://localhost:3001/restaurants')
        .then((response) => {
            res.end(JSON.stringify(response.data))
        })
        .catch((err) => {
            res.end(err);
        })
    // res.redirect('http://localhost:3001/restaurants');
})

app.get('/api/reservations', function(req, res) {
    axios.get('http://localhost:3002/api/reservations')
        .then((response) => {
            res.end(response.data)
        })
        .catch((err) => {
            res.end(err);
        })
})

app.listen(PORT, () => console.log('Listening on port: ' + PORT));
