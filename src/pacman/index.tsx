import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './GlobalStyles.css';

// https://github.com/mobxjs/mobx-react-lite/tree/v2.0.5#observer-batching
import 'mobx-react-lite/batchingForReactDom';

import Pacman from './MinimalPacman';

ReactDOM.render(<Pacman />, document.getElementById('root'));
