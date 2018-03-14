import React from 'react';
import PropTypes from 'prop-types';

import Rows from 'components/Rows/Rows';
import ColorPicker from 'components/ColorPicker/ColorPicker';

import BoardState from './BoardState';

const NB_ROWS = 10;
const NB_CODE_HOLES = 4;

export default class Board extends React.Component {
  constructor() {
    super();
    this.boardState = new BoardState(NB_ROWS, NB_CODE_HOLES);
    this.state = this.boardState.getInitial();
    this.handleColorClick = this.handleColorClick.bind(this);
  }

  handleColorClick(color) {
    this.setState(this.boardState.getNext(color));
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
