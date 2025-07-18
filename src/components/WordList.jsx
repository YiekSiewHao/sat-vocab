// src/components/WordList.jsx
import React from 'react';
import WordCard from './WordCard';

const WordList = ({ words }) => {
  return (
    <div className="word-list">
      {words.map((wordData) => (
        <WordCard key={wordData.word} wordData={wordData} />
      ))}
    </div>
  );
};

export default WordList;