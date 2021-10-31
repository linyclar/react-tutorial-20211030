import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  )
}


function Board(props) {
  const renderSquare = (i) => {
    return(
      <Square
         value={props.squares[i]}
         onClick={() => props.onClick(i)} />
    )
  }

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  )
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)])
  const [xIsNext, setXIsNext] = useState(true)
  const squares = history[history.length - 1]
  const setSquares = (squares) => {
    setHistory(history.concat([squares]))
  }

  const player = () => xIsNext ? 'X' : 'O'
  const handleClick = (i) => {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const tempSquares = [...squares]
    tempSquares[i] = player()
    setSquares(tempSquares)
    setXIsNext(!xIsNext)
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + player();
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={squares} onClick={handleClick} status={status} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{/* TODO */}</ol>
      </div>
    </div>
  );
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
