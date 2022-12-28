
// Variable for unordered list where player's guessed letters appear:
const guessedLettersElement= document.querySelector(".guessed-letters");
// Variable for button:
const guessLetterButton = document.querySelector(".guess");
// Variable for text input where player will guess a letter:
const letterInput = document.querySelector(".letter");
// Variable for word in progress paragraph:
const wordInProgress = document.querySelector(".word-in-progress");
// Variable for remaining guesses paragraph:
const remainingGuessesElement = document.querySelector(".remaining");
// Variable for span inside paragraph of remaining guesses:
const remainingGuessesSpan = document.querySelector(".remaining span");
// Variable for messages that appear when player guesses a letter:
const message = document.querySelector(".message");
// Variable for hidden "play again" button:
const playAgainButton = document.querySelector(".play-again");

// Variable for starting word to test out the game:
let word = "magnolia";
// Variable containing all the letters players guessed:
const guessedLetters = [];
// Variable for initial maximum amount of guesses:
let remainingGuesses = 8;

const getWord = async function () {
    const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await response.text();
    const wordArray = words.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    placeholder(word);
};

getWord();

// Display placeholders for each letter of the chosen word:
const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

guessLetterButton.addEventListener("click", function (e) {
    // to prevent the page from reloading after the form submitting/clicking the button
    e.preventDefault();
    // empty message paragraph
    message.innerText = "";
    // Take what was entered in the input
    const guess = letterInput.value; 
    // Make sure it's a single letter
    const goodGuess = validateInput(guess);

    if (goodGuess) {
        makeGuess(guess);
    }
    letterInput.value = "";
});

const validateInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        // Is the input empty?
        message.innerText = "Please enter a letter.";
    } else if (input.length > 1) {
        // Did you type more than one letter?
        message.innerText = "Please enter a single letter.";
    } else if (!input.match(acceptedLetter)) {
        // Did you type a number, a special character or some other non letter thing?
        message.innerText = "Please enter a letter from A to Z.";
    } else {
        // Message for when we get a single letter
        return input;
    }
};

const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = "You already guessed that letter, please try again.";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
        updateRemainingGuesses(guess);
        showGuessedLetters();
        updateWordInProgress(guessedLetters);
    }
};

const showGuessedLetters = function () {
    guessedLettersElement.innerHTML = "";
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersElement.append(li);
    }
};

const updateWordInProgress = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const revealWord = [];
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            revealWord.push(letter.toUpperCase());
        } else {
            revealWord.push("●");
        }
    }
    wordInProgress.innerText = revealWord.join("");
    checkIfWin();
};

const updateRemainingGuesses = function (guess) {
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(guess)) {
        message.innerText = `Sorry, the word has no ${guess}.`;
        remainingGuesses -= 1;
    } else {
        message.innerText = `Good guess! The word has the letter ${guess}.`;
    }

    if (remainingGuesses === 0) {
        message.innerHTML = `Game over! The word was <span class="highlight">${word}</span>.`;
        startOver();
    } else if (remainingGuesses === 1) {
        remainingGuessesSpan.innerText = `${remainingGuesses} guess`;
    } else {
        remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    }
};

const checkIfWin = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;
        startOver();
    }
};

const startOver = function () {
    guessLetterButton.classList.add("hide");
    remainingGuessesElement.classList.add("hide");
    guessedLettersElement.classList.add("hide");
    playAgainButton.classList.remove("hide");
};