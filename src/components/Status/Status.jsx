import PropTypes from 'prop-types';

import './Status.scss';

function Status({ message }) {
  return (
    <div className="Status">
      <table>
        <tbody aria-label="Status">
          <tr>
            <td>{message}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

Status.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Status;
