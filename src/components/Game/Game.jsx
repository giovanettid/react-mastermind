import React from 'react';

import Board from 'components/Board/Board';

import GameConfiguration from './GameConfiguration';

import './Game.scss';

export default function Game() {
  const configuration = new GameConfiguration();

  return (<Board
    colorsToPick={configuration.colorsToPick}
    colorsToGuess={configuration.colorsToGuess}
    stateMutator={configuration.stateMutator}
  />);
}
