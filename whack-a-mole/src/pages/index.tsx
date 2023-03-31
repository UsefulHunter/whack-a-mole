import styles from '../styles/Main.module.css'
import { useState } from 'react'


export default function Home() {
  const [score, setScore] = useState(0);
  const [holes, setHoles] = useState([])
  const [activeHole, setActiveHole] = useState(null);
  const [timeUp, setTimeUp] = useState(false);
  const [timeLimit, setTimeLimit] = useState(12000);

  const randomTime = (min:number, max:number) => {
    return Math.round(Math.random() * (max - min) + min);
  }

  const randomHole:(holes:any)=>void = (holes:any) => {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    if (hole === activeHole) {
      return randomHole(holes);
    }
    setActiveHole(hole);
  }

  const peep = () => {
    const time = randomTime(200, 1000);
    const hole = randomHole(holes);
    setTimeout(() => {
      setActiveHole(null);
      if (!timeUp) peep();
    }, time);
  }

  const startGame = () => {
    setScore(0);
    setTimeUp(false);
    peep();
    setTimeout(() => setTimeUp(true), timeLimit);
  }

  const whack = (e:any) => {
    if (!e.isTrusted) return; //only human clicks will work
    setScore(score + 1);
    e?.target?.parentNode?.classList.remove('up');
  }

  const handleTimeLimit = (e:any) => {
    setTimeLimit(e.target.value * 1000);
  }

  const handleHoles = (e:any) => {
    //typed holes
    const holes:any = [];
    for (let i = 0; i < e.target.value; i++) {
      holes.push(i);
    }
    setHoles(holes);
  }

  const handleScore = (e:any) => {
    setScore(e.target.value);
  }

  const handleTimeUp = (e:any) => {
    setTimeUp(e.target.value);
  }

  const handleActiveHole = (e:any) => {
    setActiveHole(e.target.value);
  }

  const handleRandomHole = (e:any) => {
    randomHole(holes);
  }

  const handlePeep = (e:any) => {
    peep();
  }

  const handleStartGame = (e:any) => {
    startGame();
  }

  const handleWhack = (e:any) => {
    whack(e);
  }



  return (
    <>
      <div className={styles.container}>
        </div>
    </>
  )
}
