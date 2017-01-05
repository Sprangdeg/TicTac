import React, { Component } from 'react';
import './TicTac.css'

function Square(props) {
  return (
    <button className="square" onClick={() => props.onClick()}>
      {props.value}
    </button>
  );
}

function Board(props) {
  function renderSquare(i) {
    return <Square value={props.squares[i]} onClick={() => props.onClick(i)} />;
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
    );
}

class Game extends Component {
  constructor() {
      super();
      this.state = {
        history: [{
          squares: Array(9).fill(null)
        }],
        xIsNext: true,
        stepNumber: 0
      };
    }
  render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = calculateWinner(current.squares);
      const moves = history.map((step, move) => {
        const desc = move ?
          'Move #' + move :
          'Game start';
        return (
          <li>
            <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
          </li>
        );
      });

      let status;
      if (winner) {
        status = 'Winner: ' + winner;
      } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }
      return (
        <div>
          <div className="game-board">
            <Board squares={current.squares} onClick={(i) => this.handleClick(i)} />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }

    jumpTo(step) {
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) ? false : true,
      });
    }

    handleClick(i) {
     const history = this.state.history;
     const current = history[this.state.stepNumber];
     const squares = current.squares.slice();
     if (calculateWinner(squares) || squares[i]  || isDraw(squares)) {
       return;
     }
     squares[i] = this.state.xIsNext ? 'X' : 'O';
     this.setState({
       history: history.concat([{
         squares: squares
       }]),
       xIsNext: !this.state.xIsNext,
     });
     this.state.stepNumber = history.length;
    }
  }

function isDraw(squares){
  for(let i = 0; i < squares.length; i++){
    if(squares[i] === null){
      return false;
    }
  }
  return true;
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

export default Game;
