import React from 'react';
import PropTypes from 'prop-types';

const Status = ({ message }) =>
  (<table>
    <tbody>
      <tr>
        <td className="Status">{message}</td>
      </tr>
    </tbody>
  </table>);

Status.propTypes = {
  message: PropTypes.string,
};

Status.defaultProps = {
  message: '',
};

export default Status;
