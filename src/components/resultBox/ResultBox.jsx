import React from 'react';
import './ResultBox.css';

const ResultBox = ({ result, options, visible, onBackToRoulette }) => {
  return (
    visible && (
      <div className="result-box">
        <h1>{result}</h1>
        {options && options.length > 0 && (
          options.map((option, index) => (
            <h1 className='options' key={index}>{option}</h1>
          ))
        )}
        <button onClick={onBackToRoulette}>Volver a batear</button>
      </div>
    )
  );
};

export default ResultBox;
