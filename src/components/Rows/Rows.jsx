import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';

import Row from 'components/Row/Row';

const Rows = ({ boardColors }) => {
  const rows = boardColors.map(e => <Row key={shortid.generate()} colors={e} />).reverse();

  return (
    <table>
      <tbody className="Rows">{rows}</tbody>
    </table>
  );
};

Rows.propTypes = {
  boardColors: PropTypes.arrayOf(PropTypes.array).isRequired,
};

export default Rows;
