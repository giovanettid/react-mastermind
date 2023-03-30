import PropTypes from 'prop-types';
import shortid from 'shortid';

import Row from 'components/Row/Row';

import './Rows.scss';

function Rows({ boardCodeColors, boardKeyColors }) {
  const rows = boardCodeColors
    .map((e, i) => (
      <Row
        key={shortid.generate()}
        codeColors={e}
        keyColors={boardKeyColors[i]}
      />
    ))
    .reverse();

  return (
    <div className="Rows">
      <table>
        <tbody aria-label="Rows">{rows}</tbody>
      </table>
    </div>
  );
}

Rows.propTypes = {
  boardCodeColors: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
    .isRequired,
  boardKeyColors: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
    .isRequired,
};

export default Rows;
