export type ControlsProps = {
  isRunning: boolean;
  onStartStop: () => void;
  onReset: () => void;
};

const Controls: React.FC<ControlsProps> = ({ isRunning, onStartStop, onReset }) => {
  return (
    <div className="controls">
      <button id="start_stop" onClick={onStartStop}>
        {isRunning ? "Pause" : "Start"}
      </button>
      <button id="reset" onClick={onReset}>
        Reset
      </button>
    </div>
  );
};

export default Controls;
