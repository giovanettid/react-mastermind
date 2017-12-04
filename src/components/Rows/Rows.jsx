import React from 'react';
import PropTypes from 'prop-types';

import Row from 'components/Row/Row';

const Rows = (props) => {
  const rows = [...Array(props.nb).keys()].map(e => <Row key={e} />);

  return (
    <table>
      <tbody>{rows}</tbody>
    </table>
  );
};

Rows.propTypes = {
  nb: PropTypes.number.isRequired,
};

export default Rows;
