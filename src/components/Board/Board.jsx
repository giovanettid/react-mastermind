import React from 'react';
import PropTypes from 'prop-types';

import Rows from 'components/Rows/Rows';
import ColorPicker from 'components/ColorPicker/ColorPicker';
import Solution from 'components/Solution/Solution';

import BoardStateMutator from './BoardStateMutator';

const NB_ROWS = 10;
const NB_CODE_HOLES = 4;

export default class Board extends React.Component {
  static propTypes = {
    colorsToPick: PropTypes.arrayOf(PropTypes.string).isRequired,
    colorsToGuess: PropTypes.arrayOf(PropTypes.string).isRequired,
  }

  constructor(props) {
    super(props);
    this.stateMutator = new BoardStateMutator(NB_ROWS, NB_CODE_HOLES, props.colorsToGuess);
    this.state = this.stateMutator.getInitial();
  }

  handleColorClick = (color) => {
    this.setState(this.stateMutator.getNext(color));
  }

  render() {
    const solution = <Solution colors={this.props.colorsToGuess} />;
    const rows = <Rows boardColors={this.state.boardColors} />;
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
