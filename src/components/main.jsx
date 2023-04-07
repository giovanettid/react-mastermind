import { createRoot } from 'react-dom/client';

import Game from 'components/Game/Game';
import GameConfiguration from 'components/Game/GameConfiguration';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Game configuration={() => ({ ...new GameConfiguration() })} />);
