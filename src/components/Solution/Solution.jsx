import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';
import shortid from 'shortid';

import ColorItem from 'components/ColorItem/ColorItem';

import './Solution.scss';

const Solution = ({ colors, decoded }) => {
  const solutionClass = classNames('Solution', { Solution_hidden: !decoded });

  const items = colors
    .map(color => <ColorItem key={shortid.generate()} color={color} />);

  return (
    <table>
      <tbody>
        <tr className={solutionClass}>{items}</tr>
      </tbody>
    </table>
  );
};

Solution.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
  decoded: PropTypes.bool,
};

Solution.defaultProps = {
  decoded: false,
};

export default Solution;
