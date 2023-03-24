import PropTypes from 'prop-types';

import './ColorItem.scss';

function ColorItem({ color }) {
  const className = `ColorItem ColorItem_color_${color.toLowerCase()}`;
  const ariaLabel = `Color item ${color}`;

  return <td aria-label={ariaLabel} className={className} />;
}

ColorItem.propTypes = {
  color: PropTypes.string.isRequired,
};

export default ColorItem;
