import BoardModel from 'components/Board/BoardModel';

describe('BoardModel', () => {
  let model;

  beforeEach(() => {
    model = new BoardModel(2, 2);
  });

  describe('createBoardColors', () => {
    it('should return lightgrey board', () => {
      expect(model.createBoardColors()).to.deep.equal([['lightgrey', 'lightgrey'], ['lightgrey', 'lightgrey']]);
    });
  });

  describe('isLastColumn', () => {
    it('should return true when current column is last column', () => {
      model.nbMove = 2;

      expect(model.isLastColumn()).to.be.true;
    });

    it('should return false when current column is first column', () => {
      model.nbMove = 1;

      expect(model.isLastColumn()).to.be.false;
    });
  });

  describe('isLastMove', () => {
    it('should return true when 4 move', () => {
      model.nbMove = 4;

      expect(model.isLastMove()).to.be.true;
    });

    it('should return false when 2 move', () => {
      model.nbMove = 2;

      expect(model.isLastMove()).to.be.false;
    });
  });

  describe('getIndexes', () => {
    it('first move should return row 0, col 0', () => {
      model.move();

      expect(model.getIndexes()).to.deep.equal({ row: 0, col: 0 });
    });

    it('last col move should return row 0, col 1', () => {
      model.nbMove = 1;
      model.move();

      expect(model.getIndexes()).to.deep.equal({ row: 0, col: 1 });
    });

    it('next row move should return row 1, col 0', () => {
      model.nbMove = 2;
      model.move();

      expect(model.getIndexes()).to.deep.equal({ row: 1, col: 0 });
    });

    it('last move should return row 1, col 1', () => {
      model.nbMove = 3;
      model.move();

      expect(model.getIndexes()).to.deep.equal({ row: 1, col: 1 });
    });
  });
});
