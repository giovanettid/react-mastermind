import React from 'react';
import PropTypes from 'prop-types';

import ColorItem from 'components/ColorItem/ColorItem';

const ColorPicker = (props) => {
  const items = props.colors
    .map(color => <ColorItem key={color} color={color} />);

  return (
    <tr className="colorPicker">{items}</tr>
  );
};

ColorPicker.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ColorPicker;
