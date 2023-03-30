import ColorsPredicates from 'components/Colors/ColorsPredicates';

describe('ColorsPredicates', () => {
  describe('wrong', () => {
    it('when color is wrong at position the return true', () => {
      expect(
        ColorsPredicates.wrong(['Black', 'Green'])('Black', 1)
      ).toBeTruthy();
    });

    it('when color is correct at position the return false', () => {
      expect(
        ColorsPredicates.wrong(['Black', 'Green'])('Black', 0)
      ).toBeFalsy();
    });

    it('when color does not exist then return false', () => {
      expect(ColorsPredicates.wrong(['Black', 'Green'])('Red', 0)).toBeFalsy();
    });
  });

  describe('exclude', () => {
    it('when position not include in positions then return true', () => {
      expect(ColorsPredicates.exclude([0, 2])('Red', 1)).toBeTruthy();
    });

    it('when position is include in positions then return false', () => {
      expect(ColorsPredicates.exclude([0, 2])('Red', 2)).toBeFalsy();
    });
  });

  describe('same', () => {
    it('when is same color then return true', () => {
      expect(ColorsPredicates.same('Red')('Red')).toBeTruthy();
    });

    it('when is not same color then return false', () => {
      expect(ColorsPredicates.same('Red')('Blue')).toBeFalsy();
    });
  });
});
