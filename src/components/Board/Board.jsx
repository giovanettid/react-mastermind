import React from 'react';
import PropTypes from 'prop-types';

import Rows from 'components/Rows/Rows';
import ColorPicker from 'components/ColorPicker/ColorPicker';
import Solution from 'components/Solution/Solution';

import BoardModel from 'components/Board/BoardModel';
import ColorsDecoder from 'components/Colors/ColorsDecoder';

import BoardStateMutator from './BoardStateMutator';

export default class Board extends React.Component {
  static propTypes = {
    colorsToPick: PropTypes.arrayOf(PropTypes.string).isRequired,
    boardModel: PropTypes.instanceOf(BoardModel).isRequired,
    colorsDecoder: PropTypes.instanceOf(ColorsDecoder).isRequired,
  }

  constructor(props) {
    super(props);
    this.stateMutator = new BoardStateMutator(props.boardModel, props.colorsDecoder);
    this.state = this.stateMutator.getInitial();
  }

  handleColorClick = (color) => {
    this.setState(this.stateMutator.getNext(color));
  }

  render() {
    const solution = <Solution colors={this.props.colorsDecoder.colorsToGuess} />;
    const rows = (<Rows
      boardCodeColors={this.state.boardCodeColors}
      boardKeyColors={this.state.boardKeyColors}
    />);
    const picker = (<ColorPicker
      colors={this.props.colorsToPick}
      onColorClick={this.handleColorClick}
    />);

    return (
      <div className="Board">
        {solution}
        <br />
        {rows}
        <br />
        {picker}
      </div>
    );
  }
}
