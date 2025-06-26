import { useEffect, useRef, useState } from "react";
import LengthControl from "./components/LengthControl";
import TimerDisplay from "./components/TimerDisplay";
import Controls from "./components/Controls";
import "./App.css";

const App = () => {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isSession, setIsSession] = useState(true);

  const intervalRef = useRef<number | null>(null);
  const beepRef = useRef<HTMLAudioElement>(null);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const handleIncrement = (type: "break" | "session") => {
    if (isRunning) return;
    if (type === "break" && breakLength < 60) setBreakLength(b => b + 1);
    if (type === "session" && sessionLength < 60) {
      const newLength = sessionLength + 1;
      setSessionLength(newLength);
      if (isSession) setTimeLeft(newLength * 60);
    }
  };

  const handleDecrement = (type: "break" | "session") => {
    if (isRunning) return;
    if (type === "break" && breakLength > 1) setBreakLength(b => b - 1);
    if (type === "session" && sessionLength > 1) {
      const newLength = sessionLength - 1;
      setSessionLength(newLength);
      if (isSession) setTimeLeft(newLength * 60);
    }
  };

  const handleStartStop = () => {
    setIsRunning(prev => !prev);
  };

  const handleReset = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setBreakLength(5);
    setSessionLength(25);
    setTimeLeft(25 * 60);
    setIsRunning(false);
    setIsSession(true);
    if (beepRef.current) {
      beepRef.current.pause();
      beepRef.current.currentTime = 0;
    }
  };

  useEffect(() => {
  if (!isRunning) {
    if (intervalRef.current) clearInterval(intervalRef.current);
    return;
  }

  intervalRef.current = window.setInterval(() => {
    setTimeLeft(prev => {
      if (prev === 0) {
  if (beepRef.current) {
    beepRef.current.currentTime = 0;
    beepRef.current.play().catch((e) => {
      console.log("Playback error:", e);
    });
  }
        
        const nextIsSession = !isSession;
        setIsSession(nextIsSession);
        return nextIsSession ? sessionLength * 60 : breakLength * 60;
      }

      return prev - 1;
    });
  }, 1000);

  return () => clearInterval(intervalRef.current!);
}, [isRunning, breakLength, sessionLength, isSession]);


  return (
    <div className="App">
      <h1>25 + 5 Clock</h1>
      <div className="length-controls">
        <LengthControl
          label="Break"
          length={breakLength}
          incrementId="break-increment"
          decrementId="break-decrement"
          lengthId="break-length"
          onIncrement={() => handleIncrement("break")}
          onDecrement={() => handleDecrement("break")}
        />
        <LengthControl
          label="Session"
          length={sessionLength}
          incrementId="session-increment"
          decrementId="session-decrement"
          lengthId="session-length"
          onIncrement={() => handleIncrement("session")}
          onDecrement={() => handleDecrement("session")}
        />
      </div>

      <TimerDisplay
        isSession={isSession}
        timeLeft={timeLeft}
        formatTime={formatTime}
      />
      <Controls
        isRunning={isRunning}
        onStartStop={handleStartStop}
        onReset={handleReset}
      />

     <audio
       id="beep"
       ref={beepRef}
       preload="auto"
       src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.mp3"
/>

    </div>
  );
};

export default App; 