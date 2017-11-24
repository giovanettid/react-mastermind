import React from 'react';
import Row from 'components/Row';

export default function Board() {
  const board = [...Array(10).keys()].map(e => <Row key={e} />);
  return (
    <table className="board">
      <tbody>{board}</tbody>
    </table>
  );
}
