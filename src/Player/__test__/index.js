import Player from '../../Player';

describe('Player', () => {
  it('New player object should have a name property', () => {
    const name = 'Robert';
    const player = new Player({
      name,
    });
    expect(player.getName()).toBe(name);
  });
});