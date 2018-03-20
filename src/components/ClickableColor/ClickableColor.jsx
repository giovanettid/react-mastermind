import React from 'react';
import PropTypes from 'prop-types';

import './ClickableColor.scss';

export default class ClickableColor extends React.Component {
  static propTypes = {
    color: PropTypes.string.isRequired,
    onColorClick: PropTypes.func.isRequired,
  }

  handleClick = () => {
    this.props.onColorClick(this.props.color);
  }

  render() {
    const className = `ClickableColor ClickableColor_color_${this.props.color.toLowerCase()}`;
    return (
      <td>
        <button className={className} onClick={this.handleClick} />
      </td>
    );
  }
}
