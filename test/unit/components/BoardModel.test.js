import BoardModel from 'components/Board/BoardModel';

describe('BoardModel', () => {
  let model;

  beforeEach(() => {
    model = new BoardModel(2, 2);
  });

  describe('createBoardColors', () => {
    it('should return lightgrey board', () => {
      expect(model.createBoardColors()).toEqual([['lightgrey', 'lightgrey'], ['lightgrey', 'lightgrey']]);
    });
  });

  describe('isLastColumn', () => {
    it('should return true when current column is last column', () => {
      model.nbMove = 2;

      expect(model.isLastColumn()).toBeTruthy();
    });

    it('should return false when current column is first column', () => {
      model.nbMove = 1;

      expect(model.isLastColumn()).toBeFalsy();
    });
  });

  describe('isLastMove', () => {
    it('should return true when 4 move', () => {
      model.nbMove = 4;

      expect(model.isLastMove()).toBeTruthy();
    });

    it('should return false when 2 move', () => {
      model.nbMove = 2;

      expect(model.isLastMove()).toBeFalsy();
    });
  });

  describe('nextIndexes', () => {
    it('first move should return row 0, col 0', () => {
      expect(model.nextIndexes()).toEqual({ row: 0, col: 0 });
    });

    it('last col move should return row 0, col 1', () => {
      model.nbMove = 1;

      expect(model.nextIndexes()).toEqual({ row: 0, col: 1 });
    });

    it('next row move should return row 1, col 0', () => {
      model.nbMove = 2;

      expect(model.nextIndexes()).toEqual({ row: 1, col: 0 });
    });

    it('last move should return row 1, col 1', () => {
      model.nbMove = 3;

      expect(model.nextIndexes()).toEqual({ row: 1, col: 1 });
    });
  });
});
