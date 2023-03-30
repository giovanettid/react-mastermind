import Status from './Status';

function StatusFactory(isWinStatus) {
  return isWinStatus ? (
    <Status message="You win" />
  ) : (
    <Status message="You loose" />
  );
}

export default StatusFactory;
