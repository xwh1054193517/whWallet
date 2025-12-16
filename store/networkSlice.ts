import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NetworkType } from '@/types';

interface NetworkState {
  currentNetwork: NetworkType;
  networks: {
    ETH: {
      name: string;
      rpcUrl: string;
      chainId: number;
      explorer: string;
    };
    BSC: {
      name: string;
      rpcUrl: string;
      chainId: number;
      explorer: string;
    };
  };
}

const initialState: NetworkState = {
  currentNetwork: 'ETH',
  networks: {
    ETH: {
      name: 'Ethereum Mainnet',
      rpcUrl: 'https://eth.llamarpc.com',
      chainId: 1,
      explorer: 'https://etherscan.io',
    },
    BSC: {
      name: 'BNB Smart Chain',
      rpcUrl: 'https://bsc-dataseed.binance.org',
      chainId: 56,
      explorer: 'https://bscscan.com',
    },
  },
};

const networkSlice = createSlice({
  name: 'network',
  initialState,
  reducers: {
    switchNetwork: (state, action: PayloadAction<NetworkType>) => {
      state.currentNetwork = action.payload;
    },
  },
});

export const { switchNetwork } = networkSlice.actions;
export default networkSlice.reducer;