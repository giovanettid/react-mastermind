import React from 'react';
import Status from './Status';

export default class StatusFactory {
  static create(isWinStatus) {
    return isWinStatus ? <Status message="You win" /> : <Status message="You loose" />;
  }
}
