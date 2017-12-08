import React from 'react';
import PropTypes from 'prop-types';

import './ColorItem.scss';

export default class ColorItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onColorClick();
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
