import React from 'react';
import PropTypes from 'prop-types';

import Row from 'components/Row/Row';
import ColorPicker from 'components/ColorPicker/ColorPicker';

const Board = (props) => {
  const board = [...Array(10).keys()].map(e => <Row key={e} />);
  const picker = <ColorPicker colors={props.colorsToPick} />;

  return (
    <div>
      <table className="board">
        <tbody>{board}</tbody>
      </table>
      <br />
      <table>
        <tbody>{picker}</tbody>
      </table>
    </div>
  );
};

Board.propTypes = {
  colorsToPick: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Board;
