import React from 'react';

import CodeHole from 'components/CodeHole/CodeHole';
import KeyHole from 'components/KeyHole/KeyHole';

const keys = size => [...Array(size).keys()];

export default function Row() {
  const NB_CODE_HOLES = 4;
  const codeHolesRow = keys(NB_CODE_HOLES).map(e => <CodeHole key={e} />);

  const NB_KEY_HOLES = 2;
  const keyHolesRow = keys(NB_KEY_HOLES).map(e => <KeyHole key={e} />);

  return (
    <tr className="Row">
      <td>
        <table>
          <tbody>
            <tr>{codeHolesRow}</tr>
          </tbody>
        </table>
      </td>
      <td>
        <table>
          <tbody>
            <tr>{keyHolesRow}</tr>
            <tr>{keyHolesRow}</tr>
          </tbody>
        </table>
      </td>
    </tr>
  );
}
