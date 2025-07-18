// src/App.jsx
import React from 'react';
import WordList from './components/WordList';
import { vocabularyData } from './data/vocabulary';

function App() {
  return (
    <div className="App">
      <h1>Interactive Vocabulary List</h1>
      <WordList words={vocabularyData} />
    </div>
  );
}

export default App;