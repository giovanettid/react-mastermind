import React from 'react';

import CodeHole from 'components/CodeHole/CodeHole';
import KeyHole from 'components/KeyHole/KeyHole';

export default function Row() {
  const NB_CODE_HOLES = 4;
  const codeHolesRow = [...Array(NB_CODE_HOLES).keys()].map(e => <CodeHole key={e} />);

  const NB_KEY_HOLES = 2;
  const keyHolesRow = [...Array(NB_KEY_HOLES).keys()].map(e => <KeyHole key={e} />);

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
