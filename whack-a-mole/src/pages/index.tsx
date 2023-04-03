import Moles from "@/components/Moles/moles";
import Mole from "@/components/Mole/mole";
import styles from "../styles/Main.module.css";
import gsap from "gsap";
import Score from "@/components/Score/score";
import Timer from "@/components/Timer/timer";

import { useState } from "react";

const TIME_LIMIT = 120000;
const MOLES = 12;
const MOLE_SCORE = 10;
export default function Home() {
  const [score, setScore] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [timeUp, setTimeUp] = useState(false);
  const generateHoles = () =>
    new Array(12).fill(0).map(() => ({
      speed: gsap.utils.random(0.5, 1),
      delay: gsap.utils.random(0.5, 2),
      points: MOLE_SCORE
    }));

  const [moles, setMoles] = useState(generateHoles());
  const endGame = () => {
    setPlaying(false);
    setTimeUp(true);
  };

  const startGame = () => {
    setScore(0);
    setMoles(generateHoles());
    setPlaying(true);
    setTimeUp(false);
  };

  const onWhack = (points: any) => setScore(score + points);

  return (
    <>
      <div className={styles.container}>
        {!playing && !timeUp && (
          <>
            <button className={styles.button} onClick={startGame}>
              Start game
            </button>
          </>
        )}
        {playing && (
          <>
            <button className={styles.button} onClick={endGame}>
              End game
            </button>
            <Score score={score} />
            <Timer timeLimit={TIME_LIMIT} onTimeUp={endGame} />
            <div className={styles.molesContainer}>
              <Moles>
                {moles.map(({ speed, delay, points }, id) => (
                  <Mole
                    key={id}
                    onWhack={onWhack}
                    points={points}
                    delay={delay}
                    speed={speed}
                  />
                ))}
              </Moles>
            </div>
          </>
        )}
        {timeUp && (
          <>
            <Score score={score} />
            <button className={styles.button} onClick={startGame}>
              Play again
            </button>
          </>
        )}
      </div>
    </>
  );
}
