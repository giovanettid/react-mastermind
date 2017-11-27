import React from 'react';
import PropTypes from 'prop-types';

const ColorItem = (props) => {
  const className = `colorItem color${props.color}`;
  return <div className={className} />;
};

ColorItem.propTypes = {
  color: PropTypes.string.isRequired,
};

export default ColorItem;