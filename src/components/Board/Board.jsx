import React from 'react';
import PropTypes from 'prop-types';

import Rows from 'components/Rows/Rows';
import ColorPicker from 'components/ColorPicker/ColorPicker';

const NB_ROWS = 10;
const NB_CODE_HOLES = 4;

const defaultColors = size => new Array(size).fill('lightgrey');

const createBoardColors = () => Array.from({ length: NB_ROWS }, () => defaultColors(NB_CODE_HOLES));

const nextState = color => (prevState) => {
  const boardColors = prevState.boardColors;

  let nextRow;
  let nextItem;
  if (prevState.item % NB_CODE_HOLES === 0) {
    nextRow = prevState.row + 1;
    nextItem = 1;
  } else {
    nextRow = prevState.row;
    nextItem = prevState.item + 1;
  }
  boardColors[nextRow - 1][nextItem - 1] = color;

  return { row: nextRow, item: nextItem, boardColors };
};

export default class Board extends React.Component {
  constructor() {
    super();
    this.state = { row: 0, item: 0, boardColors: createBoardColors() };
    this.handleColorClick = this.handleColorClick.bind(this);
  }

  handleColorClick(color) {
    this.setState(nextState(color));
  }

  render() {
    const rows = <Rows boardColors={this.state.boardColors} />;
    const picker = (<ColorPicker
      colors={this.props.colorsToPick}
      onColorClick={this.handleColorClick}
    />);

    return (
      <div className="Board">
        {rows}
        <br />
        {picker}
      </div>
    );
  }
}

Board.propTypes = {
  colorsToPick: PropTypes.arrayOf(PropTypes.string).isRequired,
};
