import React from 'react';
import PropTypes from 'prop-types';

import './CodeHole.scss';

const CodeHole = ({ color }) => {
  const className = `CodeHole CodeHole_color_${color.toLowerCase()}`;

  return <td className={className} />;
};

CodeHole.propTypes = {
  color: PropTypes.string,
};

CodeHole.defaultProps = {
  color: 'lightgrey',
};

export default CodeHole;
