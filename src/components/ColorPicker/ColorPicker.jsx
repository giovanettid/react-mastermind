import React from 'react';
import PropTypes from 'prop-types';

import ColorItem from 'components/ColorItem/ColorItem';

const ColorPicker = ({ colors }) => {
  const items = colors
    .map(color => <ColorItem key={color} color={color} />);

  return (
    <table>
      <tbody>
        <tr className="ColorPicker">{items}</tr>
      </tbody>
    </table>
  );
};

ColorPicker.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ColorPicker;
