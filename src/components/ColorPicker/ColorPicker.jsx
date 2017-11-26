import React from 'react';

import ColorItem from 'components/ColorItem/ColorItem';

export default function ColorPicker() {
  const items = [...Array(6).keys()].map(e => <ColorItem key={e} />);
  return (
    <div>{items}</div>
  );
}
