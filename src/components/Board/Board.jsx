import React from 'react';
import PropTypes from 'prop-types';

import Rows from 'components/Rows/Rows';
import ColorPicker from 'components/ColorPicker/ColorPicker';
import Solution from 'components/Solution/Solution';
import StatusFactory from 'components/Status/StatusFactory';

import BoardStateMutator from './BoardStateMutator';

import './Board.scss';

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.stateMutator.getInitial();
  }

  handleColorClick = (color) => {
    const { stateMutator } = this.props;
    this.setState(stateMutator.getNext(color));
  }

  handleResetClick = () => {
    const { onResetClick, stateMutator } = this.props;
    onResetClick();
    this.setState(stateMutator.getInitial());
  }

  render() {
    const {
      endOfGame, boardCodeColors, boardKeyColors, decoded,
    } = this.state;
    const { colorsToGuess, colorsToPick } = this.props;
    const solution = endOfGame && <Solution colors={colorsToGuess} />;

    const rows = (
      <Rows
        boardCodeColors={boardCodeColors}
        boardKeyColors={boardKeyColors}
      />
    );

    const picker = (
      <ColorPicker
        colors={colorsToPick}
        onColorClick={this.handleColorClick}
      />
    );

    const status = endOfGame && StatusFactory.create(decoded);

    const reset = (
      <div className="Reset">
        <button type="button" onClick={this.handleResetClick}>New game</button>
      </div>
    );

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

Board.propTypes = {
  colorsToPick: PropTypes.arrayOf(PropTypes.string).isRequired,
  colorsToGuess: PropTypes.arrayOf(PropTypes.string).isRequired,
  stateMutator: PropTypes.instanceOf(BoardStateMutator).isRequired,
  onResetClick: PropTypes.func.isRequired,
};
