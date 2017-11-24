import React from 'react';

import Hole from 'components/Hole/Hole';

export default function Row() {
  const row = [...Array(4).keys()].map(e => <Hole key={e} />);
  return (
    <tr className="row">{row}</tr>
  );
}
