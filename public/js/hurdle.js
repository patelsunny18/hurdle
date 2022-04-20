const messageContainer = document.querySelector('#message-container');
const message = document.querySelector('#message');

const row0 = document.querySelector('#row1');
const cell00 = document.querySelector('#cell00');
const cell01 = document.querySelector('#cell01');
const cell02 = document.querySelector('#cell02');
const cell03 = document.querySelector('#cell03');
const cell04 = document.querySelector('#cell04');

const row1 = document.querySelector('#row2');
const cell10 = document.querySelector('#cell10');
const cell11 = document.querySelector('#cell11');
const cell12 = document.querySelector('#cell12');
const cell13 = document.querySelector('#cell13');
const cell14 = document.querySelector('#cell14');

const row2 = document.querySelector('#row3');
const cell20 = document.querySelector('#cell20');
const cell21 = document.querySelector('#cell21');
const cell22 = document.querySelector('#cell22');
const cell23 = document.querySelector('#cell23');
const cell24 = document.querySelector('#cell24');

const row3 = document.querySelector('#row4');
const cell30 = document.querySelector('#cell30');
const cell31 = document.querySelector('#cell31');
const cell32 = document.querySelector('#cell32');
const cell33 = document.querySelector('#cell33');
const cell34 = document.querySelector('#cell34');

const row4 = document.querySelector('#row5');
const cell40 = document.querySelector('#cell40');
const cell41 = document.querySelector('#cell41');
const cell42 = document.querySelector('#cell42');
const cell43 = document.querySelector('#cell43');
const cell44 = document.querySelector('#cell44');

const row5 = document.querySelector('#row6');
const cell50 = document.querySelector('#cell50');
const cell51 = document.querySelector('#cell51');
const cell52 = document.querySelector('#cell52');
const cell53 = document.querySelector('#cell53');
const cell54 = document.querySelector('#cell54');

const modal = document.querySelector('#modal');
const closeBtn = document.querySelector('#close');
const shareButton = document.querySelector('#share-button');
const modalBodyText = document.querySelector('#modal-body-text');
const timer = document.querySelector('#timer');
window.onload = timeToNextHurdle();

shareButton.addEventListener('click', shareResults);
closeBtn.addEventListener('click', closeModal);
window.addEventListener('click', outsideClick);

let counter = 0;

window["isRow0Filled"] = false;
window["isRow1Filled"] = false;
window["isRow2Filled"] = false;
window["isRow3Filled"] = false;
window["isRow4Filled"] = false;
window["isRow5Filled"] = false;

let hasWon = false;
let numOfTries = 0;
let results = 'Hurdle! by Sunny\n\n';

window.addEventListener('keydown', function (event) {
    if (checkKey(event.code)) {
        if (!isRow0Filled && !isRow1Filled && !isRow2Filled && !isRow3Filled && !isRow4Filled && !isRow5Filled) {
            fillRow(event, 0);
        } else if (isRow0Filled && !isRow1Filled && !isRow2Filled && !isRow3Filled && !isRow4Filled && !isRow5Filled) {
            fillRow(event, 1);
        } else if (isRow0Filled && isRow1Filled && !isRow2Filled && !isRow3Filled && !isRow4Filled && !isRow5Filled) {
            fillRow(event, 2);
        } else if (isRow0Filled && isRow1Filled && isRow2Filled && !isRow3Filled && !isRow4Filled && !isRow5Filled) {
            fillRow(event, 3);
        } else if (isRow0Filled && isRow1Filled && isRow2Filled && isRow3Filled && !isRow4Filled && !isRow5Filled) {
            fillRow(event, 4);
        } else if (isRow0Filled && isRow1Filled && isRow2Filled && isRow3Filled && isRow4Filled && !isRow5Filled) {
            fillRow(event, 5);
        }
    }
});

