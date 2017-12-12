import React from 'react';
import PropTypes from 'prop-types';

import Row from 'components/Row/Row';

const Rows = ({ row, item, color }) => {
  const NB_ROWS = 10;
  const mapCallback = (e) => {
    if (row === e + 1) {
      return <Row key={e} nextItem={item} color={color} />;
    }
    return <Row key={e} nextItem={item} />;
  };
  const rows = [...Array(NB_ROWS).keys()].map(mapCallback);

  return (
    <table>
      <tbody className="Rows">{rows}</tbody>
    </table>
  );
};

Rows.propTypes = {
  row: PropTypes.number.isRequired,
  item: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
};

export default Rows;
