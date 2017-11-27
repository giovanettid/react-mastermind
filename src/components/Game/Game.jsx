import React from 'react';

import ColorsFactory from 'components/Colors/ColorsFactory';
import Board from 'components/Board/Board';

import './Game.scss';

export default function Game() {
  const colorsToPick = ColorsFactory.create().set;
  return <Board colorsToPick={colorsToPick} />;
}
