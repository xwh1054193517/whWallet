'use client';

import React from 'react';
import { Layout, Menu, Dropdown, Button, Space } from 'antd';
import { WalletOutlined, DownOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { switchNetwork } from '@/store/networkSlice';

const { Header: AntHeader } = Layout;

const Header = () => {
  const dispatch = useDispatch();
  const { currentNetwork, networks } = useSelector((state: RootState) => state.network);
  const { isWalletConnected, currentWallet } = useSelector((state: RootState) => state.wallet);

  const networkItems = [
    {
      key: 'ETH',
      label: 'Ethereum',
    },
    {
      key: 'BSC',
      label: 'BNB Smart Chain',
    },
  ];

  const handleNetworkSwitch = ({ key }: { key: string }) => {
    dispatch(switchNetwork(key as 'ETH' | 'BSC'));
  };

  return (
    <AntHeader className="bg-white shadow flex items-center justify-between px-6">
      <div className="flex items-center py-3 px-2">
        <WalletOutlined className="text-2xl mr-3" />
      </div>
      
      <Space size="large" className='px-2'>
        {isWalletConnected && currentWallet ? (
          <div className="flex items-center space-x-2">
            <div className="px-3 py-1 bg-gray-100 rounded">
              {currentNetwork}: {currentWallet.address.slice(0, 6)}...{currentWallet.address.slice(-4)}
            </div>
            <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded">
              {parseFloat(currentWallet.balance).toFixed(4)} ETH
            </div>
          </div>
        ) : (
          <Button type="primary" href="/wallet">
            Connect Wallet
          </Button>
        )}
      </Space>
    </AntHeader>
  );
};

export default Header;