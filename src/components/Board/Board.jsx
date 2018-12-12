import React from 'react';
import PropTypes from 'prop-types';

import Rows from 'components/Rows/Rows';
import ColorPicker from 'components/ColorPicker/ColorPicker';
import Solution from 'components/Solution/Solution';
import StatusFactory from 'components/Status/StatusFactory';

import BoardStateMutator from './BoardStateMutator';

import './Board.scss';

export default class Board extends React.Component {
  static propTypes = {
    colorsToPick: PropTypes.arrayOf(PropTypes.string).isRequired,
    colorsToGuess: PropTypes.arrayOf(PropTypes.string).isRequired,
    stateMutator: PropTypes.instanceOf(BoardStateMutator).isRequired,
    onResetClick: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = this.props.stateMutator.getInitial();
  }

  handleColorClick = (color) => {
    this.setState(this.props.stateMutator.getNext(color));
  }

  handleResetClick = () => {
    this.props.onResetClick();
    this.setState(this.props.stateMutator.getInitial());
  }

  render() {
    const solution = this.state.endOfGame && <Solution colors={this.props.colorsToGuess} />;

    const rows = (<Rows
      boardCodeColors={this.state.boardCodeColors}
      boardKeyColors={this.state.boardKeyColors}
    />);

    const picker = (<ColorPicker
      colors={this.props.colorsToPick}
      onColorClick={this.handleColorClick}
    />);

    const status = this.state.endOfGame && StatusFactory.create(this.state.decoded);

    const reset = <div className="Reset"><button onClick={this.handleResetClick}>New game</button></div>;

    return (
      <div className="Board">
        {solution}
        <br />
        {rows}
        <br />
        {picker}
        <br />
        {status}
        <br />
        {reset}
      </div>
    );
  }
}
