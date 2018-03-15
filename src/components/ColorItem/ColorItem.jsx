import React from 'react';
import PropTypes from 'prop-types';

import './ColorItem.scss';

export default class ColorItem extends React.Component {
  handleClick = () => {
    this.props.onColorClick(this.props.color);
  }

  render() {
    const className = `ColorItem ColorItem_color_${this.props.color.toLowerCase()}`;
    return (
      <td>
        <button className={className} onClick={this.handleClick} />
      </td>
    );
  }
}

ColorItem.propTypes = {
  color: PropTypes.string.isRequired,
  onColorClick: PropTypes.func.isRequired,
};
