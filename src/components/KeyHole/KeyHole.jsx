import PropTypes from 'prop-types';

import './KeyHole.scss';

function KeyHole({ color }) {
  const className = `KeyHole KeyHole_color_${color.toLowerCase()}`;

  return <td aria-label="Key Hole" className={className} />;
}

KeyHole.propTypes = {
  color: PropTypes.string.isRequired,
};

export default KeyHole;
