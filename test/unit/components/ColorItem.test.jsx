import React from 'react';

import ColorItem from 'components/ColorItem/ColorItem';

describe('ColorItem', () => {
  it('should display ColorItem with correct color', () => {
    const wrapper = mount(
      <table>
        <tbody>
          <tr>
            <ColorItem color="Green" />
          </tr>
        </tbody>
      </table>,
    );

    expect(wrapper.find('.ColorItem').hasClass('ColorItem_color_green')).to.be.true;
  });
});
