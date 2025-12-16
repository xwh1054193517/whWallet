import { configureStore } from '@reduxjs/toolkit';
import walletReducer from './walletSlice';
import networkReducer from './networkSlice';
import tokenReducer from './tokenSlice';
import transactionReducer from './tokenSlice';
export const store = configureStore({
  reducer: {
    wallet: walletReducer,
    network: networkReducer,
    token: tokenReducer,
    transaction: transactionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;