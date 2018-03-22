import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';

import ColorItem from 'components/ColorItem/ColorItem';

import './Solution.scss';

const Solution = ({ colors }) => {
  const items = colors
    .map(color => <ColorItem key={shortid.generate()} color={color} />);

  return (
    <table>
      <tbody>
        <tr className="Solution Solution_hidden">{items}</tr>
      </tbody>
    </table>
  );
};

Solution.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Solution;
