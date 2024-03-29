import PropTypes from 'prop-types';
import shortid from 'shortid';

import ColorItem from 'components/ColorItem/ColorItem';

import './Solution.scss';

function Solution({ colors }) {
  const items = colors.map((color) => (
    <ColorItem key={shortid.generate()} color={color} />
  ));

  return (
    <div className="Solution">
      <table>
        <tbody aria-label="Solution">
          <tr>{items}</tr>
        </tbody>
      </table>
    </div>
  );
}

Solution.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Solution;
