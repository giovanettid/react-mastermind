
import GameConfiguration from 'components/Game/GameConfiguration';

import BoardStateMutator from 'components/Board/BoardStateMutator';

describe('GameConfiguration', () => {
  const configuration = new GameConfiguration();

  describe('new instance', () => {
    it('property colorsToPick has length of 6', () => {
      expect(configuration.colorsToPick).to.have.lengthOf(6);
    });

    it('property colorsToGuess has length of 4', () => {
      expect(configuration.colorsToGuess).to.have.lengthOf(4);
    });

    it('property stateMutator is intance of BoardStateMutator', () => {
      expect(configuration.stateMutator).to.be.instanceOf(BoardStateMutator);
    });
  });
});
