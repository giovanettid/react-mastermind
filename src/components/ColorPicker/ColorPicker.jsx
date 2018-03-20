import React from 'react';
import PropTypes from 'prop-types';

import ClickableColor from 'components/ClickableColor/ClickableColor';

const ColorPicker = ({ colors, onColorClick }) => {
  const items = colors
    .map(color => <ClickableColor key={color} color={color} onColorClick={onColorClick} />);

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
  onColorClick: PropTypes.func.isRequired,
};

export default ColorPicker;
