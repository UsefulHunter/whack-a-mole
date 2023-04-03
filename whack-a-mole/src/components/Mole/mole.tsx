import styles from "./mole.module.css";
import gsap from "gsap";
import { useState, useRef, useEffect } from "react";

const Mole = ({
  points,
  delay,
  speed,
  onWhack,
  minimumPoints = 10
}: {
  points: any;
  delay: any;
  speed: any;
  onWhack: any;
  minimumPoints?: number;
}) => {
  const moleRef = useRef(null);
  const waveRef = useRef<gsap.core.Tween | null>(null);
  const pointsRef = useRef(points);
  const [whacked, setWacked] = useState(false);

  const whack = () => {
    setWacked(true);
    onWhack(pointsRef.current);
  };

  useEffect(() => {
    gsap.set(moleRef.current, {
      yPercent: 100,
      display: "block"
    });
    waveRef.current = gsap.to(moleRef.current, {
      yPercent: 0,
      duration: speed,
      yoyo: true,
      repeat: -1,
      delay,
      repeatDelay: delay,
      onRepeat: () => {
        pointsRef.current = Math.max(pointsRef.current - 1, minimumPoints);
      }
    });
    return () => {
      waveRef.current?.kill();
    };
  }, [delay, speed, minimumPoints]);

  useEffect(() => {
    if (whacked) {
      pointsRef.current = points;
      waveRef?.current?.pause();
      gsap.to(moleRef.current, {
        yPercent: 100,
        duration: 0.5,
        onComplete: () => {
          gsap.delayedCall(gsap.utils.random(0.5, 1), () => {
            setWacked(false);
            waveRef?.current
              ?.restart()
              .timeScale(waveRef.current.timeScale() * 1.1);
          });
        }
      });
    }
  }, [whacked, points]);

  return (
    <div className={styles.container}>
      <div className={styles.hole}>
        <button className={styles.mole} onClick={whack} ref={moleRef}></button>
      </div>
    </div>
  );
};

export default Mole;
