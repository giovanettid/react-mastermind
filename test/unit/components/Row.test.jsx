import React from 'react';

import Row from 'components/Row/Row';

describe('Row', () => {
  const wrapper = mount(
    <table><tbody>
      <Row colors={['Yellow', 'lightgrey']} />
    </tbody></table>);

  describe('render', () => {
    it('should display a Row with 2 Code Hole', () => {
      expect(wrapper.find('.CodeHole')).to.have.lengthOf(2);
    });

    it('should display a Row with 4 Key Hole', () => {
      expect(wrapper.find('.KeyHole')).to.have.lengthOf(4);
    });

    it('should display a Row with 1 yellow Code Hole and 1 lightgrey', () => {
      expect(wrapper.find('.CodeHole_color_yellow')).to.have.lengthOf(1);
      expect(wrapper.find('.CodeHole_color_lightgrey')).to.have.lengthOf(1);
    });
  });
});
