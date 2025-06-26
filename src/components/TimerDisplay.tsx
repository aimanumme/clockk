interface TimerDisplayProps {
  isSession: boolean;
  timeLeft: number;
  formatTime: (time: number) => string;
}

const TimerDisplay = ({ isSession, timeLeft, formatTime }: TimerDisplayProps) => {
  return (
    <div id="timer">
      <h2 id="timer-label">{isSession ? 'Session' : 'Break'}</h2>
      <div id="time-left" style={{ fontSize: '2rem' }}>
        {formatTime(timeLeft)}
      </div>
    </div>
  );
};

export default TimerDisplay;
 