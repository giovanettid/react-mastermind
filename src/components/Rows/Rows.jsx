import React from 'react';

import Row from 'components/Row/Row';

const Rows = () => {
  const NB_ROWS = 10;
  const rows = [...Array(NB_ROWS).keys()].map(e => <Row key={e} />);

  return (
    <table>
      <tbody className="Rows">{rows}</tbody>
    </table>
  );
};

export default Rows;
