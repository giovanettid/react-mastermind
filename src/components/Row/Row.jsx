import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';

import CodeHole from 'components/CodeHole/CodeHole';
import KeyHole from 'components/KeyHole/KeyHole';

const keys = size => [...Array(size).keys()];

const Row = ({ item, color }) => {
  const NB_CODE_HOLES = 4;
  const colors = new Array(NB_CODE_HOLES).fill('lightgrey');
  colors[item - 1] = color;
  const codeHolesRow = colors.map(e => <CodeHole key={shortid.generate()} color={e} />);

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
};

Row.propTypes = {
  item: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
};

export default Row;
