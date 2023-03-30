import { useState } from 'react';
import PropTypes from 'prop-types';

import 'components/Application.scss';

function Application({ configuration }) {
  const [state] = useState(configuration());
  const { name } = state;

  return <div className="starter">{name}</div>;
}

Application.propTypes = {
  configuration: PropTypes.func.isRequired,
};

export default Application;
