import React from 'react';
import PropTypes from 'prop-types';

import Row from 'components/Row/Row';
import ColorPicker from 'components/ColorPicker/ColorPicker';

const Board = (props) => {
  const rows = [...Array(10).keys()].map(e => <Row key={e} />);
  const picker = <ColorPicker colors={props.colorsToPick} />;

  return (
    <div>
      <table className="board">
        <tbody>{rows}</tbody>
      </table>
      <br />
      {picker}
    </div>
  );
};

Board.propTypes = {
  colorsToPick: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Board;
