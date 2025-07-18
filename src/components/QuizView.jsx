// src/components/QuizView.jsx
import React, { useState, useEffect } from 'react';
import _ from 'lodash'; // You'll need to install lodash: npm install lodash

const QuizView = ({ words, onSetView, onUpdateStatus }) => {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  // Focus on words that are not yet mastered
  const learningWords = words.filter(w => w.status !== 'mastered');
  
  const generateQuestion = () => {
    if (learningWords.length === 0) {
      setCurrentQuestion(null); // No more words to quiz!
      return;
    }

    const questionWord = _.sample(learningWords);
    const correctDef = questionWord.definition;

    const otherWords = _.sampleSize(words.filter(w => w.id !== questionWord.id), 3);
    const incorrectDefs = otherWords.map(w => w.definition);

    const options = _.shuffle([correctDef, ...incorrectDefs]);
    
    setCurrentQuestion({
      word: questionWord,
      options: options,
      correctAnswer: correctDef,
    });
    
    // Reset state for the new question
    setSelectedAnswer(null);
    setIsCorrect(null);
  };

  useEffect(() => {
    generateQuestion();
  }, [words]); // Re-generate if the source words change

  const handleAnswer = (option) => {
    setSelectedAnswer(option);
    const correct = option === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    
    // Update word status based on answer
    if (correct) {
      onUpdateStatus(currentQuestion.word.id, 'mastered');
    } else {
      onUpdateStatus(currentQuestion.word.id, 'learning');
    }
  };

  if (!currentQuestion) {
    return (
      <div className="quiz-view">
        <h2>Quiz Complete!</h2>
        <p>You've mastered all the words, or there are no words left to quiz.</p>
        <button onClick={() => onSetView('study')} className="btn-primary">Back to Study</button>
      </div>
    );
  }

  return (
    <div className="quiz-view">
      <h2>What is the definition of "{currentQuestion.word.word}"?</h2>
      <div className="quiz-options">
        {currentQuestion.options.map((option, index) => {
          let buttonClass = '';
          if (selectedAnswer) {
            if (option === currentQuestion.correctAnswer) {
              buttonClass = 'correct';
            } else if (option === selectedAnswer) {
              buttonClass = 'incorrect';
            }
          }
          return (
            <button
              key={index}
              className={`quiz-option ${buttonClass}`}
              onClick={() => handleAnswer(option)}
              disabled={selectedAnswer !== null}
            >
              {option}
            </button>
          );
        })}
      </div>
      {selectedAnswer && (
        <div className="quiz-feedback">
          {isCorrect ? <p className="feedback-correct">Correct!</p> : <p className="feedback-incorrect">Not quite. Keep trying!</p>}
          <button onClick={generateQuestion} className="btn-primary">Next Question →</button>
        </div>
      )}
      <button onClick={() => onSetView('study')} className="btn-secondary back-to-study">Exit Quiz</button>
    </div>
  );
};

export default QuizView;