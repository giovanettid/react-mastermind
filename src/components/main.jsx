import React from 'react';
import ReactDOM from 'react-dom';

import Game from 'components/Game/Game';
import GameConfiguration from 'components/Game/GameConfiguration';

import 'styles/main.scss';

ReactDOM.render(
  <Game configuration={new GameConfiguration()} />,
  document.getElementById('root'),
);
