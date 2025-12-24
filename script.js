const body = document.querySelector('body')
const main = document.querySelector('.main')
const containerId = document.querySelector('#containerId')
const startQuiz = document.querySelector('.start-container')
const paraQuestion = document.querySelector('.paragraph-question')
const outOf = document.querySelector('.out-off')
const timerClock = document.querySelector('.timer')
const answerContainer = document.querySelector('.answer-container')
const subAnswerContainer = document.querySelectorAll('.sub-ans-container')
const img1 = document.querySelector('.img-1')
const img2 = document.querySelector('.img-2')
const img3 = document.querySelector('.img-3')
const img4 = document.querySelector('.img-4')
const answers = document.querySelectorAll('.answer')
const answer1 = document.querySelector('#answer-1')
const answer2 = document.querySelector('#answer-2')
const answer3 = document.querySelector('#answer-3')
const answer4 = document.querySelector('#answer-4')
const nextBtn = document.querySelector('.next a')
const percent = document.querySelector('.bar-graph2')
const percentSpan = document.querySelector('.bar-graph2 span')
const resultOut = document.querySelector('.result-out-off')
const keepLearn = document.querySelector('.keep')
const restartBtn = document.querySelector('button')

startQuiz.addEventListener('click', () => {
  main.classList.add('show')
  startTimer()
})

const allContent = [
  {
    question: 'Inside which HTML element do we put the JavaScript?',
    option: ['<js>', '<scripting>', '<javascript>', '<script>'],
    correct: '<script>',
  },
  {
    question: 'Hor many data types in JavaScript?',
    option: ['5', '2', '1', '7'],
    correct: '2',
  },
  {
    question: 'Which of the following is correct about features of JavaScript?',
    option: [
      'JavaScript is a lightweight, interpreted programming language.',
      ' JavaScript is designed for creating network-centric applications.',
      'JavaScript is complementary to and integrated with Java.',
      'All of the above.'
    ],
    correct: 'All of the above.',
  },
  {
    question: 'Which built-in method calls a function for each element in the array?',
    option: ['while()', 'loop()', 'forEach()', 'None of the above.'],
    correct: 'forEach()',
  },
  {
    question: 'Which built-in method sorts the elements of an array?',
    option: ['changeOrder(order)', 'order()', 'sort()', 'None of the above.'],
    correct: 'sort()',
  },
]

let currentQuestion = 0
let correctAnswer = 0

let intervalId
let timer = 30
let isRunning = false

function updateTimer() {
  timerClock.innerText = `00:${timer < 10 ? '0' + timer : timer}`

  if (timer <= 15 && timer > 5) {
    containerId.classList.add('fifty-percent')
    nextBtn.classList.add('fifty-percent')
  } else if (timer < 6) {
    containerId.classList.remove('fifty-percent')
    containerId.classList.add('ninety-percent')
    nextBtn.classList.remove('fifty-percent')
    nextBtn.classList.add('ninety-percent')
  }
}

function startTimer() {
  if (!isRunning) {
    isRunning = true
    intervalId = setInterval(() => {
      if (timer === 0) {
        clearInterval(intervalId)
        optionDisable()
        nextBtn.classList.remove('next2')
      } else {
        timer--
        nextBtn.classList.add('next2')
      }
      updateTimer()
    }, 1000)
  }
}

function stopTimer() {
  if (isRunning) {
    optionDisable()
    clearInterval(intervalId)
    isRunning = false
    nextBtn.classList.remove('next2')
  }
}

function restartTimer() {
  isRunning = false
  optionDisable()
  stopTimer()
  timer = 30
  updateTimer()
  startTimer()
  containerId.classList.remove('fifty-percent')
  containerId.classList.remove('ninety-percent')
  nextBtn.classList.remove('fifty-percent')
  nextBtn.classList.remove('ninety-percent')
}

function optionDisable() {
  subAnswerContainer.forEach((option) => {
    if (isRunning) {
      option.classList.add('option-disabled')
    } else {
      option.classList.remove('option-disabled')
    }
  })
}

