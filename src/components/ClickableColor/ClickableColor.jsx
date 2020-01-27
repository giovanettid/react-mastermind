import React from 'react';
import PropTypes from 'prop-types';

import './ClickableColor.scss';

export default class ClickableColor extends React.Component {
  handleClick = () => {
    const { onColorClick, color } = this.props;
    onColorClick(color);
  }

  render() {
    const { color } = this.props;
    const className = `ClickableColor ClickableColor_color_${color.toLowerCase()}`;
    return (
      <td>
        <button type="button" aria-label="Click color" className={className} onClick={this.handleClick} />
      </td>
    );
  }
}

ClickableColor.propTypes = {
  color: PropTypes.string.isRequired,
  onColorClick: PropTypes.func.isRequired,
};
