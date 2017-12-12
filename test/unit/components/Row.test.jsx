import React from 'react';

import Row from 'components/Row/Row';

describe('Row', () => {
  const createWrapper = color => mount(
    <table><tbody>
      <Row item={2} color={color} />
    </tbody></table>);

  const createWrapperYellow = () => createWrapper('Yellow');

  const createWrapperNoColor = () => createWrapper('');

  describe('render', () => {
    it('should display a Row with 4 Code Hole', () => {
      expect(createWrapperYellow().find('.CodeHole')).to.have.lengthOf(4);
    });

    it('should display a Row with 4 Key Hole', () => {
      expect(createWrapperYellow().find('.KeyHole')).to.have.lengthOf(4);
    });

    it('should display a Row with 1 yellow Code Hole and 3 lightgrey', () => {
      const wrapper = createWrapperYellow();

      expect(wrapper.find('.CodeHole_color_yellow')).to.have.lengthOf(1);
      expect(wrapper.find('.CodeHole_color_lightgrey')).to.have.lengthOf(3);
    });

    describe('when no color', () => {
      it('should display a Row with 4 lightgray Code Hole', () => {
        expect(createWrapperNoColor().find('.CodeHole_color_lightgrey')).to.have.lengthOf(4);
      });
    });
  });

  describe('props', () => {
    it('should receive item prop', () => {
      expect(createWrapperYellow().find(Row).prop('item')).to.equal(2);
    });
  });
});
