'use strict';

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const checkWord = require('check-word');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/public/css/'));

const words = checkWord('en');
const todaysWord = "light";

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/views/hurdle.html'));
});

app.post('/checkAnswer', (req, res) => {
    const word = req.body;
    const resData = {};
    console.log(words.check(word.word));

    if (!words.check(word.word)) {
        console.log("inside");
        res.sendStatus(400);
    } else {
        if (todaysWord[0] === word.word[0]) {
            resData.l0 = 2;
        } else if (todaysWord.includes(word.word[0])) {
            resData.l0 = 1;
        } else {
            resData.l0 = 0;
        }

        if (todaysWord[1] === word.word[1]) {
            resData.l1 = 2;
        } else if (todaysWord.includes(word.word[1])) {
            resData.l1 = 1;
        } else {
            resData.l1 = 0;
        }

        if (todaysWord[2] === word.word[2]) {
            resData.l2 = 2;
        } else if (todaysWord.includes(word.word[2])) {
            resData.l2 = 1;
        } else {
            resData.l2 = 0;
        }

        if (todaysWord[3] === word.word[3]) {
            resData.l3 = 2;
        } else if (todaysWord.includes(word.word[3])) {
            resData.l3 = 1;
        } else {
            resData.l3 = 0;
        }

        if (todaysWord[4] === word.word[4]) {
            resData.l4 = 2;
        } else if (todaysWord.includes(word.word[4])) {
            resData.l4 = 1;
        } else {
            resData.l4 = 0;
        }

        res.send(resData);
    }
});

app.listen(8080, () => {
    console.log("Server up and running...");
});