
import ColorsFactory from 'components/Colors/ColorsFactory';
import ColorsDecoder from 'components/Colors/ColorsDecoder';

import BoardModel from 'components/Board/BoardModel';
import BoardStateMutator from 'components/Board/BoardStateMutator';

const NB_ROWS = 10;
const NB_CODE_HOLES = 4;

const model = new BoardModel(NB_ROWS, NB_CODE_HOLES);

const colors = ColorsFactory.create();
const colorsDecoder = new ColorsDecoder(colors.shuffle());

export default class GameConfiguration {
  constructor() {
    this.colorsToPick = colors.set;
    this.colorsToGuess = colorsDecoder.colorsToGuess;
    this.stateMutator = new BoardStateMutator(model, colorsDecoder);
  }
}
