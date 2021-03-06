const API_URL = 'https://api.exchangerate-api.com/v4/latest/GBP';
const inputField = document.querySelector('#currency-input');
const textOutput = document.querySelector('#exchanged-value');
const errorOutput = document.querySelector('#error');
const submitBtn = document.querySelector('#submit');
const timer = document.querySelector('#timer');
let cdTimer;
    
// Fetch AUD Currency from API & Output to element
async function fetchAUDCurrency() {
    const response = await fetch(API_URL);
    const json = await response.json();
    let inputValue = parseInt(inputField.value);
    let sum = (inputValue * json.rates.AUD).toFixed(2);

    textOutput.innerHTML = `£${inputValue} GBP is equivalent to $${sum} AUD`;
}

// Initialise timer with output to element
function countdownTimer() {
    let minutes = 10;
    let seconds = 60;
    
    cdTimer = setInterval(countdown, 1000)

    function countdown() {
        seconds--;
        if (minutes == 0 && seconds <= 1) {
            timer.innerText = "";
            clearInterval(cdTimer);
        } else if (seconds <= 1) {
            minutes--;
            if (minutes == 0) {
                seconds = 60;
            }
            seconds = 60;
        } else {
            timer.innerText = `Expires in ${minutes} minutes, ${seconds} seconds`;    
        }
    }
    minutes = 10;
    seconds = 60;
}

// Validate input field and invoke functions if truthy
function validateInputField() {
    clearInterval(cdTimer);
    if (!isNaN(Number(inputField.value)) && inputField.value !== "") {
        errorOutput.innerText = "";
        clearInterval(cdTimer);
        fetchAUDCurrency();
        countdownTimer();
    } else if (inputField.value === "" || inputField.value === null) {
        timer.innerText = "";
        textOutput.innerText = "";
        errorOutput.innerText = "A value is required.";
    } else {
        textOutput.innerText = "";
        timer.innerText = "";
        errorOutput.innerText = "Entered value is not a valid number.";
    }
}


// Event listener on CTA to invoke function chain
submitBtn.addEventListener('click', validateInputField);