import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';

import Row from 'components/Row/Row';

const Rows = ({ boardCodeColors, boardKeyColors }) => {
  const rows = boardCodeColors
    .map((e, i) => <Row key={shortid.generate()} codeColors={e} keyColors={boardKeyColors[i]} />)
    .reverse();

  return (
    <table>
      <tbody className="Rows">{rows}</tbody>
    </table>
  );
};

Rows.propTypes = {
  boardCodeColors: PropTypes.arrayOf(PropTypes.array).isRequired,
  boardKeyColors: PropTypes.arrayOf(PropTypes.array).isRequired,
};

export default Rows;