async function fillRow(event, rowIndex) {
    switch (counter) {
        case 0: {
            if (event.code === "Backspace") {
                window[`cell${rowIndex}0`].focus();
                counter = 0;
            } else if (event.code === "Enter") {
                await checkAnswer(event, rowIndex);
            } else {
                window[`cell${rowIndex}0`].focus();
                counter += 1;
            }
            break;
        }

        case 1: {
            if (event.code === "Backspace") {
                window[`cell${rowIndex}0`].focus();
                counter -= 1;
            } else if (event.code === "Enter") {
                await checkAnswer(event, rowIndex);
            } else {
                window[`cell${rowIndex}1`].focus();
                counter += 1;
            }
            break;
        }

        case 2: {
            if (event.code === "Backspace") {
                window[`cell${rowIndex}1`].focus();
                counter -= 1;
            } else if (event.code === "Enter") {
                await checkAnswer(event, rowIndex);
            } else {
                window[`cell${rowIndex}2`].focus();
                counter += 1;
            }
            break;
        }

        case 3: {
            if (event.code === "Backspace") {
                window[`cell${rowIndex}2`].focus();
                counter -= 1;
            } else if (event.code === "Enter") {
                await checkAnswer(event, rowIndex);
            } else {
                window[`cell${rowIndex}3`].focus();
                counter += 1;
            }
            break;
        }

        case 4: {
            if (event.code === "Backspace") {
                window[`cell${rowIndex}3`].focus();
                counter -= 1;
            } else if (event.code === "Enter") {
                await checkAnswer(event, rowIndex);
            } else {
                window[`cell${rowIndex}4`].focus();
                counter += 1;
            }
            break;
        }

        case 5: {
            if (event.code === "Backspace") {
                window[`cell${rowIndex}4`].focus();
                counter -= 1;
            } else {
                if (event.code === "Enter") {
                    window[`isRow${rowIndex}Filled`] = true;
                    window[`cell${rowIndex}4`].blur();
                    let result = await checkAnswer(event, rowIndex);

                    if (result === "error") {
                        message.innerHTML = "Not in word list";
                        messageContainer.classList.add("fadeInOut");
                        setTimeout(() => {
                            messageContainer.classList.remove("fadeInOut");
                            message.innerHTML = "";
                        }, 2050);

                        window[`row${rowIndex}`].classList.add("shake");
                        setTimeout(() => {
                            window[`row${rowIndex}`].classList.remove("shake");
                        }, 500);

                        window[`isRow${rowIndex}Filled`] = false;
                        counter = 5;
                        window[`cell${rowIndex}4`].focus();
                    } else if (result === "ok") {
                        if (numOfTries === 6) {
                            createResults(rowIndex);
                            results = results.slice(0, 16) + `${numOfTries}/6\n` + results.slice(16);
                            setTimeout(lose, 1200);
                        } else {
                            window[`isRow${rowIndex}Filled`] = true;
                            createResults(rowIndex);
                            getNextRowReady(rowIndex, rowIndex + 1);
                            counter = 0;
                        }
                    } else if (result === "end") {
                        createResults(rowIndex);
                        results = results.slice(0, 17) + `${numOfTries}/6` + results.slice(16);
                        setTimeout(win, 1200, rowIndex);
                    }
                }
            }
            break;
        }
    }
}

