const typingText = document.querySelector(".typing-text p");
const inputField = document.querySelector(".wrapper .input-field");
const mistakeTag = document.querySelector(".mistake span");
const timeTag = document.querySelector(".time span b");
const wpmTag = document.querySelector(".wpm span");
const cpmTag = document.querySelector(".cpm span");
const tryAgainBtn = document.querySelector("button");

//variables
let timer,
    maxTime = 60,
    timeLeft = maxTime,
    charIndex = mistakes = isTyping = 0;

//functions
function loadParagraph() {
    timeTag.innerText = maxTime;
    typingText.innerHTML = "";
    //get any random paragraph from paragraph array
    let randomIndex = Math.floor(Math.random() * paragraphs.length);
    //get each character of paragraph using split method
    paragraphs[randomIndex].split("").forEach((char) => {
        let span = `<span>${char}</span`;
        typingText.innerHTML += span;
    });

    //focusing input field on keydown and clicking on text
    document.addEventListener("keydown", () => inputField.focus());
    typingText.addEventListener("click", () => inputField.focus());
}

function initTyping() {
    let characters = typingText.querySelectorAll("span");
    let typedChar = inputField.value.split("")[charIndex];

    if (charIndex < characters.length - 1 && timeLeft > 0) {
        if (!isTyping) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }
        //if user hasn't typed any character or pressed backspace
        if (typedChar == null) {
            if (charIndex > 0) {
                charIndex--;
                if (characters[charIndex].classList.contains("incorrect")) {
                    mistakes--;
                }
                characters[charIndex].classList.remove("correct", "incorrect", "active");
            }
        } else {
            if (characters[charIndex].innerText === typedChar) {
                characters[charIndex].classList.add("correct");
            } else {
                mistakes++;
                characters[charIndex].classList.add("incorrect");
            }
            charIndex++;
        }
        
        characters.forEach((char) => char.classList.remove("active"));
        characters[charIndex].classList.add("active");
        
        let wpm = Math.round((((charIndex - mistakes) / 5) / (maxTime - timeLeft)) * 60);
        //if wpm value is 0,empty, or infinity then set it's value to 0
        wpm = wpm < 0 || !wpm || wpm === infinity ? 0 : wpm
        wpmTag.innerText = wpm;
        mistakeTag.innerText = mistakes;
        console.log(mistakes);
        cpmTag.innerText = charIndex - mistakes;
    } else {
        inputField.value = "";
        clearInterval(timer);
    }
}


function initTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timeTag.innerText = timeLeft;
        let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 60);
        wpmTag.innerText = wpm;
        cpmTag.innerText = charIndex - mistakes;
    }
    else {
        clearInterval(timer);
    }
}

function reset(){
    loadParagraph();
    inputField.value = "";
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = mistakes = isTyping = 0;
    timeTag.innerText = timeLeft;
    mistakeTag.innerText = mistakes;
    wpmTag.innerText = 0;
    cpmTag.innerText = 0;
}

loadParagraph();
inputField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click",reset);