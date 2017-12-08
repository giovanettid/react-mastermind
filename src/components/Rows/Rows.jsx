import React from 'react';
import PropTypes from 'prop-types';

import Row from 'components/Row/Row';

// eslint-disable-next-line no-unused-vars
const Rows = ({ nextCode }) => {
  const NB_ROWS = 10;
  const rows = [...Array(NB_ROWS).keys()].map(e => <Row key={e} />);

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
};

export default Rows;
