import PropTypes from 'prop-types';

import './ClickableColor.scss';

function ClickableColor({ onColorClick, color }) {
  const handleClick = () => onColorClick(color);

  const className = `ClickableColor ClickableColor_color_${color.toLowerCase()}`;
  const ariaLabel = `Click color ${color}`;

  return (
    <td>
      <button
        type="button"
        aria-label={ariaLabel}
        className={className}
        onClick={handleClick}
      />
    </td>
  );
}

ClickableColor.propTypes = {
  color: PropTypes.string.isRequired,
  onColorClick: PropTypes.func.isRequired,
};

export default ClickableColor;
