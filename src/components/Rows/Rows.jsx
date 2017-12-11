import React from 'react';
import PropTypes from 'prop-types';

import Row from 'components/Row/Row';

const Rows = ({ nextCode, color }) => {
  const NB_ROWS = 10;
  const mapCallback = (e) => {
    if (nextCode.row === e + 1) {
      return <Row key={e} nextCode={nextCode} color={color} />;
    }
    return <Row key={e} nextCode={nextCode} />;
  };
  const rows = [...Array(NB_ROWS).keys()].map(mapCallback);

  return (
    <table>
      <tbody className="Rows">{rows}</tbody>
    </table>
  );
};

Rows.propTypes = {
  nextCode: PropTypes.shape({
    row: PropTypes.number,
    item: PropTypes.number,
  }).isRequired,
  color: PropTypes.string.isRequired,
};

export default Rows;
