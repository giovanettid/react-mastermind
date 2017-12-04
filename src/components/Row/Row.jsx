import React from 'react';

import Hole from 'components/Hole/Hole';

export default function Row() {
  const NB_HOLES = 4;
  const row = [...Array(NB_HOLES).keys()].map(e => <Hole key={e} />);
  return (
    <tr className="row">{row}</tr>
  );
}
