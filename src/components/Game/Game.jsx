import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Board from 'components/Board/Board';

const Game = ({ configuration }) => {
  const [state, setState] = useState(configuration());

  const handleResetClick = () => setState(configuration());

  const { colorsToPick, colorsToGuess, stateMutator } = state;
  return (
    <Board
      colorsToPick={colorsToPick}
      colorsToGuess={colorsToGuess}
      stateMutator={stateMutator}
      onResetClick={handleResetClick}
    />
  );
};

Game.propTypes = {
  configuration: PropTypes.func.isRequired,
};

export default Game;
