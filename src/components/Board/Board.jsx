import React from 'react';
import PropTypes from 'prop-types';

import Rows from 'components/Rows/Rows';
import ColorPicker from 'components/ColorPicker/ColorPicker';

import BoardStateMutator from './BoardStateMutator';

const NB_ROWS = 10;
const NB_CODE_HOLES = 4;

export default class Board extends React.Component {
  static stateMutator = new BoardStateMutator(NB_ROWS, NB_CODE_HOLES);

  state = Board.stateMutator.getInitial();

  handleColorClick = (color) => {
    this.setState(Board.stateMutator.getNext(color));
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
