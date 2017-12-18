import React from 'react';
import PropTypes from 'prop-types';

import Row from 'components/Row/Row';

const defaultColors = size => new Array(size).fill('lightgrey');

const Rows = ({ row, item, color }) => {
  const NB_ROWS = 10;
  const NB_CODE_HOLES = 4;

  const mapCallback = (e) => {
    const activeColors = defaultColors(NB_CODE_HOLES);
    activeColors[item - 1] = color;

    const colors = row === e + 1 ? activeColors : defaultColors(NB_CODE_HOLES);
    return <Row key={e} {...{ colors }} />;
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
  color: PropTypes.string,
};

Rows.defaultProps = {
  color: 'lightgrey',
};

export default Rows;
