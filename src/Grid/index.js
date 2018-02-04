import Classes from './index.css';

class Grid {
  constructor({ container, size, state }) {
    this.container = container;
    this.size = size;
    this.state = state;
  }

  render() {
    const documentFragment = document.createDocumentFragment();
    for(let i = 0; i < this.size; i++) {
      const row = document.createElement('div');
      row.className = Classes.row;
      row.setAttribute('data-row', i);
      for(let j = 0; j < this.size; j++) {
        const cell = document.createElement('div');
        cell.innerText = (this.state.grid[i] || {})[j] || '';
        cell.className = Classes.cell;
        cell.setAttribute('data-row', i);
        cell.setAttribute('data-cell', j);
        row.appendChild(cell);
      }
      documentFragment.appendChild(row);
    }

    this.container.innerHTML = '';
    this.container.appendChild(documentFragment);
  }
}

export default Grid;