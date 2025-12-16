export type NetworkType = 'ETH' | 'BSC';

export interface Wallet {
    address: string; // 地址
    privateKey?: string; // 私钥
    mnemonic?: string; // 助记词
    balance: string;
    network: NetworkType;
}

export interface Token {
    symbol: string;  
    name: string;
    address: string;
    decimals: number; // 精度
    balance: string;
    priceUSD?: string; // 等额USDT
  }
  
  export interface Transaction {
    hash: string;
    from: string;
    to: string;
    value: string;
    timestamp: number;
    token: string;
    status: 'pending' | 'success' | 'failed';
  }
  
  export interface SwapParams {
    fromToken: Token;
    toToken: Token;
    amount: string;
    slippage: number; // 滑点
  }