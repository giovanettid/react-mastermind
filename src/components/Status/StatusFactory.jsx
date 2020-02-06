import React from 'react';
import Status from './Status';

const StatusFactory = (isWinStatus) => (
  isWinStatus ? <Status message="You win" /> : <Status message="You loose" />
);

export default StatusFactory;
