import React from 'react';
import PropTypes from 'prop-types';

import ColorItem from 'components/ColorItem/ColorItem';

const ColorPicker = (props) => {
  const items = props.colors
    .map(color => <ColorItem key={color} color={color} />);

  return (
    <div className="colorPicker">{items}</div>
  );
};

ColorPicker.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ColorPicker;
