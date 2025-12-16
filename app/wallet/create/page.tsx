'use client';

import React, { useState } from 'react';
import { Card, Button, Input, Alert, Space, Typography, message } from 'antd';
import { WalletOutlined, CopyOutlined, SaveOutlined } from '@ant-design/icons';
import { ethers } from 'ethers';
import { useDispatch } from 'react-redux';
import { addWallet } from '@/store/walletSlice';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const { Title, Text } = Typography;
const { TextArea } = Input;

const CreateWalletPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { currentNetwork } = useSelector((state: RootState) => state.network);
  const [mnemonic, setMnemonic] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState(1);

  const generateWallet = () => {
    const wallet = ethers.Wallet.createRandom();
    setMnemonic(wallet.mnemonic.phrase);
    setStep(2);
  };

  const handleCreateWallet = () => {
    if (password !== confirmPassword) {
      message.error('Passwords do not match');
      return;
    }

    if (!mnemonic) {
      message.error('Please generate mnemonic first');
      return;
    }

    try {
      const wallet = ethers.Wallet.fromMnemonic(mnemonic);
      
      dispatch(addWallet({
        address: wallet.address,
        privateKey: wallet.privateKey,
        mnemonic: mnemonic,
        balance: '0',
        network: currentNetwork,
      }));

      message.success('Wallet created successfully!');
      router.push('/');
    } catch (error) {
      console.warn(error)
      message.error('Failed to create wallet');
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    message.success('Copied to clipboard!');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Title level={2} className="text-center mb-6">
        <WalletOutlined /> Create New Wallet
      </Title>

      <Card>
        {step === 1 ? (
          <Space orientation="vertical" size="large" className="w-full">
            <Alert
              message="Important Security Notice"
              description="Your mnemonic phrase is the key to your wallet. Never share it with anyone and store it securely."
              type="warning"
              showIcon
            />
            
            <div className="text-center">
              <Button type="primary" size="large" onClick={generateWallet}>
                Generate Mnemonic Phrase
              </Button>
            </div>
          </Space>
        ) : (
          <Space orientation="vertical" size="large" className="w-full">
            <Alert
              message="Save Your Mnemonic Phrase"
              description="Write down these 12 words in order and keep them safe. This is your backup."
              type="warning"
              showIcon
            />

            <div className="p-4 bg-gray-50 rounded">
              <Text strong className="mb-2 block">Your Mnemonic Phrase:</Text>
              <TextArea
                value={mnemonic}
                readOnly
                rows={3}
                className="font-mono mb-2"
              />
              <Button 
                icon={<CopyOutlined />} 
                onClick={() => copyToClipboard(mnemonic)}
                className="mt-2"
              >
                Copy to Clipboard
              </Button>
            </div>

            <div>
              <Text strong>Set Password</Text>
              <Input.Password
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mb-4"
              />
              <Input.Password
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div className="flex justify-between">
              <Button onClick={() => setStep(1)}>Back</Button>
              <Button 
                type="primary" 
                icon={<SaveOutlined />}
                onClick={handleCreateWallet}
                disabled={!password || password !== confirmPassword}
              >
                Create Wallet
              </Button>
            </div>
          </Space>
        )}
      </Card>
    </div>
  );
};

export default CreateWalletPage;