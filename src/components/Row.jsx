import React from 'react';
import Hole from './Hole';

export default function Row() {
  const row = [...Array(4).keys()].map(e => <Hole key={e} />);
  return (
    <div>{row}</div>
  );
}
