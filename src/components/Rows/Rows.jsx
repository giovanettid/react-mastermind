import React from 'react';
import PropTypes from 'prop-types';

import Row from 'components/Row/Row';

const Rows = ({ nextCode }) => {
  const NB_ROWS = 10;
  const rows = [...Array(NB_ROWS).keys()].map(e => <Row key={e} nextCode={nextCode} />);

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
