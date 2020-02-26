let inquirer = require('inquirer');

function random() {
    let randomNum = Math.floor(Math.random() * 100);
    console.log(randomNum)
}

let questions = {
    type: 'number',
    name: 'guess',
    message: 'Choose a number btw 1-100',
};

let count = 0;
let randomNum = Math.floor(Math.random() * 100);

function startGame() {
    inquirer
        .prompt(questions).then(answers => {
            if (answers.guess === randomNum) {
                console.log("You got it!");
                return;
            } else if (answers.guess != randomNum) {
                if (count === 4) {
                    console.log("sorry, you lose, the answer was " + randomNum)
                    return;
                } else {
                    console.log("sorry, try again");
                    if (answers.guess > randomNum) {
                        console.log("Your guess is too high")
                    } else console.log("your guess is too low")
                    count += 1;
                    startGame();
                }

            }
        })
}

startGame();

