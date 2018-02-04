import Grid from '../../Grid';

describe('Grid', () => {
  const selector = '.grid';
  const size = 3;

  beforeEach(function() {
    const fixture = '<div class="grid"></div>';

    document.body.insertAdjacentHTML('afterbegin', fixture);
    const grid = new Grid({
      container: document.querySelector(selector),
      size,
      state: {
        grid: [
          ['X', 'O', 'X'],
          ['O', 'O', 'X'],
          ['O', 'X', 'O'],
        ]
      },
    });

    grid.render();
  });

  afterEach(function() {
    document.body.removeChild(document.querySelector('.grid'));
  });

  it('Render should insert count of rows, which was passed to constructor', () => {
    expect(document.querySelector(selector).children.length).toBe(size);
  });

  it('Each row should have count of children, which was passed to constructor', () => {
    const row = document.querySelector(selector).children[0];

    expect(row.children.length).toBe(size);
  });

  it('Cell should contain player\'s name', () => {
    const row = document.querySelector(selector).children[0];

    expect(row.children[1].innerText).toBe('O');
  });
});