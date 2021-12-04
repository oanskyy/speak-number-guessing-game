// Step 1 - bring in/get all the DOM elements we are going to use, store them in a variable
const msgEl = document.getElementById("msg")
const randomNum = getRandomNumber()
console.log("Number: ", randomNum)

// 1.2 We need to initialize a speech recognition OBJECT
window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition

// 1.3. initialize a VARIABLE with that OBJECT
let recognition = new window.SpeechRecognition()

// Step 2 - set up all the actions/functions
// Start recognition and game; use the start() method from the MDN documentation
recognition.start()

// Capture user speak; it's part of an event listener(e = result), so we're gonna pass in that event parameter (e)
function onSpeak(e) {
  console.log("event: ", e)
  const msg = e.results[0][0].transcript
  console.log(msg)

  writeMsg(msg)
  checkNumber(msg)
}

// Write what user speaks
function writeMsg(msg) {
  msgEl.innerHTML = `
  <div>You said: </div>
  <span class="box">${msg}</span>
  `
}

// Check msg against number
function checkNumber(msg) {
  const num = +msg

  // Check if valid number
  if (Number.isNaN(num)) {
    msgEl.innerHTML += "<div>That is not a valid number</div>"
    return
  }

  // Check if in range
  if (!(1 < num < 100)) {
    msgEl.innerHTML = "<div>Number must be between 1 and 100</div>"
    return
  }

  // Check number
  if (num === randomNum) {
    document.body.innerHTML = `
      <h2>Congrats Kevin, you have guessed the number!<br>
      It was ${num}
      </h2>
      <button class="play-btn" id="play-btn">Play again</button>
    `
  } else if (num > randomNum) {
    msgEl.innerHTML += `
    <div>Go lower!</div>`
  } else {
    msgEl.innerHTML += `
    <div>Go higher!</div>`
  }
}

// Generate random number
function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1
}

// Speak result| catch the 'result' and run the function 'onSpeak'
recognition.addEventListener("result", onSpeak)

// End SR service
recognition.addEventListener("end", () => recognition.start())

document.body.addEventListener("click", e => {
  if (e.target.id == "play-btn") {
    window.location.reload()
  }
})
