import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';

import Row from 'components/Row/Row';

const Rows = ({ boardColors }) => {
  const keys = new Array(4).fill('lightgrey');
  const rows = boardColors
    .map(e => <Row key={shortid.generate()} codeColors={e} keyColors={keys} />)
    .reverse();

  return (
    <table>
      <tbody className="Rows">{rows}</tbody>
    </table>
  );
};

Rows.propTypes = {
  boardColors: PropTypes.arrayOf(PropTypes.array).isRequired,
};

export default Rows;
