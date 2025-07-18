// src/App.jsx
import React, { useState, useEffect } from 'react';
import _ from 'lodash'; // npm install lodash
import WordList from './components/WordList';
import Controls from './components/Controls';
import QuizView from './components/QuizView';
import { vocabularyData } from './data/vocabulary';

// Function to load state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('vocabState');
    if (serializedState === null) {
      return undefined; // No state in localStorage, so we'll initialize
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Could not load state", err);
    return undefined;
  }
};

// Function to save state to localStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('vocabState', serializedState);
  } catch (err) {
    console.error("Could not save state", err);
  }
};


function App() {
  const [allWords, setAllWords] = useState([]);
  const [filteredWords, setFilteredWords] = useState([]);
  const [filter, setFilter] = useState('all');
  const [openCardId, setOpenCardId] = useState(null);
  const [view, setView] = useState('study'); // 'study' or 'quiz'

  // Load initial data and saved progress
  useEffect(() => {
    const savedProgress = loadState();
    const initialWords = vocabularyData.map(word => ({
      ...word,
      status: savedProgress?.[word.id] || 'new', // 'new', 'learning', or 'mastered'
    }));
    setAllWords(initialWords);
    setFilteredWords(initialWords);
  }, []);

  // Effect to save progress whenever allWords changes
  useEffect(() => {
    if (allWords.length > 0) {
      const progressToSave = allWords.reduce((acc, word) => {
        acc[word.id] = word.status;
        return acc;
      }, {});
      saveState(progressToSave);
    }
  }, [allWords]);


  // Effect to update the displayed list when filter or words change
  useEffect(() => {
    let wordsToShow = [...allWords];
    if (filter !== 'all') {
      wordsToShow = allWords.filter(word => word.status === filter);
    }
    setFilteredWords(wordsToShow);
  }, [filter, allWords]);

  const handleUpdateStatus = (id, newStatus) => {
    setAllWords(prevWords =>
      prevWords.map(word =>
        word.id === id ? { ...word, status: newStatus } : word
      )
    );
  };
  
  const handleToggleOpen = (id) => {
    setOpenCardId(prevId => (prevId === id ? null : id));
  };

  const handleShuffle = () => {
    setFilteredWords(prevWords => _.shuffle([...prevWords]));
  };

  const masterCount = allWords.filter(w => w.status === 'mastered').length;

  return (
    <div className="App">
      <h1>SAT Smart Vocab</h1>
      <div className="progress-tracker">
        <p>{masterCount} / {allWords.length} words mastered</p>
        <div className="progress-bar-container">
          <div 
            className="progress-bar" 
            style={{ width: `${(masterCount / allWords.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {view === 'study' ? (
        <>
          <Controls 
            onFilterChange={setFilter} 
            onShuffle={handleShuffle}
            onSetView={setView}
            currentFilter={filter}
          />
          <WordList
            words={filteredWords}
            openCardId={openCardId}
            onToggleOpen={handleToggleOpen}
            onUpdateStatus={handleUpdateStatus}
          />
        </>
      ) : (
        <QuizView words={allWords} onSetView={setView} onUpdateStatus={handleUpdateStatus} />
      )}
    </div>
  );
}

export default App;