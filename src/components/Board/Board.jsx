import React from 'react';
import PropTypes from 'prop-types';

import Rows from 'components/Rows/Rows';
import ColorPicker from 'components/ColorPicker/ColorPicker';

export default class Board extends React.Component {
  constructor() {
    super();
    this.state = { pick: '', nextCode: { row: 1, item: 1 } };
    this.handleColorClick = this.handleColorClick.bind(this);
  }

  handleColorClick(color) {
    this.setState({ pick: color });
  }

  render() {
    const rows = <Rows nextCode={this.state.nextCode} color={this.state.pick} />;
    const picker = (<ColorPicker
      colors={this.props.colorsToPick}
      onColorClick={this.handleColorClick}
    />);

    return (
      <div className="Board">
        {rows}
        <br />
        {picker}
      </div>
    );
  }
}

Board.propTypes = {
  colorsToPick: PropTypes.arrayOf(PropTypes.string).isRequired,
};
