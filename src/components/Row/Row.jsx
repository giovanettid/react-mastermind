import React from 'react';

import CodeHole from 'components/CodeHole/CodeHole';
import KeyHole from 'components/KeyHole/KeyHole';

export default function Row() {
  const NB_HOLES = 4;
  const holeIterator = [...Array(NB_HOLES).keys()];
  const codeHoles = holeIterator.map(e => <CodeHole key={e} />);
  const keyHoles = holeIterator.map(e => <KeyHole key={e} />);

  return (
    <tr className="Row">{codeHoles}{keyHoles}</tr>
  );
}
