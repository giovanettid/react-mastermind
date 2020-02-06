import React from 'react';
import PropTypes from 'prop-types';

import './ClickableColor.scss';

const ClickableColor = ({ onColorClick, color }) => {
  const handleClick = () => onColorClick(color);

  const className = `ClickableColor ClickableColor_color_${color.toLowerCase()}`;
  return (
    <td>
      <button type="button" aria-label="Click color" className={className} onClick={handleClick} />
    </td>
  );
};

ClickableColor.propTypes = {
  color: PropTypes.string.isRequired,
  onColorClick: PropTypes.func.isRequired,
};

export default ClickableColor;
