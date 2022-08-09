
import styles from '../../styles/Home.module.css'
import React, { useState, useEffect } from 'react'

export default function RiddlePlayer() {
    const riddles = [
        {question:'A man pushes his car to a hotel and tells the owner he’s bankrupt. Why?',
         answer: 'He’s playing Monopoly'},
        {question:'A man stands on one side of a river, his dog on the other. The man calls his dog, who immediately crosses the river without getting wet and without using a bridge or a boat. How did the dog do it?',
         answer: 'The river was frozen'},
        {question:'What has cities, but no houses; forests, but no trees; and water, but no fish?',
         answer: 'A map'},
        {question:'How can 8 + 8 = 4?', answer: 'When you think in terms of time. 8 AM + 8 hours= 4 o’clock.'},
    ]
    const [index, setIndex] = useState(0);
    const [revealAnswer, setRevealAnswer] = useState(false);
    const [isLastQuestion, setIsLastQuestion] = useState(false)
    const showAnswer = ()=>{
        setRevealAnswer(true)
    }
    
    const nextQuestion= ()=>{
        setRevealAnswer(false);
        setIsLastQuestion(index+1 >= riddles.length-1)
        setIndex(index+1)
        setTimer(20)
    }

    const [seconds, setTimer] = useState(20);
    useEffect(() => {
      const timeout = setTimeout(() => setTimer(seconds - 1), 1000);
      if (seconds <= 0) clearTimeout(timeout);
      return () => {
        clearTimeout(timeout);
      };
    }, [seconds]);
  
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, "0");
    const s = Math.floor(seconds % 60).toString().padStart(2, "0");
  
    return (
        <>
        {!!seconds && seconds < 3600 && <h2>{m}:{s}</h2>}
        {seconds <= 0 && <h2>00:00</h2>}
        <p className={styles.description}>
        {riddles[index].question}
        </p>
        <p hidden={revealAnswer} onClick={showAnswer} className={styles.code}>Reveal answer</p>
        <p hidden={!revealAnswer} className={styles.code}>{riddles[index].answer}</p>
        <div>
        <button onClick={nextQuestion} hidden={!revealAnswer || isLastQuestion}>Next</button>
        </div>
        </>
    )
  }