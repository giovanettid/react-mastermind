import PropTypes from 'prop-types';
import { useState } from 'react';

import ColorPicker from 'components/ColorPicker/ColorPicker';
import Rows from 'components/Rows/Rows';
import Solution from 'components/Solution/Solution';
import StatusFactory from 'components/Status/StatusFactory';

import './Board.scss';
import BoardStateMutator from './BoardStateMutator';

function Board({ colorsToPick, colorsToGuess, stateMutator, onResetClick }) {
  const [state, setState] = useState(stateMutator.getInitial());

  const handleColorClick = (color) => setState(stateMutator.getNext(color));

  const handleResetClick = () => {
    onResetClick();
    setState(stateMutator.getInitial());
  };

  const { endOfGame, boardCodeColors, boardKeyColors, decoded } = state;
  const solution = endOfGame && <Solution colors={colorsToGuess} />;

  const rows = (
    <Rows boardCodeColors={boardCodeColors} boardKeyColors={boardKeyColors} />
  );

  const picker = (
    <ColorPicker colors={colorsToPick} onColorClick={handleColorClick} />
  );

  const status = endOfGame && StatusFactory(decoded);

  const reset = (
    <div className="Reset">
      <button type="button" onClick={handleResetClick}>
        New game
      </button>
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

Board.propTypes = {
  colorsToPick: PropTypes.arrayOf(PropTypes.string).isRequired,
  colorsToGuess: PropTypes.arrayOf(PropTypes.string).isRequired,
  stateMutator: PropTypes.instanceOf(BoardStateMutator).isRequired,
  onResetClick: PropTypes.func.isRequired,
};

export default Board;
