'use client';

import React from 'react';
import { Card, Row, Col, Button, Space, Typography } from 'antd';
import { 
  WalletOutlined, 
  SwapOutlined, 
  SendOutlined, 
  HistoryOutlined,
  PlusOutlined,
  ImportOutlined 
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import Link from 'next/link';

const { Title, Text } = Typography;

export default function Home() {
  const { isWalletConnected, currentWallet } = useSelector((state: RootState) => state.wallet);
  const { currentNetwork } = useSelector((state: RootState) => state.network);

  return (
    <div className="container mx-auto flex flex-col justify-center">
      <Title level={2} className="text-center mb-8">
        Welcome to wh-wallet
      </Title>

      {isWalletConnected ? (
        <>
          <div className="text-center mb-8">
            <Card className="inline-block">
              <Space orientation="vertical">
                <Text type="secondary">Wallet Address</Text>
                <Text strong>{currentWallet?.address}</Text>
                <Text type="secondary">Balance</Text>
                <Title level={3}>{currentWallet?.balance} ETH</Title>
                <Text type="secondary">Network</Text>
                <Text strong>{currentNetwork}</Text>
              </Space>
            </Card>
          </div>

          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={6}>
              <Link href="/swap">
                <Card hoverable className="text-center">
                  <SwapOutlined className="text-3xl mb-2" />
                  <Title level={5}>Swap Tokens</Title>
                  <Text>Exchange between tokens</Text>
                </Card>
              </Link>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Link href="/transfer">
                <Card hoverable className="text-center">
                  <SendOutlined className="text-3xl mb-2" />
                  <Title level={5}>Transfer</Title>
                  <Text>Send tokens to others</Text>
                </Card>
              </Link>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Link href="/tokens">
                <Card hoverable className="text-center">
                  <WalletOutlined className="text-3xl mb-2" />
                  <Title level={5}>Tokens</Title>
                  <Text>View your tokens</Text>
                </Card>
              </Link>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Link href="/transactions">
                <Card hoverable className="text-center">
                  <HistoryOutlined className="text-3xl mb-2" />
                  <Title level={5}>History</Title>
                  <Text>Transaction history</Text>
                </Card>
              </Link>
            </Col>
          </Row>
        </>
      ) : (
        <div className="text-center block mx-auto">
          <Card className="max-w-md mx-auto">
            <Title level={3} className="mb-6">Connect Your Wallet</Title>
            <Space orientation="vertical" size="large" className="w-full">
              <Link href="/wallet/create">
                <Button type="primary" size="large" block icon={<PlusOutlined />}>
                  Create New Wallet
                </Button>
              </Link>
              <Link href="/wallet/import">
                <Button size="large" block icon={<ImportOutlined />}>
                  Import Existing Wallet
                </Button>
              </Link>
            </Space>
          </Card>
        </div>
      )}
    </div>
  );
}