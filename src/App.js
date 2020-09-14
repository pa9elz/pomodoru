import React, { useState, useRef } from 'react';
import useSound, { ButtonContents } from 'use-sound';
import boopSfx from './1.mp3';
import soundUrl from './1.mp3';

import './App.css';

const BoopButton = () => {
  const [play, { stop }] = useSound(boopSfx,
    { volume: 0.5 });
  return <button onClick={play}>Boop!</button>;
}

function padTime(time) {
  return time.toString().padStart(2, '0');
}

export default function App() {
  const [title, setTitle] = useState('Let the countdown begin!!!');
  const mins = 5;
  const [timeLeft, setTimeLeft] = useState(mins);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);
  const [play, { stop }] = useSound(
    soundUrl,
    { volume: 0.5 }
  );

  const [isHovering, setIsHovering] = React.useState(
    false
  );

  const ButtonHovering = () => {
    return <button
      onMouseEnter={() => {
        setIsHovering(true);
        play();
      }}
      onMouseLeave={() => {
        setIsHovering(false);
        stop();
      }}
    >
    </button>
  }

  function startTimer() {
    if (intervalRef.current !== null) return;

    setTitle(`You're doing great!`);
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setTimeLeft((timeLeft) => {
        if (timeLeft >= 1) return timeLeft - 1;
        resetTimer();
        return 0;
      });
    }, 1000);
  }

  function stopTimer() {
    if (intervalRef.current === null) return;
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setTitle('Keep it up!');
    setIsRunning(false);
  }

  function resetTimer() {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setTitle('Ready to go another round?');

    setTimeLeft(mins);
    setIsRunning(false);
  }

  const minutes = padTime(Math.floor(timeLeft / 60));
  const seconds = padTime(timeLeft - minutes * 60);

  return (
    <div className="app">
      <h2>{title}</h2>

      <div className="timer">
        <span>{minutes}</span>
        <span>:</span>
        <span>{seconds}</span>
      </div>

      <div className="buttons">
        {!isRunning && <button onClick={startTimer}>Start</button>}
        {isRunning && <button onClick={stopTimer}>Stop</button>}
        <button onClick={resetTimer}>Reset</button>
        <BoopButton>Test</BoopButton>
      </div>
    </div>
  );
}
