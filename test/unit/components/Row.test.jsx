import React from 'react';

import Row from 'components/Row/Row';

describe('Row', () => {
  const createWrapper = color => mount(
    <table><tbody>
      <Row nextCode={{ row: 4, item: 2 }} color={color} />
    </tbody></table>);

  const createWrapperYellow = () => createWrapper('Yellow');

  const createWrapperNoColor = () => createWrapper('');

  describe('render', () => {
    it('should display a Row with 4 Code Hole', () => {
      expect(createWrapperYellow().find('.CodeHole')).to.have.lengthOf(4);
    });

    it('should display a Row with 4 Key small Hole', () => {
      expect(createWrapperYellow().find('.Hole_small')).to.have.lengthOf(4);
    });

    it('should display a Row with 4 yellow Code Hole', () => {
      expect(createWrapperYellow().find('.CodeHole_color_yellow')).to.have.lengthOf(4);
    });

    describe('when no color', () => {
      it('should display a Row with 4 lightgray Code Hole', () => {
        expect(createWrapperNoColor().find('.CodeHole_color_lightgrey')).to.have.lengthOf(4);
      });
    });
  });

  describe('props', () => {
    it('should receive nextCode prop', () => {
      expect(createWrapperYellow().find(Row).prop('nextCode')).to.deep.equal({ row: 4, item: 2 });
    });
  });
});