function loadQuestion(prop = null) {
  if (currentQuestion === allContent.length) {
    main.classList.add('show-again')
    return
  }
  outOf.innerText = ` ${currentQuestion + 1} / ${allContent.length}`

  const question = allContent[currentQuestion].question
  paraQuestion.innerText = question
  const opt = allContent[currentQuestion].option
  Array.from(answers).forEach((paragraph, i) => {
    paragraph.innerText = opt[i]
  })

  if (prop !== allContent[currentQuestion].correct) {
    if (answer1.innerText === prop) {
      answer1.classList.add('border-red')
      img1.src = 'images/wrong.svg'
    } else if (answer2.innerText === prop) {
      answer2.classList.add('border-red')
      img2.src = 'images/wrong.svg'
    } else if (answer3.innerText === prop) {
      answer3.classList.add('border-red')
      img3.src = 'images/wrong.svg'
    } else if (answer4.innerText === prop) {
      answer4.classList.add('border-red')
      img4.src = 'images/wrong.svg'
    }
  } else {
    if (answer1.innerText === prop) {
      answer1.classList.add('border-green')
      img1.src = 'images/correct.svg'
      correctAnswer++
    } else if (answer2.innerText === prop) {
      answer2.classList.add('border-green')
      img2.src = 'images/correct.svg'
      correctAnswer++
    } else if (answer3.innerText === prop) {
      answer3.classList.add('border-green')
      img3.src = 'images/correct.svg'
      correctAnswer++
    } else if (answer4.innerText === prop) {
      answer4.classList.add('border-green')
      img4.src = 'images/correct.svg'
      correctAnswer++
    }
  }

  if (prop !== allContent[currentQuestion].correct) {
    if (prop && answer1.innerText === allContent[currentQuestion].correct) {
      answer1.classList.add('border-green')
      img1.src = 'images/correct.svg'
    } else if (
      prop &&
      answer2.innerText === allContent[currentQuestion].correct
    ) {
      answer2.classList.add('border-green')
      img2.src = 'images/correct.svg'
    } else if (
      prop &&
      answer3.innerText === allContent[currentQuestion].correct
    ) {
      answer3.classList.add('border-green')
      img3.src = 'images/correct.svg'
    } else if (
      prop &&
      answer4.innerText === allContent[currentQuestion].correct
    ) {
      answer4.classList.add('border-green')
      img4.src = 'images/correct.svg'
    }
  }

  if (prop === null) {
    answer1.classList.remove('border-red')
    answer2.classList.remove('border-red')
    answer3.classList.remove('border-red')
    answer4.classList.remove('border-red')
    answer1.classList.remove('border-green')
    answer2.classList.remove('border-green')
    answer3.classList.remove('border-green')
    answer4.classList.remove('border-green')
    img1.src = ''
    img2.src = ''
    img3.src = ''
    img4.src = ''
  }

  const totalQuestion = allContent.length
  let correctSelect = (correctAnswer / totalQuestion) * 100
  percent.style.width = `${Math.round(correctSelect)}%`
  percentSpan.innerText = `${Math.round(correctSelect)}%`
  resultOut.innerText = ` ${correctAnswer} / ${allContent.length}`

  if (correctSelect <= 35) {
    keepLearn.innerText = `"Keep Learning"`
  } else if (correctSelect > 36 && correctSelect <= 75) {
    keepLearn.innerText = `"Good Job Keep Learning "`
  } else {
    keepLearn.innerText = `"Excellent!"`
  }
}
loadQuestion()

function chooseAnswer() {
  answerContainer.addEventListener(
    'click',
    (e) => {
      if (e.target !== answerContainer) {
        const inputValue = e.target.innerText
        console.log((e.target = e.target))
        loadQuestion(inputValue)
        stopTimer()
      }
    },
    { once: true }
  )
}
chooseAnswer()

nextBtn.addEventListener('click', () => {
  if (currentQuestion < allContent.length) {
    currentQuestion++
  }
  loadQuestion()
  chooseAnswer()
  restartTimer()
})

restartBtn.addEventListener('click', () => {
  window.location.reload()
})

body.addEventListener('contextmenu', (e) => {
  e.preventDefault()
})
