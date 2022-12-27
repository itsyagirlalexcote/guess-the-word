
// Variable for unordered list where player's guessed letters appear:
const guessLettersElement= document.querySelector(".guessed-letters");
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
    e.preventDefault(); // to prevent the page from reloading after the form submitting/clicking the button
    const guess = letterInput.value;
    console.log(guess);
    letterInput.value = "";
});