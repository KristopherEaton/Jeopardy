const game = document.getElementById('game')
const scoreDisplay = document.getElementById('score')
const music = new Audio('jeopardyTune.mp3');
let score = 0

const jeopardyCategories = [
  {
    genre: 'SAFETY DEVICES',
    questions: [
      {
        question: 'A GFCI primarily reduces risk of...?',
        answers: ['Chemical spills', 'Electrocution'],
        correct: 'Electrocution',
        level: 'easy',
      },
      {
        question: 'Who was born on Krypton',
        answers: ['Aquaman', 'Superman'],
        correct: 'Superman',
        level: 'medium',
      },
      {
        question: 'Who designed the first car?',
        answers: ['Karl Benz', 'Henry Ford'],
        correct: 'Karl Benz',
        level: 'hard',
      },
    ],
  },
  {
    genre: 'WHERE',
    questions: [
      {
        question: 'Where can you safely store dirt removed from a trench or hole?',
        answers: ['2 or more feet from the edge', 'In piles right next to trench exit'],
        correct: '2 or more feet from the edge',
        level: 'easy',
      },
      {
        question: 'Wheres the furthest distance you should ever be from an escape route while working in a trench?',
        answers: ['25 feet', '100 feet'],
        correct: '25 feet',
        level: 'medium',
      },
      {
        question: 'Where is Mount Kilamanjaro',
        answers: ['Zimbabwe', 'Tanzania'],
        correct: 'Tanzania',
        level: 'hard',
      },
    ],
  },
  {
    genre: 'FALL PROTECTION',
    questions: [
      {
        question: 'If you are working more than this number of feet above the ground, OSHA requires you to be protected by a fall protection system of some kind.?',
        answers: ['6 feet', '12 feet'],
        correct: '6 feet',
        level: 'easy',
      },
      {
        question: 'What size ladder should you use to work on something 10 feet above the ground?',
        answers: ['12 feet', '13 feet'],
        correct: '13 feet',
        level: 'hard',
      },
      {
        question: 'If stairs have ____ or more risers, they must have a handrail.',
        answers: ['4', '10'],
        correct: '4',
        level: 'medium',
      },
    ],
  },
  {
    genre: 'WHAT',
    questions: [
      {
        question: 'What is the leading cause of most construction site fatalities?',
        answers: ['Trench collapses', 'Falls'],
        correct: 'Falls',
        level: 'easy',
      },
      {
        question: 'What does the "E" in PPE stand for?',
        answers: ['Effort', 'Equipment'],
        correct: 'Equipment',
        level: 'medium',
      },
      {
        question: 'What is the closest you can generally build a scaffold near a power line?',
        answers: ['6 feet', '10 feet'],
        correct: '10 feet',
        level: 'hard',
      },
    ],
  },
  {
    genre: 'HOW MANY',
    questions: [
      {
        question: 'How many feet can you dig a trench before you need to install a protective system of some kind?',
        answers: ['5', '10'],
        correct: '5',
        level: 'easy',
      },
      {
        question: 'How many inches tall do toeboards need to be?',
        answers: ['4', '12'],
        correct: '4',
        level: 'medium',
      },
      {
        question: 'Scaffolds must be designed to carry how many times the load to meet OSHA guidlines?',
        answers: ['x4', 'x10'],
        correct: 'x10',
        level: 'hard',
      },
    ],
  },
]

function addCategory(category) {
  const column = document.createElement('div')
  column.classList.add('genre-column')

  const genreTitle = document.createElement('div')
  genreTitle.classList.add('genre-title')
  genreTitle.innerHTML = category.genre

  column.append(genreTitle)
  game.append(column)

  category.questions.forEach((question) => {
    const card = document.createElement('div')
    card.classList.add('card')
    column.append(card)

    if (question.level == 'easy') {
      card.innerHTML = 100
    }
    if (question.level == 'medium') {
      card.innerHTML = 200
    }
    if (question.level == 'hard') {
      card.innerHTML = 300
    }

    card.setAttribute('data-question', question.question)
    card.setAttribute('data-answer-1', question.answers[0])
    card.setAttribute('data-answer-2', question.answers[1])
    card.setAttribute('data-correct', question.correct)
    card.setAttribute('data-value', card.getInnerHTML())
    card.addEventListener('click', flipCard)
  })
}

jeopardyCategories.forEach((category) => addCategory(category))

function flipCard() {
  music.load();
  music.play();
  this.innerHTML = ''
  this.style.fontSize = '15px'
  this.style.lineHeight = '30px'
  const textDisplay = document.createElement('div')
  textDisplay.classList.add('card-text')
  const firstButton = document.createElement('button')
  const secondButton = document.createElement('button')
  firstButton.classList.add('first-button')
  secondButton.classList.add('second-button')
  firstButton.innerHTML = this.getAttribute('data-answer-1')
  secondButton.innerHTML = this.getAttribute('data-answer-2')
  firstButton.addEventListener('click', getResult)
  secondButton.addEventListener('click', getResult)
  this.append(textDisplay, firstButton, secondButton)
  textDisplay.innerHTML = this.getAttribute('data-question')

  const allCards = Array.from(document.querySelectorAll('.card'))
  allCards.forEach((card) => card.removeEventListener('click', flipCard))
}

function getResult() {
  music.pause();
  const allCards = Array.from(document.querySelectorAll('.card'))
  allCards.forEach((card) => card.addEventListener('click', flipCard))

  const cardOfButton = this.parentElement

  if (cardOfButton.getAttribute('data-correct') == this.innerHTML) {
    score = score + parseInt(cardOfButton.getAttribute('data-value'))
    scoreDisplay.innerHTML = score
    cardOfButton.classList.add('correct-answer')
    setTimeout(() => {
      while (cardOfButton.firstChild) {
        cardOfButton.removeChild(cardOfButton.lastChild)
      }
      cardOfButton.innerHTML = cardOfButton.getAttribute('data-value')
    }, 100)
  } else {
    cardOfButton.classList.add('wrong-answer')
    setTimeout(() => {
      while (cardOfButton.firstChild) {
        cardOfButton.removeChild(cardOfButton.lastChild)
      }
      cardOfButton.innerHTML = 0
    }, 100)
  }
  cardOfButton.removeEventListener('click', flipCard)
}