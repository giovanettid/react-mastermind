import React from 'react';

import Row from 'components/Row/Row';
import ColorPicker from 'components/ColorPicker/ColorPicker';

export default function Board() {
  const board = [...Array(10).keys()].map(e => <Row key={e} />);
  return (
    <div>
      <table className="board">
        <tbody>{board}</tbody>
      </table>
      <ColorPicker
        colors={['Red', 'Blue', 'Yellow', 'Green', 'White', 'Black']}
      />
    </div>
  );
}
