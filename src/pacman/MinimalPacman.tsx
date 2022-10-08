import React, { FC, ComponentType } from 'react';
import './MinimalGlobalStyles.css';
import { MinimalGame } from './MinimalGame'
import { Store } from './model/Store';
import { StoreProvider } from './components/StoreContext';

const MinimalPacman: FC<{ store?: Store; Router?: ComponentType }> = ({
  store = new Store(),
}) => {
  return (
    <StoreProvider value={store}>
      <MinimalGame />
    </StoreProvider>
  );
};

export default MinimalPacman;
