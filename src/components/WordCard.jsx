// src/components/WordCard.jsx
import React from 'react';

const WordCard = ({ wordData, onToggleOpen, onUpdateStatus, isOpen }) => {
  const { word, partOfSpeech, definition, example, chineseDefinition, status } = wordData;

  // Handle multi-line definitions
  const definitionLines = definition.split('\n').map((line, index) => (
    <React.Fragment key={index}>
      {line}
      <br />
    </React.Fragment>
  ));

  const handleStatusUpdate = (e, newStatus) => {
    e.stopPropagation(); // Prevents the card from toggling when a button is clicked
    onUpdateStatus(wordData.id, newStatus);
  };

  return (
    <div className={`word-card ${isOpen ? 'open' : ''} status-${status || 'new'}`} onClick={() => onToggleOpen(wordData.id)}>
      <div className="word-card-header">
        <h2>{word} <span className="part-of-speech">{partOfSpeech}</span></h2>
        <span className="toggle-icon">+</span>
      </div>

      <div className="word-card-details">
        <strong>Definition</strong>
        <p>{definitionLines}</p>

        <strong>Chinese Definition</strong>
        <p className="chinese-def">{chineseDefinition}</p>

        <strong>Example Sentence</strong>
        <p><em>{example}</em></p>

        <div className="card-actions">
          <button onClick={(e) => handleStatusUpdate(e, 'learning')} className="btn-learning">
            Still Learning
          </button>
          <button onClick={(e) => handleStatusUpdate(e, 'mastered')} className="btn-mastered">
            Mastered!
          </button>
        </div>
      </div>
    </div>
  );
};

export default WordCard;