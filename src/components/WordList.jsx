// src/components/WordList.jsx
import React from 'react';
import WordCard from './WordCard';

const WordList = ({ words, onToggleOpen, onUpdateStatus, openCardId }) => {
  if (words.length === 0) {
    return <p className="empty-state">No words match the current filter. Try another one!</p>;
  }

  return (
    <div className="word-list">
      {words.map((wordData) => (
        <WordCard
          key={wordData.id}
          wordData={wordData}
          isOpen={openCardId === wordData.id}
          onToggleOpen={onToggleOpen}
          onUpdateStatus={onUpdateStatus}
        />
      ))}
    </div>
  );
};

export default WordList;
