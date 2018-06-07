import React from 'react';

import ColorsFactory from 'components/Colors/ColorsFactory';
import ColorsDecoder from 'components/Colors/ColorsDecoder';

import Board from 'components/Board/Board';
import BoardModel from 'components/Board/BoardModel';
import BoardStateMutator from 'components/Board/BoardStateMutator';

import './Game.scss';

const NB_ROWS = 10;
const NB_CODE_HOLES = 4;

export default function Game() {
  const colors = ColorsFactory.create();
  const colorsDecoder = new ColorsDecoder(colors.shuffle());
  const model = new BoardModel(NB_ROWS, NB_CODE_HOLES);
  const stateMutator = new BoardStateMutator(model, colorsDecoder);

  return (<Board
    colorsToPick={colors.set}
    colorsToGuess={colorsDecoder.colorsToGuess}
    stateMutator={stateMutator}
  />);
}
