import React, { useState, useEffect } from 'react';
import { Wheel } from 'react-custom-roulette';
import ResultBox from '../resultBox/ResultBox';
import './WheelWithButton.css';
import quizData from '../../data/preguntas_baseball_biblico.json';

const WheelWithButton = () => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [spinComplete, setSpinComplete] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState('');
  const [multipleSelection, setMultipleSelection] = useState(null);
  const [usedQuestions, setUsedQuestions] = useState(new Set()); // Track used questions

  const data = [
    { option: 'SINGLE', style: { backgroundColor: '#ffd116', textColor: 'black' } },
    { option: 'DOUBLE', style: { backgroundColor: '#4e7a23', textColor: 'black' } },
    { option: 'TRIPLE', style: { backgroundColor: '#b43b2d', textColor: 'black' } },
  ];

  // Load used questions from local storage when component mounts
  useEffect(() => {
    const storedQuestions = localStorage.getItem('usedQuestions');
    if (storedQuestions) {
      setUsedQuestions(new Set(JSON.parse(storedQuestions)));
    }
  }, []);

  // Save used questions to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('usedQuestions', JSON.stringify([...usedQuestions]));
  }, [usedQuestions]);

  const handleSpin = () => {
    const newPrizeNumber = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
    setShowResult(false);
    setSpinComplete(false);
  };

  const handleBackToRoulette = () => {
    setShowResult(false);
    setSpinComplete(false);
  };

  const handleStop = () => {
    setMustSpin(false);
    setSpinComplete(true);
    
    // Map the prizeNumber to the corresponding category and select a random question
    const categoryKey = `categoria_${prizeNumber + 1}`; // +1 to match the JSON structure
    const categoryData = quizData[categoryKey];

    if (categoryData) {
      const questions = categoryData.preguntas.filter(question => 
        !usedQuestions.has(question.pregunta) // Filter out already used questions
      );

      if (questions.length > 0) {
        const randomIndex = Math.floor(Math.random() * questions.length);
        const selected = questions[randomIndex].pregunta;
        if (questions[randomIndex]?.opciones) {
          // The field exists and is truthy, so you can proceed here
          setSelectedQuestion(selected);
          setMultipleSelection(questions[randomIndex]?.opciones);
        } else {
          setSelectedQuestion(selected);
          setMultipleSelection(null);
        }
        
        setUsedQuestions(prev => new Set(prev).add(selected)); // Add selected question to used questions
      } else {
        // All questions have been used; reset the used questions
        alert('All questions have been used! Resetting the questions.');
        setUsedQuestions(new Set());
      }
    }

    setTimeout(() => {
      setShowResult(true);
    }, 300);
  };

  return (
    <div className="wheel-container">
      {!spinComplete && (
        <>
          <div className="wheel">
            <Wheel
              mustStartSpinning={mustSpin}
              prizeNumber={prizeNumber}
              data={data}
              backgroundColors={['#3e3e3e', '#df3428']}
              textColors={['#ffffff']}
              onStopSpinning={handleStop}
            />
          </div>
          <button onClick={handleSpin}>BATEAR</button>
        </>
      )}

      {showResult && <ResultBox result={selectedQuestion} options={multipleSelection} visible={showResult} onBackToRoulette={handleBackToRoulette} />}
    </div>
  );
};

export default WheelWithButton;
