// Implement server-side logic using Node.js and Express
// Install express and fs modules: npm install express fs

const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.json());

const path = require('path');

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});



app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/question.html');
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/addQuestion.html');
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/quiz.html');
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/sortQuestion.html');
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/sortQuestions.html');
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/done.html');
});


// API endpoint to add a question
app.post('/addQuestion', (req, res) => {
  const question = req.body;
  const questions = loadQuestions();
  questions.push(question);
  saveQuestions(questions);
  res.send('Question added successfully.');
});

// API endpoint to delete a question
app.delete('/deleteQuestion/:serialNumber', (req, res) => {
  const serialNumber = req.params.serialNumber;
  const questions = loadQuestions();
  const updatedQuestions = questions.filter(question => question.serialNumber !== serialNumber);
  saveQuestions(updatedQuestions);
  res.send('Question deleted successfully.');
});

// API endpoint to get and sort questions
app.get('/sortQuestions', (req, res) => {
  const questions = loadQuestions();
  const sortedQuestions = questions.sort((a, b) => a.serialNumber - b.serialNumber);
  res.json(sortedQuestions);
});

// API endpoint to get all questions
app.get('/getQuestions', (req, res) => {
  const questions = loadQuestions();
  res.json(questions);
});

// Helper function to load questions from file
function loadQuestions() {
  try {
    const data = fs.readFileSync('questions.json', 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading questions:', error);
    return [];
  }
}

// Helper function to save questions to file
function saveQuestions(questions) {
  try {
    const data = JSON.stringify(questions, null, 2);
    fs.writeFileSync('questions.json', data);
  } catch (error) {
    console.error('Error saving questions:', error);
  }
}

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
