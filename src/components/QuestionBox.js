import React, { useState } from 'react';
import './Questions.css';
import questionsData from '../questions';

const QuestionBox = () => {
  // variable
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [highlighted, setHighlighted] = useState(false);
  const [lightMode, setLightMode] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Handlers for option selection
  const handleOptionSelect = (optionId) => {
    setSelectedOption(optionId);

    const selectedOptionData = questionsData[currentQuestion].options.find(
      (option) => option.id === optionId
    );

    if (selectedOptionData.isCorrect) {
      setCorrectAnswers(correctAnswers + 1);
    }

    if (currentQuestion < questionsData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
    } else {
      setQuizCompleted(true);
    }
  };
// reastart quiz
  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setHighlighted(false);
    setLightMode(false);
    setCorrectAnswers(0);
    setQuizCompleted(false);
  };

  // current question data
  const currentQuestionData = questionsData[currentQuestion];
  const { text, options } = currentQuestionData;
  const questionHeader = `Question ${currentQuestion + 1} of ${questionsData.length}`;

  // Helper to get option letters
  const getOptionLetter = (index) => {
    return String.fromCharCode(65 + index);
  };

  // light mode and dark mode
  const handleHighlight = () => {
    setHighlighted(true);
  };

  const removeHighlight = () => {
    setHighlighted(false);
  };

  const handleLightMode = () => {
    setLightMode(!lightMode);
    document.body.style.backgroundColor = lightMode ? 'lightblue' : '#f0f0f0';
    document.body.classList.toggle('light-mode');
  };

  // Rendering based on quiz completion
  if (quizCompleted) {
    const percentage = ((correctAnswers / questionsData.length) * 100).toFixed(2);

    return (
      <div className={`QuestionBox ${highlighted ? 'highlighted' : ''} ${lightMode ? 'light-mode' : ''}`}>
        <h1 className="Result">Quiz Result</h1>
        <p>{`You got ${correctAnswers} out of ${questionsData.length} correct!`}</p>
        <p>{` (${percentage}%)`}</p>
        <button onClick={handleRestartQuiz}>Restart Quiz</button>
      </div>
    );
  }

  // for getting quiz and optioms
  return (
    <div className={`QuestionBox ${highlighted ? 'highlighted' : ''} ${lightMode ? 'light-mode' : ''}`}>
      <h1 className="title">Let's Test Your Brain</h1>
      <h3 className="questionHeader">{questionHeader}</h3>
      <div className="Question">
        <h2 className={highlighted ? 'highlightedText' : ''}>{`Question ${currentQuestion + 1}: ${text}`}</h2>
      </div>
      <ul className="options">
        {options.map((option, index) => (
          <li
            key={option.id}
            className={selectedOption === option.id ? 'selectedOption' : ''}
            onClick={() => handleOptionSelect(option.id)}
          >
            {`${getOptionLetter(index)}. ${option.text}`}
          </li>
        ))}
      </ul>
      <button className="High" onClick={handleHighlight} disabled={highlighted}>
        Highlight
      </button>
      <button className="RemoveHighlight" onClick={removeHighlight} disabled={!highlighted}>
        Remove Highlight
      </button>
      <button className="Toggle" onClick={handleLightMode}>
        {lightMode ? 'Dark' : 'Light'}
      </button>
    </div>
  );
};

export default QuestionBox;
