'use strict';

const express = require('express');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public/views'));

app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/public/css/'));

app.get('/', (req, res) => {
    res.render('hurdle');
});

app.listen(8080, () => {
    console.log("Server up and running...");
});