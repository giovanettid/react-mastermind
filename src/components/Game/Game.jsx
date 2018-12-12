import React from 'react';
import PropTypes from 'prop-types';

import Board from 'components/Board/Board';

export default class Game extends React.Component {
  static propTypes = {
    configuration: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = this.props.configuration();
  }

  handleResetClick = () => {
    this.setState(this.props.configuration());
  }

  render() {
    return (<Board
      colorsToPick={this.state.colorsToPick}
      colorsToGuess={this.state.colorsToGuess}
      stateMutator={this.state.stateMutator}
      onResetClick={this.handleResetClick}
    />);
  }
}
