// ELEMENT VARIABLES
const questionsContainter = document.querySelector(".questions");

let triviaCategories = [
  {
    // For Any category
    id: "", // A blank id is required by the api for any category
    name: "Any Category",
  },
  {
    id: 9,
    name: "General Knowledge",
  },
  {
    id: 10,
    name: "Entertainment: Books",
  },
  {
    id: 11,
    name: "Entertainment: Film",
  },
  {
    id: 12,
    name: "Entertainment: Music",
  },
  {
    id: 13,
    name: "Entertainment: Musicals & Theatres",
  },
  {
    id: 14,
    name: "Entertainment: Television",
  },
  {
    id: 15,
    name: "Entertainment: Video Games",
  },
  {
    id: 16,
    name: "Entertainment: Board Games",
  },
  {
    id: 17,
    name: "Science & Nature",
  },
  {
    id: 18,
    name: "Science: Computers",
  },
  {
    id: 19,
    name: "Science: Mathematics",
  },
  {
    id: 20,
    name: "Mythology",
  },
  {
    id: 21,
    name: "Sports",
  },
  {
    id: 22,
    name: "Geography",
  },
  {
    id: 23,
    name: "History",
  },
  // These object does not appear to work with the api currently
  // {
  //   id: 24,
  //   name: "Politics",
  // },
  // {
  //   id: 25,
  //   name: "Art",
  // },
  {
    id: 26,
    name: "Celebrities",
  },
  {
    id: 27,
    name: "Animals",
  },
  {
    id: 28,
    name: "Vehicles",
  },
  {
    id: 29,
    name: "Entertainment: Comics",
  },
  {
    id: 30,
    name: "Science: Gadgets",
  },
  {
    id: 31,
    name: "Entertainment: Japanese Anime & Manga",
  },
  {
    id: 32,
    name: "Entertainment: Cartoon & Animations",
  },
];

// QUIZ VARIABLES
let questionCount = 10;
let categoryID = triviaCategories[0].id; // Empty string by default for any category
let difficultyList = ["Easy", "Medium", "Hard"];
let difficulty = difficultyList[0];
let multipleChoice = true;
let questions = [];
let answers = [];
let score = 0;

const fetchTriviaData = async () => {
  // Fetch response from API
  let response = await fetch(
    `https://opentdb.com/api.php?amount=${questionCount}&category=${categoryID}&difficulty=${difficulty
    }&type=${multipleChoice ? "multiple" : "boolean"}`
  );

  // Ensure response was successful before proceeding
  if (response.status === 200) {
    // Extract data in JSON format
    let data = await response.json();
    // Add retrieved questions from data and assign them to the array of questions
    if (questions.length === 0) {
      questions = parseTriviaData(data);
    }
    createQuestion();
    // console.log(questions);
  }
};

const parseTriviaData = (data) => {
  // Create an array to store the retrieved questions
  let questionArray = [];
  let results = data.results;
  // Loop through each object of questions and return them
  results.forEach((questionObject, index) => {
    questionArray[index] = questionObject;
  });
  return questionArray;
};

const createQuestion = () => {
  // Loop through each question object
  console.log(questions);
  questions.forEach((object) => {
    // Create the container for the question
    let questionContainer = document.createElement("div");
    let questionID = questions.indexOf(object);
    questionContainer.classList.add("question-container");
    questionContainer.id = `${questionID}`;

    // Create the label for the question label
    let questionLabel = document.createElement("p");
    questionLabel.innerHTML = `Question ${questionID + 1}`;
    questionLabel.classList.add("question-label");
    questionContainer.appendChild(questionLabel);

    // Create the label for the question text
    let questionText = document.createElement("p");
    questionText.innerHTML = `${object.question}`;
    questionContainer.appendChild(questionText);

    let allAnswers = [object["correct_answer"], ...object["incorrect_answers"]];
    questionContainer.appendChild(createAnswers(allAnswers, questionID));

    questionsContainter.appendChild(questionContainer);
  });
  showSubmitButton();
};

