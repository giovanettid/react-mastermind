import React from 'react';
import PropTypes from 'prop-types';

import Board from 'components/Board/Board';

import GameConfiguration from './GameConfiguration';

import './Game.scss';

export default class Game extends React.Component {
  static propTypes = {
    configuration: PropTypes.instanceOf(GameConfiguration).isRequired,
  }

  constructor(props) {
    super(props);
    this.state = Object.assign({}, this.props.configuration);
  }

  handleResetClick = () => {
    this.setState(Object.assign({}, new GameConfiguration()));
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
