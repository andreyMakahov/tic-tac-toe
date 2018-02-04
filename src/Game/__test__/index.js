import Game from '../../Game';

describe('Game', () => {
  beforeEach(function() {
    const fixture = '<div class="fragment">' +
      '<div class="reset-btn"></div>' +
      '<div class="grid">' +
        '<div class="row" data-row="0">' +
        '<div class="cell" data-row="0" data-cell="0"></div>' +
        '<div class="cell" data-row="0" data-cell="1"></div>' +
        '<div class="cell" data-row="0" data-cell="2"></div>' +
        '</div>' +
        '<div class="row" data-row="1">' +
        '<div class="cell" data-row="1" data-cell="0"></div>' +
        '<div class="cell" data-row="1" data-cell="1"></div>' +
        '<div class="cell" data-row="1" data-cell="2"></div>' +
        '</div>' +
        '<div class="row" data-row="2">' +
        '<div class="cell" data-row="2" data-cell="0"></div>' +
        '<div class="cell" data-row="2" data-cell="1"></div>' +
        '<div class="cell" data-row="2" data-cell="2"></div>' +
        '</div>' +
      '</div>' +
        '<div class="state"></div>' +
      '</div>';

    document.body.insertAdjacentHTML('afterbegin', fixture);

    window.game = new Game({
      gridSize: 3,
      gridContainer: document.querySelector('.grid'),
      stateContainer: document.querySelector('.state'),
    });
  });

  afterEach(function() {
    document.body.removeChild(document.querySelector('.fragment'));
    delete window.game;
  });

  it('Constructor should build instances of two players', () => {
    expect(game.playerO).toBeDefined();
    expect(game.playerX).toBeDefined();
  });

  it('State should be defined after game object is built', () => {
    expect(game.state).toBeDefined();
  });

  it('Grid should be defined after game object is built', () => {
    expect(game.grid).toBeDefined();
  });

  it('Start should change status of the game', () => {
    game.start();

    expect(game.state.status).toBe('progress');
  });

  it('Reset should set count of steps to zero', () => {
    game.reset();

    expect(game.state.countSteps).toBe(0);
  });

  it('Initial state should return object with grid, contSteps, currentPlayer, score and status', () => {
    const playerX = { getName: () => 'X' };
    const playerO = { getName: () => 'O' };
    const state = game.getInitialState(playerX, playerO);

    expect(state.grid).toBeDefined();
    expect(state.countSteps).toBeDefined();
    expect(state.currentPlayer).toBeDefined();
    expect(state.score).toBeDefined();
    expect(state.status).toBeDefined();
  });

  it('Toggle should change current player', () => {
    expect(game.state.currentPlayer.getName()).toBe('X');

    game.toggleTurn();

    expect(game.state.currentPlayer.getName()).toBe('O');
  });

  it('Finish the game should change status to finished and render the winner\'s name', () => {
    const playerO = { getName: () => 'O' };
    game.finish(playerO);

    expect(game.state.status).toBe('finished');
    expect(document.querySelector('.state').querySelector('div').innerText).toBe(`Player O won!`);
  });

  it('Draw should change status to finished', () => {
    game.draw();
    expect(game.state.status).toBe('finished');
    expect(document.querySelector('.state').querySelector('div').innerText).toBe('It is draw!');
  });

  it('Recount should change state of score', () => {
    const playerX = { getName: () => 'X' };
    expect(game.state.score.horizontal['X'][0]).toBeUndefined();
    game.recountScore(0, 0, playerX);
    expect(game.state.score.horizontal['X'][0]).toBeDefined();
    expect(game.state.score.horizontal['X'][0]).toBe(1);
  });

  it('Recount should finish the game if one player collects enough score', () => {
    const playerX = { getName: () => 'X' };
    game.recountScore(0, 0, playerX);
    game.recountScore(0, 1, playerX);
    game.recountScore(0, 2, playerX);
    expect(game.state.status).toBe('finished');
  });

  it('HandleCellClick should insert the player\'s name to the cell', () => {
    const row = document.querySelector('.grid').children[0];
    const cell = row.children[0];
    const event = {
      target: cell,
    };
    game.handleCellClick(event);
    expect(game.state.grid[0][0]).toBe('X');
  });

  it('HandleCellClick should increase count of steps in the game', () => {
    const row = document.querySelector('.grid').children[0];
    const cell = row.children[0];
    const event = {
      target: cell,
    };
    expect(game.state.countSteps).toBe(0);
    game.handleCellClick(event);
    expect(game.state.countSteps).toBe(1);
  });

  it('HandleCellClick should finish the game with draw if count of steps equals count of cells', () => {
    game.state.status = 'progress';
    for(let i = 0; i < 3; i++) {
      for(let j = 0; j < 3; j++) {
        const event = {
          target: document.querySelector('.grid').children[i].children[j],
        };
        game.handleCellClick(event);
      }
    }

    expect(game.state.status).toBe('finished');
  });

});