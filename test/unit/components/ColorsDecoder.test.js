import ColorsDecoder from 'components/Colors/ColorsDecoder';

describe('ColorsDecoder', () => {
  let decoder;

  const createDecoder = colors => new ColorsDecoder(colors);

  beforeEach(() => {
    decoder = new ColorsDecoder(['Red', 'Blue', 'Yellow']);
  });

  describe('getNbPositions', () => {
    describe('none colors match', () => {
      it('should return 0 correct and 0 wrong', () => {
        expect(decoder.getNbPositions(['Black', 'Green', 'Black'])).to.deep.equal({
          correct: 0, wrong: 0, rest: 3,
        });
      });
    });

    describe('all correct positions', () => {
      it('should return 3 correct', () => {
        expect(decoder.getNbPositions(['Red', 'Blue', 'Yellow'])).to.deep.equal({
          correct: 3, wrong: 0, rest: 0,
        });
      });
    });

    describe('2 wrong positions', () => {
      it('should return 2 wrong and 0 correct', () => {
        expect(decoder.getNbPositions(['Blue', 'Red', 'Black'])).to.deep.equal({
          correct: 0, wrong: 2, rest: 1,
        });
      });
    });

    describe('same color has correct & wrong position but only once to decode ', () => {
      it('should return 1 correct and 0 wrong', () => {
        expect(decoder.getNbPositions(['Red', 'Red', 'Black'])).to.deep.equal({
          correct: 1, wrong: 0, rest: 2,
        });
      });
    });

    describe('same color has correct & wrong position and twice to decode', () => {
      it('should return 1 correct and 1 wrong', () => {
        expect(createDecoder(['Red', 'Blue', 'Red']).getNbPositions(['Red', 'Red', 'Black']))
          .to.deep.equal({ correct: 1, wrong: 1, rest: 1 });
      });
    });

    describe('same color has 2 wrong position but only once to decode', () => {
      it('should return 0 correct and 1 wrong', () => {
        expect(createDecoder(['Red', 'Blue', 'Red']).getNbPositions(['Blue', 'Yellow', 'Blue']))
          .to.deep.equal({ correct: 0, wrong: 1, rest: 2 });
      });
    });
  });

  describe('getCorrectPositions', () => {
    it('when 0 correct position then return empty array', () => {
      expect(decoder.getCorrectPositions(['Green', 'Green', 'Black'])).to.deep.equal([]);
    });

    it('when 1 correct & 1 wrong position then return index 0', () => {
      expect(decoder.getCorrectPositions(['Red', 'Green', 'Blue'])).to.deep.equal([0]);
    });

    it('when 2 correct position then return 0 and 2 indexes', () => {
      expect(decoder.getCorrectPositions(['Red', 'Green', 'Yellow'])).to.deep.equal([0, 2]);
    });
  });

  describe('getNbWrongPositions', () => {
    const truePredicate = () => true;
    const excludeFirst = (_, i) => i > 0;

    describe('none colors match', () => {
      it('should return 0', () => {
        expect(decoder.getNbWrongPositions(truePredicate)(['Black', 'Green', 'Black'])).to.equal(0);
      });

      describe('exclude index 0', () => {
        it('should return 0', () => {
          expect(createDecoder(['Red', 'Blue', 'Green', 'Yellow'])
            .getNbWrongPositions(excludeFirst)(['Red', 'Red', 'Red', 'Black'])).to.equal(0);
        });
      });
    });

    describe('1 wrong position', () => {
      describe('but twice to decode', () => {
        it('should return 1', () => {
          expect(createDecoder(['White', 'Green', 'White'])
            .getNbWrongPositions(truePredicate)(['Black', 'White', 'Red'])).to.equal(1);
        });
      });

      describe('but 3 times to decode', () => {
        it('should return 1', () => {
          expect(createDecoder(['White', 'White', 'White', 'Yellow'])
            .getNbWrongPositions(truePredicate)(['Black', 'Green', 'Red', 'White'])).to.equal(1);
        });
      });
    });

    describe('2 wrong positions', () => {
      it('should return 2', () => {
        expect(decoder.getNbWrongPositions(truePredicate)(['Blue', 'Red', 'Black'])).to.equal(2);
      });

      describe('one color twice to decode and another color has 1 wrong position', () => {
        it('should return 2', () => {
          expect(createDecoder(['White', 'Green', 'White'])
            .getNbWrongPositions(truePredicate)(['Black', 'White', 'Green'])).to.equal(2);
        });
      });

      describe('same color has 2 wrong position but only once to decode', () => {
        it('should return 1', () => {
          expect(createDecoder(['Red', 'Blue', 'Red'])
            .getNbWrongPositions(truePredicate)(['Blue', 'Yellow', 'Blue'])).to.equal(1);
        });
      });

      describe('same color has 2 wrong position and twice to decode', () => {
        it('should return 2', () => {
          expect(createDecoder(['White', 'Green', 'White', 'Yellow'])
            .getNbWrongPositions(truePredicate)(['Black', 'White', 'Red', 'White'])).to.equal(2);
        });
      });
    });

    describe('3 wrong positions', () => {
      describe('same color has 3 wrong position but only once to decode', () => {
        it('should return 1', () => {
          expect(createDecoder(['Red', 'Blue', 'Green', 'Yellow'])
            .getNbWrongPositions(truePredicate)(['Black', 'Red', 'Red', 'Red'])).to.equal(1);
        });
      });

      describe('same color has 2 wrong position and twice to decode', () => {
        describe('another color has 1 wrong position', () => {
          it('should return 3', () => {
            expect(createDecoder(['White', 'Green', 'White', 'Yellow'])
              .getNbWrongPositions(truePredicate)(['Black', 'White', 'Green', 'White'])).to.equal(3);
          });
        });
      });

      describe('same color has 2 wrong position but only once to decode', () => {
        describe('another color has 1 wrong position', () => {
          it('should return 2', () => {
            expect(createDecoder(['Red', 'Blue', 'Yellow'])
              .getNbWrongPositions(truePredicate)(['Blue', 'Yellow', 'Blue'])).to.equal(2);
          });
        });
      });
    });
  });
});
