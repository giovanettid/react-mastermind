import React from 'react';
import PropTypes from 'prop-types';

import Row from 'components/Row/Row';
import ColorPicker from 'components/ColorPicker/ColorPicker';

const Board = (props) => {
  const board = [...Array(10).keys()].map(e => <Row key={e} />);
  return (
    <div>
      <table className="board">
        <tbody>{board}</tbody>
      </table>
      <ColorPicker
        colors={props.colorsToPick}
      />
    </div>
  );
};

Board.propTypes = {
  colorsToPick: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Board;
