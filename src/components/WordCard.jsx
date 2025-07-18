// src/components/WordCard.jsx
import React, { useState } from 'react';

const WordCard = ({ wordData }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const { word, definition, example, chineseDefinition } = wordData;

  // Handle multi-line definitions
  const definitionLines = definition.split('\n').map((line, index) => (
    <React.Fragment key={index}>
      {line}
      <br />
    </React.Fragment>
  ));

  return (
    <div className={`word-card ${isOpen ? 'open' : ''}`} onClick={toggleOpen}>
      <div className="word-card-header">
        <h2>{word}</h2>
        <span className="toggle-icon">+</span>
      </div>

      <div className="word-card-details">
        <strong>Definition</strong>
        <p>{definitionLines}</p>

        <strong>Chinese Definition</strong>
        <p className="chinese-def">{chineseDefinition}</p>

        <strong>Example Sentence</strong>
        <p>{example}</p>
      </div>
    </div>
  );
};

export default WordCard;