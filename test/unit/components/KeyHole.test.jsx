import React from 'react';

import KeyHole from 'components/KeyHole/KeyHole';

describe('KeyHole', () => {
  it('should display KeyHole with correct color', () => {
    const wrapper = mount(
      <table>
        <tbody>
          <tr>
            <KeyHole color="Black" />
          </tr>
        </tbody>
      </table>,
    );

    expect(wrapper.find('.KeyHole').hasClass('KeyHole_color_black')).to.be.true;
  });
});
