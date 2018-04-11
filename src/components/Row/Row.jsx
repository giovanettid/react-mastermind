import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';

import ColorItem from 'components/ColorItem/ColorItem';
import KeyHole from 'components/KeyHole/KeyHole';

const keys = size => [...Array(size).keys()];

const Row = ({ colors }) => {
  const codeHolesRow = colors.map(e => <ColorItem key={shortid.generate()} color={e} />);

  const NB_KEY_HOLES = 2;
  const keyHolesRow = keys(NB_KEY_HOLES).map(e => <KeyHole key={e} color={'lightgrey'} />);

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
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Row;
