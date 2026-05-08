import Square from "./Square";

function Board({ board, onSquareClick }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {board.map((cell, index) => (
        <Square key={index} value={cell} onClick={() => onSquareClick(index)} />
      ))}
    </div>
  );
}

export default Board;
