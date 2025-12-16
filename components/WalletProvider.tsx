'use client';

import React from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store';

interface WalletProviderProps {
  children: React.ReactNode;
}

const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default WalletProvider;