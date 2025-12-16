import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Token } from '@/types';

interface TokenState {
  tokens: Token[];
  loading: boolean;
}

const initialState: TokenState = {
  tokens: [
    {
      symbol: 'ETH',
      name: 'Ethereum',
      address: '0x0000000000000000000000000000000000000000',
      decimals: 18,
      balance: '0',
      priceUSD: '1800',
    },
    {
      symbol: 'BNB',
      name: 'BNB',
      address: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
      decimals: 18,
      balance: '0',
      priceUSD: '220',
    },
    {
      symbol: 'USDT',
      name: 'Tether USD',
      address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
      decimals: 6,
      balance: '0',
      priceUSD: '1',
    },
  ],
  loading: false,
};

const tokenSlice = createSlice({
  name: 'tokens',
  initialState,
  reducers: {
    setTokens: (state, action: PayloadAction<Token[]>) => {
      state.tokens = action.payload;
    },
    updateTokenBalance: (state, action: PayloadAction<{ address: string; balance: string }>) => {
      const token = state.tokens.find(t => t.address === action.payload.address);
      if (token) {
        token.balance = action.payload.balance;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setTokens, updateTokenBalance, setLoading } = tokenSlice.actions;
export default tokenSlice.reducer;