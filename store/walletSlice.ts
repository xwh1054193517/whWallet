import {createSlice,PayloadAction} from '@reduxjs/toolkit'
import { Wallet } from '@/types'

interface WalletState {
    wallets:Wallet[];
    currentWallet:Wallet|null;
    isWalletConnected:boolean;
}

const initialState : WalletState = {
    wallets: [],
    currentWallet: null,
    isWalletConnected: false,
}


const walletSlice = createSlice({
    name:'wallet',
    initialState,
    reducers:{
        addWallet:(state,action:PayloadAction<Wallet>)=>{
            state.wallets.push(action.payload);
            state.currentWallet = action.payload;
            state.isWalletConnected = true
        },
        setCurrentWallet:(state,action:PayloadAction<Wallet>)=>{
            state.currentWallet = action.payload;
            state.isWalletConnected = true;
        },
        disconnectWallet: (state) => {
            state.currentWallet = null;
            state.isWalletConnected = false;
        },
        updateWalletBalance:(state,action: PayloadAction<{ address: string; balance: string }>) =>{
            const wallet = state.wallets.find(w => w.address === action.payload.address);
            if (wallet) {
              wallet.balance = action.payload.balance;
            }
            if (state.currentWallet?.address === action.payload.address) {
              state.currentWallet.balance = action.payload.balance;
            }
        }
    }
})
export const { addWallet,setCurrentWallet,disconnectWallet,updateWalletBalance}  = walletSlice.actions
export default walletSlice.reducer