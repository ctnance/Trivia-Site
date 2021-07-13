// ELEMENT VARIABLES
const questionsContainter = document.querySelector(".questions");

// QUIZ VARIABLES
let questionCount = 10;
let difficulty = ["easy", "medium", "hard"];
let questions = [];
let multipleChoice = true;

const fetchTriviaData = async () => {
  // Fetch response from API
  let response = await fetch(
    `https://opentdb.com/api.php?amount=${questionCount}&category=15&difficulty=${
      difficulty[1]
    }&type=${multipleChoice ? "multiple" : "boolean"}`
  );

  // Ensure response was successful before proceeding
  if (response.status === 200) {
    // Extract data in JSON format
    let data = await response.json();
    // Add retrieved questions from data and assign them to the array of questions
    questions = parseTriviaData(data);
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
  questions.forEach((object, index) => {
    // Create the container for the question
    let questionContainer = document.createElement("div");
    let questionID = index;
    questionContainer.classList.add("question-container");
    questionContainer.id = `${questionID}`;

    // Create the label for the question label
    let questionLabel = document.createElement("p");
    questionLabel.innerHTML = `Question ${questionID + 1}`;
    questionContainer.appendChild(questionLabel);

    // Create the label for the question text
    let questionText = document.createElement("p");
    questionText.innerHTML = `${object.question}`;
    questionContainer.appendChild(questionText);

    questionContainer.appendChild(
      createAnswers([object["correct_answer"], ...object["incorrect_answers"]])
    );

    questionsContainter.appendChild(questionContainer);
  });
};

const createAnswers = (answers) => {
  // Create unordered list of answers
  let answersList = document.createElement("ul");
  answersList.classList.add("answers");

  answers.forEach((answer, index) => {
    // Create item for answer
    let item = document.createElement("li");

    // Create the radio input
    let input = document.createElement("input");
    input.type = "radio";
    input.name = `Answers${index}`;
    input.id = answer;
    input.value = answer;
    item.appendChild(input);

    // Create the label tag
    let label = document.createElement("label");
    label.for = answer;
    label.innerHTML = answer;
    item.appendChild(label);

    answersList.appendChild(item);
  });
  return answersList;
};

fetchTriviaData();
