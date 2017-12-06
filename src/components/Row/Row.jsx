import React from 'react';

import Hole from 'components/Hole/Hole';
import KeyHole from 'components/KeyHole/KeyHole';

export default function Row() {
  const NB_HOLES = 4;
  const holeIterator = [...Array(NB_HOLES).keys()];
  const holes = holeIterator.map(e => <Hole key={e} />);
  const keyHoles = holeIterator.map(e => <KeyHole key={e} />);

  return (
    <tr className="Row">{holes}{keyHoles}</tr>
  );
}
