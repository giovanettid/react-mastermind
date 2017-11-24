import React from 'react';
import Row from './Row';

export default function Board() {
  const board = [...Array(10).keys()].map(e => <Row key={e} />);
  return (
    <div className="board">{board}</div>
  );
}
