import React from 'react';
import PropTypes from 'prop-types';

import './ColorItem.scss';

const ColorItem = (props) => {
  const className = `ColorItem ColorItem_color_${props.color.toLowerCase()}`;
  return <td className={className} />;
};

ColorItem.propTypes = {
  color: PropTypes.string.isRequired,
};

export default ColorItem;
