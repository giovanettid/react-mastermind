import React from 'react';
import PropTypes from 'prop-types';

import CodeHole from 'components/CodeHole/CodeHole';
import KeyHole from 'components/KeyHole/KeyHole';

const keys = size => [...Array(size).keys()];

const Row = ({ nextItem, color }) => {
  const NB_CODE_HOLES = 4;
  const mapCallback = (e) => {
    if (color && nextItem === e + 1) {
      return <CodeHole key={e} color={color} />;
    }
    return <CodeHole key={e} />;
  };
  const codeHolesRow = keys(NB_CODE_HOLES).map(mapCallback);

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
  nextItem: PropTypes.number.isRequired,
  color: PropTypes.string,
};

Row.defaultProps = {
  color: undefined,
};

export default Row;
