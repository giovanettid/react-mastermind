import React from 'react';
import PropTypes from 'prop-types';

import ColorItem from 'components/ColorItem/ColorItem';

export default class ColorPicker extends React.Component {
  constructor() {
    super();
    this.state = { pick: '' };
    this.handleColorClick = this.handleColorClick.bind(this);
  }

  handleColorClick(color) {
    this.setState({ pick: color });
  }

  render() {
    const items = this.props.colors
      .map(color => <ColorItem key={color} color={color} onColorClick={this.handleColorClick} />);

    return (
      <table>
        <tbody>
          <tr className="ColorPicker">{items}</tr>
        </tbody>
      </table>
    );
  }
}

ColorPicker.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
};
