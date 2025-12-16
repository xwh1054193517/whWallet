'use client';

import React from 'react';
import { Tabs, Card, Space, Button } from 'antd';
import { WalletOutlined, PlusOutlined, ImportOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import Link from 'next/link';

const WalletPage = () => {
  const { wallets, isWalletConnected, currentWallet } = useSelector((state: RootState) => state.wallet);

  const items = [
    {
      key: '1',
      label: 'My Wallets',
      children: (
        <div className="space-y-4">
          {wallets.map((wallet, index) => (
            <Card key={index} className={wallet.address === currentWallet?.address ? 'border-blue-500' : ''}>
              <Space orientation="vertical">
                <div className="font-mono">{wallet.address}</div>
                <div>Balance: {wallet.balance} ETH</div>
                <div>Network: {wallet.network}</div>
              </Space>
            </Card>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold flex items-center">
          <WalletOutlined className="mr-2" /> Wallet Management
        </h1>
      </div>

      {isWalletConnected ? (
        <Tabs items={items} />
      ) : (
        <Card className="text-center">
          <h2 className="text-xl mb-4">No Wallet Connected</h2>
          <p className="mb-6">Please create or import a wallet to get started</p>
          <Space>
            <Link href="/wallet/create">
              <Button type="primary" icon={<PlusOutlined />}>
                Create Wallet
              </Button>
            </Link>
            <Link href="/wallet/import">
              <Button icon={<ImportOutlined />}>
                Import Wallet
              </Button>
            </Link>
          </Space>
        </Card>
      )}
    </div>
  );
};

export default WalletPage;