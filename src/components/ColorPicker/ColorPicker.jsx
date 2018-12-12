import React from 'react';
import PropTypes from 'prop-types';

import ClickableColor from 'components/ClickableColor/ClickableColor';

import './ColorPicker.scss';

const ColorPicker = ({ colors, onColorClick }) => {
  const items = colors
    .map(color => <ClickableColor key={color} color={color} onColorClick={onColorClick} />);

  return (
    <div className="ColorPicker">
      <table>
        <tbody>
          <tr>{items}</tr>
        </tbody>
      </table>
    </div>
  );
};

ColorPicker.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
  onColorClick: PropTypes.func.isRequired,
};

export default ColorPicker;
