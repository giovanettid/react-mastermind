import React from 'react';
import PropTypes from 'prop-types';

import Board from 'components/Board/Board';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.configuration();
  }

  handleResetClick = () => {
    const { configuration } = this.props;
    this.setState(configuration());
  }

  render() {
    const { colorsToPick, colorsToGuess, stateMutator } = this.state;
    return (
      <Board
        colorsToPick={colorsToPick}
        colorsToGuess={colorsToGuess}
        stateMutator={stateMutator}
        onResetClick={this.handleResetClick}
      />
    );
  }
}

Game.propTypes = {
  configuration: PropTypes.func.isRequired,
};