const showSubmitButton = () => {
  let configBtn = document.querySelector(".main-button");
  configBtn.classList.remove("main-button");
  let submitBtn = document.querySelector(".submit");
  submitBtn.style.visibility = "visible";
} 

const createAnswers = (answers, questionID) => {
  // Create unordered list of answers
  let answersList = document.createElement("ul");
  answersList.classList.add("answers");
  let answerID = questionID;

  // RANDOMIZE ANSWERS (TODO: FIND A BETTER WAY)
  answers.sort(() => Math.random() - 0.5);
  answers.sort(() => Math.random() - 0.5);
  answers.sort(() => Math.random() - 0.5);

  answers.forEach((answer) => {
    // Create item for answer
    let item = document.createElement("li");

    // Create the radio input
    let input = document.createElement("input");
    input.type = "radio";
    input.name = `Answers${answerID}`;
    input.id = answer;
    input.value = answer;
    // item.appendChild(input);

    // Create the label tag
    let label = document.createElement("label");
    label.for = answer;
    // Add the radio input before the text
    label.appendChild(input);
    // Add the text in addition to the radio input (so the input and text and clickable)
    label.innerHTML += answer;
    item.appendChild(label);

    answersList.appendChild(item);
  });
  return answersList;
};

const collectAnswers = () => {
  // Get all list of answers
  let answersListAll = document.querySelectorAll(".answers");
  answers = new Array(questionCount);

  // Iterate through each individual set of answer lists per question
  answersListAll.forEach((answersList, listIndex) => {
    // Get a list of all possible answers
    let answerList = answersList.querySelectorAll("input");
    // Get the users actual response
    answerList.forEach((answerOption) => {
      if (answerOption.checked) {
        answers[listIndex] = answerOption.value;
      }
    });
  });
};

const calculateScore = () => {
  // Collect Answers to calcualte score
  collectAnswers();
  score = 0;

  questions.forEach((question, index) => {
    if (question.correct_answer === answers[index]) {
      score++;
    }
  });

  console.log("SCORE = " + score);
};

const displayTriviaConfig = () => {
  if (document.querySelector(".config")) {
    let modal = document.querySelector(".config");
    modal.remove();
  }

  // Create a Results Section Modal
  let configModal = document.createElement("section");
  configModal.classList.add("modal");
  configModal.classList.add("config");

  // Create the header
  let configHeader = document.createElement("h2");
  configHeader.innerHTML = "Configure Your Trivia!";
  configModal.appendChild(configHeader);

  // Create the Close Modal button
  let closeModalBtn = document.createElement("button");
  closeModalBtn.classList.add("close-modal-btn");
  closeModalBtn.innerHTML = "x";
  closeModalBtn.onclick = closeConfigModal;
  configModal.appendChild(closeModalBtn);

  // Create a list for all trivia config options
  let configList = document.createElement("ul");

  // Create Question Number Selector
  let questionNumItem = document.createElement("li");
  let questionNumLabel = document.createElement("label");
  questionNumLabel.innerHTML = "Number of Questions: ";
  let questionNumInput = document.createElement("input");
  questionNumInput.classList.add("question-amount");
  questionNumInput.type = "number";
  questionNumInput.name = "question-amount";
  questionNumInput.value = "10";
  questionNumInput.min = "1";
  questionNumInput.max = "20";
  questionNumItem.appendChild(questionNumLabel);
  questionNumItem.appendChild(questionNumInput);
  configList.appendChild(questionNumItem);
  // <input type="range" id="a" name="a" value="50"></input>

  // Create Category Selector
  let selectorItem = document.createElement("li");
  let selectorLabel = document.createElement("label");
  selectorLabel.innerHTML = "Choose a Trivia Category: ";
  let selector = document.createElement("select");
  selector.name = "trivia-category";
  selector.classList.add("trivia-category");
  // Loop through each category and create an option tag for each
  triviaCategories.forEach(category => {
    let option = document.createElement("option");
    option.value = category.name;
    option.innerHTML = category.name;
    // option.class = category.id;
    selector.appendChild(option);
  });
  selectorItem.appendChild(selectorLabel);
  selectorItem.appendChild(selector);
  configList.appendChild(selectorItem);

  // Create Difficulty Selector
  let difficultyItem = document.createElement("li");
  let difficultyLabel = document.createElement("label");
  difficultyLabel.innerHTML = "Select a difficulty: ";
  let difficultySelector = document.createElement("select");
  difficultySelector.name = "difficulty";
  difficultySelector.classList.add("difficulty");
  difficultyList.forEach(difficulty => {
    let option = document.createElement("option");
    option.value = difficulty;
    option.innerHTML = difficulty;
    difficultySelector.appendChild(option);
  });
  difficultyItem.appendChild(difficultyLabel);
  difficultyItem.appendChild(difficultySelector);
  configList.appendChild(difficultyItem);

  // Add config list items to modal
  configModal.appendChild(configList);

  // Create the Start Trivia button
  let btnWrapper = document.createElement("div");
  btnWrapper.classList.add("button-wrapper");
  let startBtn = document.createElement("button");
  startBtn.innerHTML = "Start Trivia";
  startBtn.onclick = startTrivia;
  btnWrapper.appendChild(startBtn);
  configModal.appendChild(btnWrapper);

  document.body.appendChild(configModal);
};

