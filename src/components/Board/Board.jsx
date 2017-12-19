import React from 'react';
import PropTypes from 'prop-types';

import Rows from 'components/Rows/Rows';
import ColorPicker from 'components/ColorPicker/ColorPicker';

const defaultColors = size => new Array(size).fill('lightgrey');

export default class Board extends React.Component {
  constructor() {
    super();
    this.state = { row: 1, item: 1, color: 'lightgrey' };
    this.handleColorClick = this.handleColorClick.bind(this);
  }

  handleColorClick(color) {
    this.setState({ row: 1, item: 1, color });
  }

  render() {
    const NB_ROWS = 10;
    const NB_CODE_HOLES = 4;

    const boardColors = Array.from({ length: NB_ROWS }, () => defaultColors(NB_CODE_HOLES));
    boardColors[this.state.row - 1][this.state.item - 1] = this.state.color;

    const rows = <Rows boardColors={boardColors} />;
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
