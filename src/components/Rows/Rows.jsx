import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';

import Row from 'components/Row/Row';

const defaultColors = size => new Array(size).fill('lightgrey');

const Rows = ({ row, item, color }) => {
  const NB_ROWS = 10;
  const NB_CODE_HOLES = 4;

  const boardColors = Array.from({ length: NB_ROWS }, () => defaultColors(NB_CODE_HOLES));
  boardColors[row - 1][item - 1] = color;

  const rows = boardColors.map(e => <Row key={shortid.generate()} colors={e} />);

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
