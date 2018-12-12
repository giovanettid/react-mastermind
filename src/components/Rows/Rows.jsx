import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';

import Row from 'components/Row/Row';

import './Rows.scss';

const Rows = ({ boardCodeColors, boardKeyColors }) => {
  const rows = boardCodeColors
    .map((e, i) => <Row key={shortid.generate()} codeColors={e} keyColors={boardKeyColors[i]} />)
    .reverse();

  return (
    <div className="Rows">
      <table>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
};

Rows.propTypes = {
  boardCodeColors: PropTypes.arrayOf(PropTypes.array).isRequired,
  boardKeyColors: PropTypes.arrayOf(PropTypes.array).isRequired,
};

export default Rows;
