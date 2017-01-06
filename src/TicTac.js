import React, { Component } from 'react';
import './TicTac.css'
import cross from './Assets/X.png';
import circle from './Assets/O.png';
import draw from './Assets/draw.png';

class Games extends Component {
  constructor() {
    super();
    this.state = {
      gameResults: Array(9).fill(null),
      xIsNext: true
    };
  }

  render() {
    const winner = calculateWinner(this.state.gameResults);
    const draw = isDraw(this.state.gameResults);
    let gameEnded = false;
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
      gameEnded = true;
    }
    else if(draw){
      status = 'Draw!';
      gameEnded = true;
    }
    else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return(
      <div>
        <div className="game-info">
          <div>{status}</div>
        </div>
        <div className="board-row">
          <Game gameEnded={gameEnded} xIsNext={this.state.xIsNext} onWin={this.onWin.bind(this, 0)} onClick={this.onClick.bind(this, 0)}/>
          <Game gameEnded={gameEnded} xIsNext={this.state.xIsNext} onWin={this.onWin.bind(this, 1)} onClick={this.onClick.bind(this, 1)}/>
          <Game gameEnded={gameEnded} xIsNext={this.state.xIsNext} onWin={this.onWin.bind(this, 2)} onClick={this.onClick.bind(this, 2)}/>
        </div>
        <div className="board-row">
          <Game gameEnded={gameEnded} xIsNext={this.state.xIsNext} onWin={this.onWin.bind(this, 3)} onClick={this.onClick.bind(this, 3)}/>
          <Game gameEnded={gameEnded} xIsNext={this.state.xIsNext} onWin={this.onWin.bind(this, 4)} onClick={this.onClick.bind(this, 4)}/>
          <Game gameEnded={gameEnded} xIsNext={this.state.xIsNext} onWin={this.onWin.bind(this, 5)} onClick={this.onClick.bind(this, 5)}/>
        </div>
        <div className="board-row">
          <Game gameEnded={gameEnded} xIsNext={this.state.xIsNext} onWin={this.onWin.bind(this, 6)} onClick={this.onClick.bind(this, 6)}/>
          <Game gameEnded={gameEnded} xIsNext={this.state.xIsNext} onWin={this.onWin.bind(this, 7)} onClick={this.onClick.bind(this, 7)}/>
          <Game gameEnded={gameEnded} xIsNext={this.state.xIsNext} onWin={this.onWin.bind(this, 8)} onClick={this.onClick.bind(this, 8)}/>
        </div>
      </div>
    );
  }

  onClick(i, result){
    this.setState({
      xIsNext: result
    });
  }

  onWin(i, result){
    const results = this.state.gameResults.slice();
    results[i] = result;
    this.setState({
      gameResults: results
    });
  }
}

class Game extends Component {
  constructor() {
    super();
    this.state = {
      squares: Array(9).fill(null),
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]  || isDraw(squares) || this.props.gameEnded) {
      return;
    }
    squares[i] = this.props.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
    });
    this.props.onClick(!this.props.xIsNext);

    if (calculateWinner(squares) || isDraw(squares)) {
      this.props.onWin(calculateWinner(squares));
    }
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    if (winner || isDraw(this.state.squares)) {
      status = 'Winner: ' + winner;
      return (
        drawWinner(winner)
      );
    }

    return (
      <div className="game-board">
        <Board squares={this.state.squares} onClick={(i) => this.handleClick(i)} />
      </div>
    );
  }
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

function Square(props) {
  return (
    <button className="square" onClick={() => props.onClick()}>
      {props.value}
    </button>
  );
}

function drawWinner(winner){
  if(winner === 'X'){
    return (<img src={cross} className="game-board" alt="CROSS" />);
  }
  else if(winner === 'O'){
    return (<img src={circle} className="game-board" alt="CIRCLE" />);
  }
  else{
    return (<img src={draw} className="game-board" alt="DRAW" />);
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

export default Games;
