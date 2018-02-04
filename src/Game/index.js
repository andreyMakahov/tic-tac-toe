import autobind from 'autobind-decorator';
import Grid from '../Grid';
import Player from '../Player';

const STATUS_IDLE = 'idle';
const STATUS_PROGRESS = 'progress';
const STATUS_FINISHED = 'finished';

class Game {
  constructor({ gridSize, gridContainer, stateContainer }) {
    this.stateContainer = stateContainer;
    this.gridSize = gridSize;
    this.gridContainer = gridContainer;

    this.playerX = new Player({ name: 'X' });
    this.playerO = new Player({ name: 'O' });

    this.state = this.getInitialState(this.playerX, this.playerO);

    this.grid = new Grid({
      container: gridContainer,
      size: gridSize,
      state: this.state,
    });

    this.bindEventListeners();
  }

  start() {
    this.state.status = STATUS_PROGRESS;
    this.grid.render();
    this.renderState(this.getTurnPhrase());
  }

  @autobind
  reset() {
    this.state.grid = [];
    this.state.score = this.getInitialScoreState(this.playerX, this.playerO);
    this.state.countSteps = 0;
    this.state.status = STATUS_PROGRESS;
    this.renderState(this.getTurnPhrase());
    this.grid.render();
  }

  getInitialState(playerX, playerO) {
    return {
      grid: [],
      countSteps: 0,
      currentPlayer: playerX,
      score: this.getInitialScoreState(playerX, playerO),
      status: STATUS_IDLE,
    };
  }

  getTurnPhrase() {
    return `It is player ${this.state.currentPlayer.getName()}'s turn`;
  }

  getInitialScoreState(playerX, playerO) {
    return {
      horizontal: {
        [playerX.getName()]: {},
        [playerO.getName()]: {},
      },
      vertical: {
        [playerX.getName()]: {},
        [playerO.getName()]: {},
      },
      diagonal: {
        [playerX.getName()]: {},
        [playerO.getName()]: {},
      }
    };
  }

  toggleTurn() {
    const map = {
      [this.playerO.getName()]: this.playerX,
      [this.playerX.getName()]: this.playerO,
    };

    this.state.currentPlayer = map[this.state.currentPlayer.getName()];
    this.renderState(this.getTurnPhrase());
  }

  finish(player) {
    this.state.status = STATUS_FINISHED;
    this.renderState(`Player ${player.getName()} won!`);
  }

  draw() {
    this.state.status = STATUS_FINISHED;
    this.renderState('It is draw!');
  }

  renderState(message) {
    this.stateContainer.innerHTML = `<div>${message}</div>`;
  }

  recountScore(row, cell, player) {
    const playerName = player.getName();
    const score = this.state.score;
    const size = this.gridSize;

    score.horizontal[playerName][row] = (score.horizontal[playerName][row] || 0) + 1;
    if(score.horizontal[playerName][row] === size) return this.finish(player);

    score.vertical[playerName][cell] = (score.vertical[playerName][cell] || 0) + 1;
    if(score.vertical[playerName][cell] === size) return this.finish(player);

    if (row === cell) {
      score.diagonal[playerName].tlbr = (score.diagonal[playerName].tlbr || 0) + 1;

      if(score.diagonal[playerName].tlbr === size) return this.finish(player);
    } else if (size - row === cell + 1) {
      score.diagonal[playerName].trbl = (score.diagonal[playerName].trbl || 0) + 1;

      if(score.diagonal[playerName].trbl === size) return this.finish(player);
    }
  }

  @autobind
  handleCellClick(e) {
    const target = e.target;
    const row = parseInt(target.getAttribute('data-row'));
    const cell = parseInt(target.getAttribute('data-cell'));
    const player = this.state.currentPlayer;

    this.state.grid[row] = this.state.grid[row] || [];
    if (typeof this.state.grid[row][cell] === 'undefined') {
      this.state.grid[row][cell] = player.getName();
      this.recountScore(row, cell, player);
      this.grid.render();

      this.state.countSteps++;
      if (this.state.countSteps === Math.pow(this.gridSize, 2)) {
        this.draw();
      } else {
        this.state.status === STATUS_PROGRESS && this.toggleTurn();
      }
    }
  }

  bindEventListeners() {
    document.querySelector('.reset-btn').addEventListener('click', this.reset);
    this.gridContainer.addEventListener('click', this.handleCellClick);
  }
}

export default Game;