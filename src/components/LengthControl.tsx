type Props = {
  label: string;
  length: number;
  incrementId: string;
  decrementId: string;
  lengthId: string;
  onIncrement: () => void;
  onDecrement: () => void;
};

const LengthControl = ({
  label,
  length,
  incrementId,
  decrementId,
  lengthId,
  onIncrement,
  onDecrement,
}: Props) => {
  return (
    <div className="length-control">
      <h2 id={label.toLowerCase() + "-label"}>{label} Length</h2>
      <div>
        <button id={decrementId} onClick={onDecrement}>
          -
        </button>
        <span id={lengthId}>{length}</span>
        <button id={incrementId} onClick={onIncrement}>
          +
        </button>
      </div>
    </div>
  );
};

export default LengthControl;
 
