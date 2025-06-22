function handleAnswer(answer) {
  setAnswers([...answers, answer]);
  setCurrentQuestionIndex(currentQuestionIndex + 1);
};

function handleUserFormSubmit(name) {
  setUserName(name);
};

function determineElement(answers) {
  const counts = {};
  answers.forEach(function(answer) {
    const element = elements[answer];
    counts[element] = (counts[element] || 0) + 1;
  });
  return Object.keys(counts).reduce(function(a, b) {
    return counts[a] > counts[b] ? a : b
  });
};