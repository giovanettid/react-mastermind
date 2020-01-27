import ColorsMappers from 'components/Colors/ColorsMappers';

describe('ColorsMappers', () => {
  describe('nbOccurences', () => {
    const predicate = () => (color) => color === 'Black';

    it('when color has no occurences then return 0', () => {
      expect(ColorsMappers.nbOccurences(predicate)(['Yellow', 'Green'])('Black'))
        .to.equal(0);
    });

    it('when color has 1 occurence then return 1', () => {
      expect(ColorsMappers.nbOccurences(predicate)(['Black', 'Green'])('Black'))
        .to.equal(1);
    });

    it('when color has 2 occurences then return 2', () => {
      expect(ColorsMappers.nbOccurences(predicate)(['Black', 'Black'])('Black'))
        .to.equal(2);
    });
  });

  describe('correctPosition', () => {
    it('when position is correct then map true to correct attribute', () => {
      expect(ColorsMappers.correctPosition(['Red', 'Blue'])('Red', 0))
        .to.deep.equal({ correct: true, position: 0 });
    });

    it('when position is not correct then map false to correct attribute', () => {
      expect(ColorsMappers.correctPosition(['Red', 'Blue'])('Red', 1))
        .to.deep.equal({ correct: false, position: 1 });
    });
  });
});
