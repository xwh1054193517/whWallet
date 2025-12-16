import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Transaction } from '@/types';

interface TransactionState {
  transactions: Transaction[];
  loading: boolean;
}

const initialState: TransactionState = {
  transactions: [],
  loading: false,
};

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transactions.unshift(action.payload);
    },
    setTransactions: (state, action: PayloadAction<Transaction[]>) => {
      state.transactions = action.payload;
    },
    updateTransactionStatus: (state, action: PayloadAction<{ hash: string; status: Transaction['status'] }>) => {
      const transaction = state.transactions.find(t => t.hash === action.payload.hash);
      if (transaction) {
        transaction.status = action.payload.status;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { addTransaction, setTransactions, updateTransactionStatus, setLoading } = transactionSlice.actions;
export default transactionSlice.reducer;