import React from 'react';
import PropTypes from 'prop-types';

import './Status.scss';

const Status = ({ message }) =>
  (<div className="Status">
    <table>
      <tbody>
        <tr>
          <td>{message}</td>
        </tr>
      </tbody>
    </table>
  </div>);

Status.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Status;