async function checkAnswer(event, rowIndex) {
    if (!window[`isRow${rowIndex}Filled`]) {
        message.innerHTML = "Not enough letter";
        messageContainer.classList.add("fadeInOut");
        setTimeout(() => {
            messageContainer.classList.remove("fadeInOut");
            message.innerHTML = "";
        }, 2050);
    } else {
        window[`cell${rowIndex}0Value`] = window[`cell${rowIndex}0`].value;
        window[`cell${rowIndex}1Value`] = window[`cell${rowIndex}1`].value;
        window[`cell${rowIndex}2Value`] = window[`cell${rowIndex}2`].value;
        window[`cell${rowIndex}3Value`] = window[`cell${rowIndex}3`].value;
        window[`cell${rowIndex}4Value`] = window[`cell${rowIndex}4`].value;

        numsOfCorrect = 0;
        const word = `${window[`cell${rowIndex}0Value`]}${window[`cell${rowIndex}1Value`]}${window[`cell${rowIndex}2Value`]}${window[`cell${rowIndex}3Value`]}${window[`cell${rowIndex}4Value`]}`;

        try {
            const response = await axios.post('/checkAnswer', { word });
            const resData = response.data;

            for (const [key, value] of Object.entries(resData)) {
                if (value === 0) {
                    window[`cell${rowIndex}${key[1]}`].classList.add("incorrect");
                } else if (value === 1) {
                    window[`cell${rowIndex}${key[1]}`].classList.add("partial");
                } else if (value === 2) {
                    numsOfCorrect++;
                    window[`cell${rowIndex}${key[1]}`].classList.add("correct");
                }
            }

            if (numsOfCorrect === 5) {
                numOfTries++;
                return "end";
            } else {
                numOfTries++;
                return "ok";
            }
        } catch (err) {
            console.clear();
            return "error";
        }
    }
}

function win(currRowIndex) {
    for (let i = currRowIndex; i < 6; i++) {
        window[`cell${i}0`].readOnly = true;
        window[`cell${i}1`].readOnly = true;
        window[`cell${i}2`].readOnly = true;
        window[`cell${i}3`].readOnly = true;
        window[`cell${i}4`].readOnly = true;
        window[`cell${i}4`].blur();
    }
    hasWon = true;
    modalBodyText.innerHTML = "Congratulations! You have cracked today's word. Come back tomorrow for the next.";
    openModal();
}

function lose() {
    modalBodyText.innerHTML = "Uh-oh! Come back tomorrow to try again.";
    openModal();
}

function getNextRowReady(currRowIndex, nextRowIndex) {
    if (currRowIndex === 5) {
        for (i = 0; i < 5; i++) {
            window[`cell${currRowIndex}${i}`].readOnly = true;
        }
    } else {
        for (i = 0; i < 5; i++) {
            window[`cell${currRowIndex}${i}`].readOnly = true;
            window[`cell${nextRowIndex}${i}`].readOnly = false;
        }
    }
}

function checkKey(key) {
    return key !== "Space" && ((key.substring(0, 3) === "Key") || key === "Backspace" || key === "Enter");
}

function createResults(rowIndex) {
    for (let i = 0; i < 5; i++) {
        if (window[`cell${rowIndex}${i}`].classList.contains("correct")) {
            results += "🟩 ";
        } else if (window[`cell${rowIndex}${i}`].classList.contains("partial")) {
            results += "🟨 ";
        } else if (window[`cell${rowIndex}${i}`].classList.contains("incorrect")) {
            results += "⬛ ";
        }
    }
    results += "\n";
}

function shareResults() {
    navigator.clipboard.writeText(results)
        .then(() => {
            message.innerHTML = "Copied";
            messageContainer.classList.add("fadeInOut");
            setTimeout(() => {
                messageContainer.classList.remove("fadeInOut");
                message.innerHTML = "";
            }, 2050);
        });
}

function openModal() {
    modal.style.display = 'block';
}

function closeModal() {
    modal.style.display = 'none';
}

function outsideClick(e) {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
}

function timeToNextHurdle() {
    setInterval(function () {
        let today = new Date();
        let tomorrow = new Date();
        tomorrow.setHours(24, 0, 0, 0);

        let remainingTimeInSeconds = (tomorrow.getTime() - today.getTime()) / 1000;

        let hours = Math.floor(remainingTimeInSeconds / 3600);
        remainingTimeInSeconds = remainingTimeInSeconds - (hours * 3600);

        let mins = Math.floor(remainingTimeInSeconds / 60);
        remainingTimeInSeconds = remainingTimeInSeconds - (mins * 60);

        let secs = Math.floor(remainingTimeInSeconds);

        let time = ((hours < 10) ? "0" + hours : hours);
        time += ":" + ((mins < 10) ? "0" + mins : mins);
        time += ":" + ((secs < 10) ? "0" + secs : secs);

        timer.innerHTML = time;
    }, 1000);
}