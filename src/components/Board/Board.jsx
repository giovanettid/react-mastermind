import React from 'react';
import PropTypes from 'prop-types';

import Rows from 'components/Rows/Rows';
import ColorPicker from 'components/ColorPicker/ColorPicker';

const Board = (props) => {
  const rows = <Rows nb={10} />;
  const picker = <ColorPicker colors={props.colorsToPick} />;

  return (
    <div className="board">
      {rows}
      <br />
      {picker}
    </div>
  );
};

Board.propTypes = {
  colorsToPick: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Board;
