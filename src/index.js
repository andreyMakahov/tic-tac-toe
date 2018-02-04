import Game from './Game';
import '../styles/index.css';

const GRID_SIZE = 3;

const game = new Game({
  gridSize: GRID_SIZE,
  gridContainer: document.querySelector('.grid'),
  stateContainer: document.querySelector('.state'),
});
window.game = game;

game.start();
