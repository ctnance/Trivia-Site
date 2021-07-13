// ELEMENT VARIABLES
const questionsContainter = document.querySelector(".questions");

// QUIZ VARIABLES
let questions = [];
let multipleChoice = true;

const fetchTriviaData = async () => {
  // Fetch response from API
  let response = await fetch(
    `https://opentdb.com/api.php?amount=10&category=15&difficulty=medium&type=multiple`
  );

  // Ensure response was successful before proceeding
  if (response.status === 200) {
    // Extract data in JSON format
    let data = await response.json();
    // Add retrieved questions from data and assign them to the array of questions
    questions = parseTriviaData(data);
    console.log(questions);
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
