import PropTypes from 'prop-types';

import './KeyHole.scss';

function KeyHole({ color }) {
  const className = `KeyHole KeyHole_color_${color.toLowerCase()}`;
  const ariaLabel = `Key hole ${color}`;

  return <td aria-label={ariaLabel} className={className} />;
}

KeyHole.propTypes = {
  color: PropTypes.string.isRequired,
};

export default KeyHole;
