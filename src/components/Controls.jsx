// src/components/Controls.jsx
import React from 'react';

const Controls = ({ onFilterChange, onShuffle, onSetView, currentFilter }) => {
  return (
    <div className="controls-container">
      <div className="filters">
        <span>Filter by:</span>
        <button onClick={() => onFilterChange('all')} className={currentFilter === 'all' ? 'active' : ''}>All</button>
        <button onClick={() => onFilterChange('new')} className={currentFilter === 'new' ? 'active' : ''}>New</button>
        <button onClick={() => onFilterChange('learning')} className={currentFilter === 'learning' ? 'active' : ''}>Learning</button>
        <button onClick={() => onFilterChange('mastered')} className={currentFilter === 'mastered' ? 'active' : ''}>Mastered</button>
      </div>
      <div className="actions">
        <button onClick={onShuffle} className="btn-secondary">Shuffle</button>
        <button onClick={() => onSetView('quiz')} className="btn-primary">Start Quiz</button>
      </div>
    </div>
  );
};

export default Controls;