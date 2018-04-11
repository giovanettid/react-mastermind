import React from 'react';
import PropTypes from 'prop-types';

import './KeyHole.scss';

const KeyHole = ({ color }) => {
  const className = `KeyHole KeyHole_color_${color.toLowerCase()}`;

  return <td className={className} />;
};

KeyHole.propTypes = {
  color: PropTypes.string.isRequired,
};

export default KeyHole;
