import React from 'react';

import ColorsFactory from 'components/Colors/ColorsFactory';
import ColorsDecoder from 'components/Colors/ColorsDecoder';

import Board from 'components/Board/Board';

import './Game.scss';

export default function Game() {
  const colors = ColorsFactory.create();
  return <Board colorsToPick={colors.set} colorsDecoder={new ColorsDecoder(colors.shuffle())} />;
}
