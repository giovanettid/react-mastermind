import React from 'react';

import Board from 'components/Board/Board';

import './Game.scss';

export default function Game() {
  return (<div>
    <Board colorsToPick={['Red', 'Blue', 'Yellow', 'Green', 'White', 'Black']} />
  </div>);
}