const startTrivia = () => {
  // Get the selected amount of questions
  let questionNumInput = document.querySelector(".question-amount");
  if (questionNumInput && Number(questionNumInput.value)) {
    questionCount = questionNumInput.value;
  }

  // Get the selected trivia category and loop to find the selected option
  let categorySelector = document.querySelector(".trivia-category");
  triviaCategories.forEach(category => {
    if (categorySelector.value === category.name) {
      categoryID = category.id;
    }
  });
  console.log("CATEGORY IS NOW: " + categorySelector.value);

  // Get the selected difficulty
  let difficultySelector = document.querySelector(".difficulty");
  if (difficultySelector) {
    difficulty = difficultySelector.value.toLowerCase();
  }
  console.log("Difficult is = " + difficulty);

  questions = [];
  questionsContainter.innerHTML = "";

  fetchTriviaData();
  closeConfigModal();
};

const displayResults = () => {
  if (document.querySelector(".results")) {
    let modal = document.querySelector(".results");
    modal.remove();
  }

  // Calculate Score to display
  calculateScore();

  // Create a Results Section Modal
  let resultsModal = document.createElement("section");
  resultsModal.classList.add("modal");
  resultsModal.classList.add("results");

  // Create the header
  let resultsHeader = document.createElement("h2");
  resultsHeader.innerHTML = "Results";
  resultsModal.appendChild(resultsHeader);

  // Create the Score Display
  let scoreDisplay = document.createElement("p");
  scoreDisplay.innerHTML = "Questions Correct: " + score;
  resultsModal.appendChild(scoreDisplay);

  // Create the Close Modal button
  let closeModalBtn = document.createElement("button");
  closeModalBtn.classList.add("close-modal-btn");
  closeModalBtn.innerHTML = "x";
  closeModalBtn.onclick = closeResultsModal;
  resultsModal.appendChild(closeModalBtn);

  document.body.appendChild(resultsModal);
};

const closeConfigModal = () => {
  console.log("Closing Config Modal");
  let modal = document.querySelector(".config");
  modal.style.visibility = "hidden";
};

const closeResultsModal = () => {
  console.log("Closing Results Modal");
  let modal = document.querySelector(".results");
  modal.style.visibility = "hidden";
};

document.addEventListener("click", (e) =>{

})