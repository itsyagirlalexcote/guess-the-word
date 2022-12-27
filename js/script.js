
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
const word = "magnolia";

// Variable containing all the letters players guessed
const guessedLetters = [];

// Display placeholders for each letter of the chosen word:
const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

placeholder(word);

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

const checkIfWin = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;
    }
};