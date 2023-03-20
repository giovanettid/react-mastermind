import PropTypes from 'prop-types';

import './ColorItem.scss';

function ColorItem({ color }) {
  const className = `ColorItem ColorItem_color_${color.toLowerCase()}`;

  return <td aria-label="Color Item" className={className} />;
}

ColorItem.propTypes = {
  color: PropTypes.string.isRequired,
};

export default ColorItem;
