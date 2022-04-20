'use strict';

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const checkWord = require('check-word');
const fs = require('fs');
const wordListPath = require('word-list');
const wordArray = fs.readFileSync(wordListPath, 'utf8').split('\n');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/public/css/'));

const dict = checkWord('en');
const todaysWord = generateWord();
console.log(todaysWord);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/views/hurdle.html'));
});

app.post('/checkAnswer', (req, res) => {
    const inputWord = req.body;
    const resData = {};

    const copyTodaysWord = `${todaysWord}`;
    let copyTodaysWordCount = getCount(copyTodaysWord);

    if (!dict.check(inputWord.word)) {
        res.sendStatus(400);
    } else {
        for (let i = 0; i < 5; i++) {
            if (todaysWord[i] === inputWord.word[i]) {
                if (copyTodaysWordCount[inputWord.word[i]] > 0) {
                    copyTodaysWordCount[inputWord.word[i]] -= 1;
                    resData[`l${i}`] = 2;
                }
            } else if (todaysWord.includes(inputWord.word[i])) {
                if (copyTodaysWordCount[inputWord.word[i]] > 0) {
                    copyTodaysWordCount[inputWord.word[i]] -= 1;
                    resData[`l${i}`] = 1;
                } else {
                    resData[`l${i}`] = 0;
                }
            } else if (todaysWord[i] !== inputWord.word[i]) {
                resData[`l${i}`] = 0;
            }
        }
        res.send(resData);
    }
});

function getCount(word) {
    let count = {};
    let arrayOfChars = word.split("");
    arrayOfChars.forEach(char => {
        count[char] = (count[char] || 0) + 1;
    });
    return count;
}

function generateWord() {
    let fiveLetterArray = [];
    wordArray.forEach(word => {
        if (word.length === 5) {
            fiveLetterArray.push(word);
        }
    });

    return fiveLetterArray[Math.floor(Math.random() * fiveLetterArray.length)];
}

app.listen(8080, () => {
    console.log("Server up and running...");
});