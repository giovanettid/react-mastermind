import React from 'react';
import PropTypes from 'prop-types';

import Rows from 'components/Rows/Rows';
import ColorPicker from 'components/ColorPicker/ColorPicker';

const Board = (props) => {
  const rows = <Rows />;
  const picker = <ColorPicker colors={props.colorsToPick} />;

  return (
    <div className="Board">
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
