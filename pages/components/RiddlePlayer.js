import styles from "../../styles/Home.module.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function RiddlePlayer() {
  const defaultRiddles = [
    {
      question:
        "A man pushes his car to a hotel and tells the owner he’s bankrupt. Why?",
      answer: "He’s playing Monopoly",
    },
    {
      question:
        "A man stands on one side of a river, his dog on the other. The man calls his dog, who immediately crosses the river without getting wet and without using a bridge or a boat. How did the dog do it?",
      answer: "The river was frozen",
    },
    {
      question:
        "What has cities, but no houses; forests, but no trees; and water, but no fish?",
      answer: "A map",
    },
    {
      question: "How can 8 + 8 = 4?",
      answer: "When you think in terms of time. 8 AM + 8 hours= 4 o’clock.",
    },
  ];
  const [riddles, setRiddles] = useState(defaultRiddles);
  const [index, setIndex] = useState(0);
  const [revealAnswer, setRevealAnswer] = useState(false);
  const [isLastQuestion, setIsLastQuestion] = useState(false);
  const showAnswer = () => {
    setRevealAnswer(true);
  };

  const nextQuestion = () => {
    setRevealAnswer(false);
    setIsLastQuestion(index + 1 >= riddles.length - 1);
    setIndex(index + 1);
    setTimer(20);
  };

  const replaceRiddles = (newRiddles) => {
    setIndex(0);
    setRevealAnswer(false);
    setRiddles(newRiddles);
    setIsLastQuestion(newRiddles.length <= 1);
    setTimer(20);
  };

  const [seconds, setTimer] = useState(20);
  useEffect(() => {
    const timeout = setTimeout(() => setTimer(seconds - 1), 1000);
    if (seconds <= 0) clearTimeout(timeout);
    return () => {
      clearTimeout(timeout);
    };
  }, [seconds]);

  const m = Math.floor((seconds % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const s = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");

  const onFileInputChange = (event) => {
    uploadFiles(event.target.files);
  };

  const uploadFiles = async (files) => {
    const formData = new FormData();
    Object.entries(files).forEach((file) => {
      formData.append("files", file[1]);
    });
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    try {
      const response = await axios.post("/api/uploader", formData, config);
      replaceRiddles(response.data.data);
    } catch (err) {
      alert(err);
      console.error(err);
    }
  };

  return (
    <>
      {!!seconds && seconds < 3600 && (
        <h2>
          {m}:{s}
        </h2>
      )}
      {seconds <= 0 && <h2>00:00</h2>}
      <p className={styles.description}>{riddles[index].question}</p>
      <p hidden={revealAnswer} onClick={showAnswer} className={styles.code}>
        Reveal answer
      </p>
      <p hidden={!revealAnswer} className={styles.code}>
        {riddles[index].answer}
      </p>
      <div>
        <button onClick={nextQuestion} hidden={!revealAnswer || isLastQuestion}>
          Next
        </button>
      </div>

      <div className={styles.imageUpload}>
        <label>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z"/>
            <path d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5L9.5 0zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z"/>
        </svg>
        </label>
        <input type="file" onChange={onFileInputChange} multiple/>
      </div>
    </>
  );
}
