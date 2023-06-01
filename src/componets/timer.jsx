import React, { useEffect, useState } from 'react';
import s from './timer.module.css';
const Timer = () => {
  const [time, setTime] = useState(0);
  const [timerOn, setTimerOn] = useState(false);
  const [inputValue, setInputValue] = useState('');
  useEffect(() => {
    let interval = null;
    if (timerOn && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      setTimerOn(false);
      clearInterval(interval);
      alert('BOOOOOOOOOOOOM');
    }

    return () => clearInterval(interval);
  }, [timerOn, time]);
  const timerReset = () => {
    setTimerOn(false);
    setTime(0);
    setInputValue('');
  };
  const inputValueChange = (e) => {
    setInputValue(e.target.value);
  };
  const buttonStop = () => {
    setTimerOn(false);
  };
  const buttonStart = () => {
    if (inputValue !== '' && !Number.isNaN(Number(inputValue))) {
      setTimerOn(true);
      setTime(Number(inputValue));
    }
  };
  const formatTime = () => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes} : ${seconds < 10 ? '0' + seconds : seconds}`;
  };
  return (
    <div className={s.timercontainer}>
      <div className={s.timer}>
        <h1>TIMER</h1>
        <div className={s.time}>{formatTime(time)}</div>
        <div className="input">
          <input
            type="number"
            placeholder="Задайте время"
            value={inputValue}
            onChange={inputValueChange}
          />
        </div>
        <div className="buttons">
          {!timerOn && (
            <button className={s.start} disabled={inputValue === ''} onClick={buttonStart}>
              START
            </button>
          )}
          {timerOn && (
            <button className={s.stop} onClick={buttonStop}>
              STOP
            </button>
          )}
          <button className={s.reset} onClick={timerReset}>
            RESET
          </button>
        </div>
      </div>
    </div>
  );
};
export default Timer;
