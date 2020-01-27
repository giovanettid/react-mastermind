import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';

import ColorItem from 'components/ColorItem/ColorItem';
import KeyHole from 'components/KeyHole/KeyHole';

const Row = ({ codeColors, keyColors }) => {
  const codeHolesRow = codeColors.map((e) => <ColorItem key={shortid.generate()} color={e} />);

  const keyHolesRow = keyColors.map((e) => <KeyHole key={shortid.generate()} color={e} />);

  const keyHolesFirstRow = keyHolesRow.slice(0, 2);
  const keyHolesSecondRow = keyHolesRow.slice(2, 4);

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
            <tr>{keyHolesFirstRow}</tr>
            <tr>{keyHolesSecondRow}</tr>
          </tbody>
        </table>
      </td>
    </tr>
  );
};

Row.propTypes = {
  codeColors: PropTypes.arrayOf(PropTypes.string).isRequired,
  keyColors: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Row;
