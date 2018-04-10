import React from 'react';

import ColorsFactory from 'components/Colors/ColorsFactory';
import BoardModel from 'components/Board/BoardModel';
import ColorsDecoder from 'components/Colors/ColorsDecoder';

import Board from 'components/Board/Board';

import './Game.scss';

const NB_ROWS = 10;
const NB_CODE_HOLES = 4;

export default function Game() {
  const colors = ColorsFactory.create();
  return (<Board
    colorsToPick={colors.set}
    boardModel={new BoardModel(NB_ROWS, NB_CODE_HOLES)}
    colorsDecoder={new ColorsDecoder(colors.shuffle())}
  />);
}
